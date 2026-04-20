import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { FantasyContestType, FantasyStatus } from "@prisma/client";

@Injectable()
export class FantasyService {
  constructor(private prisma: PrismaService) {}

  async listContests(status?: FantasyStatus) {
    const where = status ? { status } : {};
    return this.prisma.fantasyContest.findMany({ where, orderBy: { startTime: "asc" }, include: { _count: { select: { entries: true } } } });
  }

  async getContest(id: string) {
    const contest = await this.prisma.fantasyContest.findUnique({
      where: { id },
      include: { entries: { include: { user: { select: { id: true, nickname: true } } } } },
    });
    if (!contest) throw new NotFoundException("Contest not found");
    return contest;
  }

  async createContest(data: { name: string; type: FantasyContestType; entryFee: number; maxEntries: number; startTime: Date; endTime: Date; platformRake: number; scoringRules: object; linkedEventIds: object }) {
    return this.prisma.fantasyContest.create({
      data: {
        name: data.name,
        type: data.type,
        entryFee: data.entryFee,
        prizePool: 0,
        maxEntries: data.maxEntries,
        startTime: data.startTime,
        endTime: data.endTime,
        platformRake: data.platformRake,
        scoringRules: data.scoringRules as any,
        linkedEventIds: data.linkedEventIds as any,
        status: FantasyStatus.OPEN,
      },
    });
  }

  async enterContest(contestId: string, userId: string, roster: Record<string, string>) {
    const contest = await this.prisma.fantasyContest.findUnique({
      where: { id: contestId },
      include: { _count: { select: { entries: true } } },
    });
    if (!contest) throw new NotFoundException("Contest not found");
    if (contest.status !== "OPEN") throw new BadRequestException("Contest is not accepting entries");
    if (contest._count.entries >= contest.maxEntries) throw new BadRequestException("Contest is full");

    const existing = await this.prisma.fantasyEntry.findFirst({ where: { contestId, userId } });
    if (existing) throw new BadRequestException("Already entered this contest");

    const entry = await this.prisma.fantasyEntry.create({
      data: { contestId, userId, roster },
    });

    // Add entry fee to prize pool (minus rake)
    const fee = contest.entryFee;
    const rake = Math.floor(fee * contest.platformRake);
    await this.prisma.fantasyContest.update({
      where: { id: contestId },
      data: { prizePool: { increment: fee - rake } },
    });

    return entry;
  }

  async getMyEntries(userId: string) {
    return this.prisma.fantasyEntry.findMany({
      where: { userId },
      include: { contest: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }
}
