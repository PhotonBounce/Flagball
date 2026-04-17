import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { TokenTxType } from "@prisma/client";

@Injectable()
export class TokensService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(userId: string) {
    const balance = await this.prisma.tokenBalance.findUnique({ where: { userId } });
    if (!balance) throw new NotFoundException("Token balance not found");
    return balance;
  }

  async getTransactions(userId: string, page = 1, limit = 20) {
    const [transactions, total] = await Promise.all([
      this.prisma.tokenTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.tokenTransaction.count({ where: { userId } }),
    ]);

    return { transactions, total, page, totalPages: Math.ceil(total / limit) };
  }

  async awardTokens(userId: string, amount: number, type: TokenTxType, reason: string, referenceId?: string) {
    if (amount <= 0) throw new BadRequestException("Amount must be positive");

    const [balance, tx] = await this.prisma.$transaction([
      this.prisma.tokenBalance.update({
        where: { userId },
        data: {
          balance: { increment: amount },
          lifetimeEarned: { increment: amount },
        },
      }),
      this.prisma.tokenTransaction.create({
        data: { userId, amount, type, reason, referenceId },
      }),
    ]);

    return { balance: balance.balance, transaction: tx };
  }

  async spendTokens(userId: string, amount: number, reason: string, referenceId?: string) {
    if (amount <= 0) throw new BadRequestException("Amount must be positive");

    const balance = await this.prisma.tokenBalance.findUnique({ where: { userId } });
    if (!balance || balance.balance < amount) {
      throw new BadRequestException("Insufficient token balance");
    }

    const [updatedBalance, tx] = await this.prisma.$transaction([
      this.prisma.tokenBalance.update({
        where: { userId },
        data: { balance: { decrement: amount } },
      }),
      this.prisma.tokenTransaction.create({
        data: { userId, amount: -amount, type: "SPENT", reason, referenceId },
      }),
    ]);

    return { balance: updatedBalance.balance, transaction: tx };
  }
}
