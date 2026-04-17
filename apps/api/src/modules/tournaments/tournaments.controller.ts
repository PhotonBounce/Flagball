import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from "@nestjs/common";
import { TournamentsService } from "./tournaments.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("tournaments")
export class TournamentsController {
  constructor(private tournamentsService: TournamentsService) {}

  @Get()
  async list(@Query("status") status?: string) {
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
  async create(@Body() body: { name: string; format: string; maxTeams: number; entryFeeTokens: number; startDate: string; location?: string; description?: string }) {
    return this.tournamentsService.create({ ...body, startDate: new Date(body.startDate) });
  }

  @Post(":id/register")
  @UseGuards(JwtAuthGuard)
  async register(@Param("id") id: string, @Request() req: any, @Body() body: { teamId: string }) {
    return this.tournamentsService.registerTeam(id, body.teamId, req.user.id);
  }
}
