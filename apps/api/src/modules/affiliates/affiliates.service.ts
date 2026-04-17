import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AffiliatesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.affiliateProfile.findUnique({
      where: { userId },
      include: { referrals: { take: 10, orderBy: { createdAt: "desc" } }, commissions: { take: 10, orderBy: { createdAt: "desc" } }, campaignLinks: true },
    });
  }

  async createOrGetProfile(userId: string) {
    const existing = await this.prisma.affiliateProfile.findUnique({ where: { userId } });
    if (existing) return existing;

    const code = `OF-${userId.slice(0, 8).toUpperCase()}`;
    return this.prisma.affiliateProfile.create({
      data: { userId, referralCode: code, tier: "BRONZE" },
    });
  }

  async trackReferral(referralCode: string, referredUserId: string) {
    const profile = await this.prisma.affiliateProfile.findUnique({ where: { referralCode } });
    if (!profile) throw new BadRequestException("Invalid referral code");
    if (profile.userId === referredUserId) throw new BadRequestException("Cannot refer yourself");

    const existing = await this.prisma.affiliateReferral.findFirst({
      where: { referredUserId },
    });
    if (existing) return existing;

    const referral = await this.prisma.affiliateReferral.create({
      data: { affiliateProfileId: profile.id, referredUserId, status: "PENDING" },
    });

    // Update referral count and check tier upgrade
    const count = await this.prisma.affiliateReferral.count({ where: { affiliateProfileId: profile.id } });
    let tier = "BRONZE";
    if (count >= 50) tier = "GOLD";
    else if (count >= 15) tier = "SILVER";

    await this.prisma.affiliateProfile.update({
      where: { id: profile.id },
      data: { totalReferrals: count, tier },
    });

    return referral;
  }

  async getCampaignLinks(userId: string) {
    const profile = await this.prisma.affiliateProfile.findUnique({ where: { userId } });
    if (!profile) return [];
    return this.prisma.affiliateCampaignLink.findMany({ where: { affiliateProfileId: profile.id } });
  }

  async createCampaignLink(userId: string, name: string, utmSource: string) {
    const profile = await this.createOrGetProfile(userId);
    return this.prisma.affiliateCampaignLink.create({
      data: { affiliateProfileId: profile.id, name, url: `https://onlyflags.com/join?ref=${profile.referralCode}&utm_source=${utmSource}`, utmSource, clicks: 0, conversions: 0 },
    });
  }
}
