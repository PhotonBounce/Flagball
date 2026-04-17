import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PredictionsService {
  constructor(private prisma: PrismaService) {}

  async listMarkets(status?: string) {
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

  async createMarket(data: { title: string; description?: string; type: string; options: any; eventId?: string; closesAt: Date }) {
    return this.prisma.predictionMarket.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        options: data.options,
        eventId: data.eventId,
        closesAt: data.closesAt,
        totalPool: 0,
        status: "OPEN",
      },
    });
  }

  async placeWager(marketId: string, userId: string, selection: string, amount: number) {
    const market = await this.prisma.predictionMarket.findUnique({ where: { id: marketId } });
    if (!market) throw new NotFoundException("Market not found");
    if (market.status !== "OPEN") throw new BadRequestException("Market is closed");
    if (new Date() > market.closesAt) throw new BadRequestException("Betting window has closed");
    if (amount <= 0) throw new BadRequestException("Amount must be positive");

    const wager = await this.prisma.predictionWager.create({
      data: { marketId, userId, selection, amount },
    });

    // Update pool (minus 10% rake)
    const rake = Math.floor(amount * 0.1);
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
