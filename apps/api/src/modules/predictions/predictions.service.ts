import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PredictionType, PredictionStatus } from "@prisma/client";

@Injectable()
export class PredictionsService {
  constructor(private prisma: PrismaService) {}

  async listMarkets(status?: PredictionStatus) {
    const where = status ? { status } : {};
    return this.prisma.predictionMarket.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { wagers: true } } },
    });
  }

  async getMarket(id: string) {
    const market = await this.prisma.predictionMarket.findUnique({
      where: { id },
      include: { wagers: { include: { user: { select: { id: true, nickname: true } } } } },
    });
    if (!market) throw new NotFoundException("Market not found");
    return market;
  }

  async createMarket(data: { question: string; type: PredictionType; options: any; eventId: string; platformRake: number }) {
    return this.prisma.predictionMarket.create({
      data: {
        question: data.question,
        type: data.type,
        options: data.options,
        eventId: data.eventId,
        platformRake: data.platformRake,
        totalPool: 0,
        status: PredictionStatus.OPEN,
      },
    });
  }

  async placeWager(marketId: string, userId: string, selectedOption: string, amount: number) {
    const market = await this.prisma.predictionMarket.findUnique({ where: { id: marketId } });
    if (!market) throw new NotFoundException("Market not found");
    if (market.status !== "OPEN") throw new BadRequestException("Market is closed");
    if (amount <= 0) throw new BadRequestException("Amount must be positive");

    const wager = await this.prisma.predictionWager.create({
      data: { marketId, userId, selectedOption, amount },
    });

    // Update pool (minus platform rake)
    const rake = Math.floor(amount * market.platformRake);
    await this.prisma.predictionMarket.update({
      where: { id: marketId },
      data: { totalPool: { increment: amount - rake } },
    });

    return wager;
  }

  async getMyWagers(userId: string) {
    return this.prisma.predictionWager.findMany({
      where: { userId },
      include: { market: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }
}
