import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from "@nestjs/common";
import { PredictionsService } from "./predictions.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { PredictionType, PredictionStatus } from "@prisma/client";

@Controller("predictions")
export class PredictionsController {
  constructor(private predictionsService: PredictionsService) {}

  @Get("markets")
  async listMarkets(@Query("status") status?: PredictionStatus) {
    return this.predictionsService.listMarkets(status);
  }

  @Get("markets/:id")
  async getMarket(@Param("id") id: string) {
    return this.predictionsService.getMarket(id);
  }

  @Post("markets")
  @UseGuards(JwtAuthGuard)
  async createMarket(@Body() body: { question: string; type: PredictionType; options: any; eventId: string; platformRake: number }) {
    return this.predictionsService.createMarket(body);
  }

  @Post("markets/:id/wager")
  @UseGuards(JwtAuthGuard)
  async placeWager(@Param("id") id: string, @Request() req: any, @Body() body: { selectedOption: string; amount: number }) {
    return this.predictionsService.placeWager(id, req.user.id, body.selectedOption, body.amount);
  }

  @Get("my-wagers")
  @UseGuards(JwtAuthGuard)
  async getMyWagers(@Request() req: any) {
    return this.predictionsService.getMyWagers(req.user.id);
  }
}
