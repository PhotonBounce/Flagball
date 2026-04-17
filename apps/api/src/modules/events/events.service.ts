import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUpcomingEvents(page = 1, limit = 20) {
    const now = new Date();
    const [events, total] = await Promise.all([
      this.prisma.gameEvent.findMany({
        where: { dateTime: { gte: now } },
        include: {
          team: { select: { id: true, name: true, logoUrl: true } },
          opponentTeam: { select: { id: true, name: true, logoUrl: true } },
        },
        orderBy: { dateTime: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.gameEvent.count({ where: { dateTime: { gte: now } } }),
    ]);

    return { events, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getEvent(eventId: string) {
    const event = await this.prisma.gameEvent.findUnique({
      where: { id: eventId },
      include: {
        team: true,
        opponentTeam: true,
        playerStats: { include: { player: { select: { id: true, nickname: true, avatarUrl: true } } } },
      },
    });
    if (!event) throw new NotFoundException("Event not found");
    return event;
  }

  async getPastEvents(page = 1, limit = 20) {
    const now = new Date();
    const [events, total] = await Promise.all([
      this.prisma.gameEvent.findMany({
        where: { dateTime: { lt: now } },
        include: {
          team: { select: { id: true, name: true, logoUrl: true } },
          opponentTeam: { select: { id: true, name: true, logoUrl: true } },
        },
        orderBy: { dateTime: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.gameEvent.count({ where: { dateTime: { lt: now } } }),
    ]);

    return { events, total, page, totalPages: Math.ceil(total / limit) };
  }
}
