import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { TeamRequestInput } from "@onlyflags/shared";

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async requestTeam(userId: string, input: TeamRequestInput) {
    const request = await this.prisma.teamRequest.create({
      data: {
        requesterId: userId,
        city: input.city,
        state: input.state,
        referralEmails: input.referralEmails,
      },
    });

    // Award 1 token for providing 5 valid emails
    await this.prisma.tokenBalance.update({
      where: { userId },
      data: {
        balance: { increment: 1 },
        lifetimeEarned: { increment: 1 },
      },
    });

    await this.prisma.tokenTransaction.create({
      data: {
        userId,
        amount: 1,
        type: "EARNED",
        reason: "Team request with 5 referral emails",
        referenceId: request.id,
      },
    });

    return { request, tokensAwarded: 1 };
  }

  async getTeams(city?: string, state?: string) {
    const where: any = { status: "ACTIVE" };
    if (city) where.city = city;
    if (state) where.state = state;

    return this.prisma.team.findMany({
      where,
      include: { _count: { select: { members: true } } },
      orderBy: { name: "asc" },
    });
  }

  async getTeam(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          include: { user: { select: { id: true, nickname: true, avatarUrl: true } } },
        },
        homeEvents: {
          where: { dateTime: { gte: new Date() } },
          orderBy: { dateTime: "asc" },
          take: 5,
        },
      },
    });

    if (!team) throw new NotFoundException("Team not found");
    return team;
  }

  async joinTeam(userId: string, teamId: string) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team || team.status !== "ACTIVE") throw new NotFoundException("Team not found or not active");

    return this.prisma.teamMembership.create({
      data: { userId, teamId },
    });
  }

  async leaveTeam(userId: string, teamId: string) {
    return this.prisma.teamMembership.delete({
      where: { userId_teamId: { userId, teamId } },
    });
  }
}
