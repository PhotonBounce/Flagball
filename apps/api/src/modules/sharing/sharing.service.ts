import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SharingService {
  constructor(private prisma: PrismaService) {}

  async recordShare(userId: string, contentType: string, contentId: string, platform: string) {
    const share = await this.prisma.shareEvent.create({
      data: { userId, contentType, contentId, platform },
    });

    // Update or create streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const streak = await this.prisma.shareStreak.findUnique({ where: { userId } });

    if (streak) {
      const lastDate = new Date(streak.lastShareAt);
      lastDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        const newCount = streak.currentStreak + 1;
        const multiplier = newCount >= 30 ? 3.0 : newCount >= 7 ? 2.0 : newCount >= 3 ? 1.5 : 1.0;
        await this.prisma.shareStreak.update({
          where: { userId },
          data: { currentStreak: newCount, longestStreak: Math.max(newCount, streak.longestStreak), currentMultiplier: multiplier, lastShareAt: new Date() },
        });
      } else if (diffDays > 1) {
        await this.prisma.shareStreak.update({
          where: { userId },
          data: { currentStreak: 1, currentMultiplier: 1.0, lastShareAt: new Date() },
        });
      }
    } else {
      await this.prisma.shareStreak.create({
        data: { userId, currentStreak: 1, longestStreak: 1, currentMultiplier: 1.0, lastShareAt: new Date() },
      });
    }

    return share;
  }

  async getStreak(userId: string) {
    return this.prisma.shareStreak.findUnique({ where: { userId } });
  }

  async getShareHistory(userId: string, limit = 20) {
    return this.prisma.shareEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
