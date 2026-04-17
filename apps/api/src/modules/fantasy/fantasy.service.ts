import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FantasyService {
  constructor(private prisma: PrismaService) {}

  async listContests(status?: string) {
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

  async createContest(data: { name: string; type: string; entryFeeTokens: number; maxEntries: number; startTime: Date }) {
    return this.prisma.fantasyContest.create({
      data: {
        name: data.name,
        type: data.type,
        entryFeeTokens: data.entryFeeTokens,
        prizePoolTokens: 0,
        maxEntries: data.maxEntries,
        startTime: data.startTime,
        status: "OPEN",
      },
    });
  }

  async enterContest(contestId: string, userId: string, lineup: Record<string, string>) {
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
      data: { contestId, userId, lineup },
    });

    // Add entry fee to prize pool (minus 10% rake)
    const fee = contest.entryFeeTokens;
    const rake = Math.floor(fee * 0.1);
    await this.prisma.fantasyContest.update({
      where: { id: contestId },
      data: { prizePoolTokens: { increment: fee - rake } },
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
