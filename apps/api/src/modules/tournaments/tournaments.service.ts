import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) {}

  async list(status?: string) {
    const where = status ? { status } : {};
    return this.prisma.tournament.findMany({ where, orderBy: { startDate: "asc" }, include: { _count: { select: { teamEntries: true } } } });
  }

  async getById(id: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      include: { teamEntries: { include: { team: true } }, matches: { orderBy: { roundNumber: "asc" } } },
    });
    if (!tournament) throw new NotFoundException("Tournament not found");
    return tournament;
  }

  async create(data: { name: string; format: string; maxTeams: number; entryFeeTokens: number; startDate: Date; location?: string; description?: string }) {
    return this.prisma.tournament.create({
      data: {
        name: data.name,
        format: data.format,
        maxTeams: data.maxTeams,
        entryFeeTokens: data.entryFeeTokens,
        prizePoolTokens: 0,
        startDate: data.startDate,
        location: data.location,
        description: data.description,
        status: "REGISTRATION",
      },
    });
  }

  async registerTeam(tournamentId: string, teamId: string, userId: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: { _count: { select: { teamEntries: true } } },
    });
    if (!tournament) throw new NotFoundException("Tournament not found");
    if (tournament.status !== "REGISTRATION") throw new BadRequestException("Registration is closed");
    if (tournament._count.teamEntries >= tournament.maxTeams) throw new BadRequestException("Tournament is full");

    const existing = await this.prisma.tournamentTeamEntry.findFirst({
      where: { tournamentId, teamId },
    });
    if (existing) throw new BadRequestException("Team already registered");

    const entry = await this.prisma.tournamentTeamEntry.create({
      data: { tournamentId, teamId, registeredById: userId },
    });

    // Add entry fee to prize pool (minus 10% platform rake)
    const entryFee = tournament.entryFeeTokens;
    const platformCut = Math.floor(entryFee * 0.1);
    const prizeContribution = entryFee - platformCut;

    await this.prisma.tournament.update({
      where: { id: tournamentId },
      data: { prizePoolTokens: { increment: prizeContribution } },
    });

    return entry;
  }

  async getMatches(tournamentId: string) {
    return this.prisma.tournamentMatch.findMany({
      where: { tournamentId },
      orderBy: [{ roundNumber: "asc" }, { matchNumber: "asc" }],
    });
  }
}
