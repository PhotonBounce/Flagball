import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from "@nestjs/common";
import { PredictionsService } from "./predictions.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("predictions")
export class PredictionsController {
  constructor(private predictionsService: PredictionsService) {}

  @Get("markets")
  async listMarkets(@Query("status") status?: string) {
    return this.predictionsService.listMarkets(status);
  }

  @Get("markets/:id")
  async getMarket(@Param("id") id: string) {
    return this.predictionsService.getMarket(id);
  }

  @Post("markets")
  @UseGuards(JwtAuthGuard)
  async createMarket(@Body() body: { title: string; description?: string; type: string; options: any; eventId?: string; closesAt: string }) {
    return this.predictionsService.createMarket({ ...body, closesAt: new Date(body.closesAt) });
  }

  @Post("markets/:id/wager")
  @UseGuards(JwtAuthGuard)
  async placeWager(@Param("id") id: string, @Request() req: any, @Body() body: { selection: string; amount: number }) {
    return this.predictionsService.placeWager(id, req.user.id, body.selection, body.amount);
  }

  @Get("my-wagers")
  @UseGuards(JwtAuthGuard)
  async getMyWagers(@Request() req: any) {
    return this.predictionsService.getMyWagers(req.user.id);
  }
}
