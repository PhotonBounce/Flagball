import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { TournamentFormat, TournamentStatus } from "@prisma/client";

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) {}

  async list(status?: TournamentStatus) {
    const where = status ? { status } : {};
    return this.prisma.tournament.findMany({ where, orderBy: { startDate: "asc" }, include: { _count: { select: { teamEntries: true } } } });
  }

  async getById(id: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      include: { teamEntries: { include: { team: true } }, matches: { orderBy: { round: "asc" } } },
    });
    if (!tournament) throw new NotFoundException("Tournament not found");
    return tournament;
  }

  async create(data: { name: string; format: TournamentFormat; entryFee: number; platformRake: number; startDate: Date; endDate: Date; prizeDistribution: object }) {
    return this.prisma.tournament.create({
      data: {
        name: data.name,
        format: data.format,
        entryFee: data.entryFee,
        platformRake: data.platformRake,
        prizeDistribution: data.prizeDistribution as any,
        startDate: data.startDate,
        endDate: data.endDate,
        status: TournamentStatus.REGISTRATION,
      },
    });
  }

  async registerTeam(tournamentId: string, teamId: string, _userId: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: { _count: { select: { teamEntries: true } } },
    });
    if (!tournament) throw new NotFoundException("Tournament not found");
    if (tournament.status !== "REGISTRATION") throw new BadRequestException("Registration is closed");

    const existing = await this.prisma.tournamentTeamEntry.findFirst({
      where: { tournamentId, teamId },
    });
    if (existing) throw new BadRequestException("Team already registered");

    const entry = await this.prisma.tournamentTeamEntry.create({
      data: { tournamentId, teamId },
    });

    return entry;
  }

  async getMatches(tournamentId: string) {
    return this.prisma.tournamentMatch.findMany({
      where: { tournamentId },
      orderBy: [{ round: "asc" }, { matchNumber: "asc" }],
    });
  }
}
