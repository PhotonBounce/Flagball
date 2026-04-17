import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from "@nestjs/common";
import { FantasyService } from "./fantasy.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("fantasy")
export class FantasyController {
  constructor(private fantasyService: FantasyService) {}

  @Get("contests")
  async listContests(@Query("status") status?: string) {
    return this.fantasyService.listContests(status);
  }

  @Get("contests/:id")
  async getContest(@Param("id") id: string) {
    return this.fantasyService.getContest(id);
  }

  @Post("contests")
  @UseGuards(JwtAuthGuard)
  async createContest(@Body() body: { name: string; type: string; entryFeeTokens: number; maxEntries: number; startTime: string }) {
    return this.fantasyService.createContest({ ...body, startTime: new Date(body.startTime) });
  }

  @Post("contests/:id/enter")
  @UseGuards(JwtAuthGuard)
  async enterContest(@Param("id") id: string, @Request() req: any, @Body() body: { lineup: Record<string, string> }) {
    return this.fantasyService.enterContest(id, req.user.id, body.lineup);
  }

  @Get("my-entries")
  @UseGuards(JwtAuthGuard)
  async getMyEntries(@Request() req: any) {
    return this.fantasyService.getMyEntries(req.user.id);
  }
}
