import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { teamRequestSchema } from "@onlyflags/shared";

@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getTeams(@Query("city") city?: string, @Query("state") state?: string) {
    return this.teamsService.getTeams(city, state);
  }

  @Get(":id")
  async getTeam(@Param("id") id: string) {
    return this.teamsService.getTeam(id);
  }

  @Post("request")
  @UseGuards(JwtAuthGuard)
  async requestTeam(
    @CurrentUser("id") userId: string,
    @Body(new ZodValidationPipe(teamRequestSchema)) body: any,
  ) {
    return this.teamsService.requestTeam(userId, body);
  }

  @Post(":id/join")
  @UseGuards(JwtAuthGuard)
  async joinTeam(@CurrentUser("id") userId: string, @Param("id") teamId: string) {
    return this.teamsService.joinTeam(userId, teamId);
  }

  @Delete(":id/leave")
  @UseGuards(JwtAuthGuard)
  async leaveTeam(@CurrentUser("id") userId: string, @Param("id") teamId: string) {
    return this.teamsService.leaveTeam(userId, teamId);
  }
}
