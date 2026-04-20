import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateProfileInput, ProfileSearchInput } from "@onlyflags/shared";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tokenBalance: true,
        affiliateProfile: true,
        subscription: true,
        shareStreak: true,
        teamMemberships: { include: { team: true } },
      },
    });

    if (!user) throw new NotFoundException("User not found");

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      nickname: user.nickname,
      gender: user.gender,
      age: user.age,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      isPublic: user.isPublic,
      role: user.role,
      walletAddress: user.walletAddress,
      tokenBalance: user.tokenBalance?.balance ?? 0,
      affiliateCode: user.affiliateProfile?.affiliateCode,
      affiliateTier: user.affiliateProfile?.tier,
      subscriptionTier: user.subscription?.tier ?? "FREE",
      shareStreak: user.shareStreak?.currentStreak ?? 0,
      teams: user.teamMemberships.map((m: { team: { id: string; name: string; city: string; state: string }; role: string }) => ({
        id: m.team.id,
        name: m.team.name,
        city: m.team.city,
        state: m.team.state,
        role: m.role,
      })),
      createdAt: user.createdAt,
    };
  }

  async getPublicProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        teamMemberships: { include: { team: true } },
      },
    });

    if (!user) throw new NotFoundException("User not found");
    if (!user.isPublic) throw new NotFoundException("Profile is private");

    return {
      id: user.id,
      nickname: user.nickname,
      gender: user.gender,
      age: user.age,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      teams: user.teamMemberships.map((m: { team: { id: string; name: string; city: string; state: string } }) => ({
        id: m.team.id,
        name: m.team.name,
        city: m.team.city,
        state: m.team.state,
      })),
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data: input,
      select: {
        id: true,
        nickname: true,
        bio: true,
        isPublic: true,
        gender: true,
        updatedAt: true,
      },
    });
  }

  async searchProfiles(input: ProfileSearchInput) {
    const where: any = { isPublic: true };

    if (input.gender) where.gender = input.gender;
    if (input.ageMin || input.ageMax) {
      where.age = {};
      if (input.ageMin) where.age.gte = input.ageMin;
      if (input.ageMax) where.age.lte = input.ageMax;
    }
    if (input.teamId) {
      where.teamMemberships = { some: { teamId: input.teamId } };
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (input.page - 1) * input.limit,
        take: input.limit,
        select: {
          id: true,
          nickname: true,
          gender: true,
          age: true,
          bio: true,
          avatarUrl: true,
          teamMemberships: { include: { team: { select: { id: true, name: true, city: true, state: true } } } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      page: input.page,
      totalPages: Math.ceil(total / input.limit),
    };
  }

  async acceptTos(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tosAcceptedAt: new Date() },
      select: { id: true, tosAcceptedAt: true },
    });
  }
}
