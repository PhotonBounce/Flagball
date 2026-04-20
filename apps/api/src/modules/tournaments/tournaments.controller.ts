import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from "@nestjs/common";
import { TournamentsService } from "./tournaments.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { TournamentFormat, TournamentStatus } from "@prisma/client";

@Controller("tournaments")
export class TournamentsController {
  constructor(private tournamentsService: TournamentsService) {}

  @Get()
  async list(@Query("status") status?: TournamentStatus) {
    return this.tournamentsService.list(status);
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.tournamentsService.getById(id);
  }

  @Get(":id/matches")
  async getMatches(@Param("id") id: string) {
    return this.tournamentsService.getMatches(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: { name: string; format: TournamentFormat; entryFee: number; platformRake: number; startDate: string; endDate: string; prizeDistribution: object }) {
    return this.tournamentsService.create({ ...body, startDate: new Date(body.startDate), endDate: new Date(body.endDate) });
  }

  @Post(":id/register")
  @UseGuards(JwtAuthGuard)
  async register(@Param("id") id: string, @Request() req: any, @Body() body: { teamId: string }) {
    return this.tournamentsService.registerTeam(id, body.teamId, req.user.id);
  }
}
