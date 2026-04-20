import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AffiliateTier } from "@prisma/client";

@Injectable()
export class AffiliatesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.affiliateProfile.findUnique({
      where: { userId },
      include: { referrals: { take: 10, orderBy: { signedUpAt: "desc" } }, commissions: { take: 10, orderBy: { createdAt: "desc" } }, campaigns: true },
    });
  }

  async createOrGetProfile(userId: string) {
    const existing = await this.prisma.affiliateProfile.findUnique({ where: { userId } });
    if (existing) return existing;

    const code = `OF-${userId.slice(0, 8).toUpperCase()}`;
    return this.prisma.affiliateProfile.create({
      data: { userId, affiliateCode: code, tier: AffiliateTier.STARTER },
    });
  }

  async trackReferral(affiliateCode: string, referredUserId: string) {
    const profile = await this.prisma.affiliateProfile.findUnique({ where: { affiliateCode } });
    if (!profile) throw new BadRequestException("Invalid referral code");
    if (profile.userId === referredUserId) throw new BadRequestException("Cannot refer yourself");

    const existing = await this.prisma.affiliateReferral.findFirst({
      where: { referredUserId },
    });
    if (existing) return existing;

    const referral = await this.prisma.affiliateReferral.create({
      data: { affiliateId: profile.id, referredUserId, attributionSource: "URL" },
    });

    // Update referral count and check tier upgrade
    const count = await this.prisma.affiliateReferral.count({ where: { affiliateId: profile.id } });
    let tier: AffiliateTier = AffiliateTier.STARTER;
    if (count >= 200) tier = AffiliateTier.ELITE;
    else if (count >= 50) tier = AffiliateTier.PRO;

    await this.prisma.affiliateProfile.update({
      where: { id: profile.id },
      data: { totalReferrals: count, tier },
    });

    return referral;
  }

  async getCampaignLinks(userId: string) {
    const profile = await this.prisma.affiliateProfile.findUnique({ where: { userId } });
    if (!profile) return [];
    return this.prisma.affiliateCampaignLink.findMany({ where: { affiliateId: profile.id } });
  }

  async createCampaignLink(userId: string, campaignName: string, utmSource: string) {
    const profile = await this.createOrGetProfile(userId);
    return this.prisma.affiliateCampaignLink.create({
      data: { affiliateId: profile.id, campaignName, url: `https://onlyflags.com/join?ref=${profile.affiliateCode}&utm_source=${utmSource}` },
    });
  }
}
