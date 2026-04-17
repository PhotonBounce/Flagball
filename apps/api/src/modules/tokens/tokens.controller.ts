import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common";
import { TokensService } from "./tokens.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@Controller("tokens")
@UseGuards(JwtAuthGuard)
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get("balance")
  getBalance(@CurrentUser() user: any) {
    return this.tokensService.getBalance(user.id);
  }

  @Get("transactions")
  getTransactions(
    @CurrentUser() user: any,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.tokensService.getTransactions(user.id, Number(page) || 1, Number(limit) || 20);
  }

  @Post("spend")
  spendTokens(
    @CurrentUser() user: any,
    @Body() body: { amount: number; reason: string; referenceId?: string },
  ) {
    return this.tokensService.spendTokens(user.id, body.amount, body.reason, body.referenceId);
  }
}
