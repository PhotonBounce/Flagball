import { Controller, Get, Post, Body, Param, Query, Delete, UseGuards } from "@nestjs/common";
import { NftsService } from "./nfts.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@Controller("nfts")
@UseGuards(JwtAuthGuard)
export class NftsController {
  constructor(private readonly nftsService: NftsService) {}

  @Get("mine")
  getUserNfts(@CurrentUser() user: any, @Query("page") page?: string, @Query("limit") limit?: string, @Query("type") type?: string) {
    return this.nftsService.getUserNfts(user.id, Number(page) || 1, Number(limit) || 20, type as any);
  }

  @Get("marketplace")
  getListings(@Query("page") page?: string, @Query("limit") limit?: string, @Query("type") type?: string) {
    return this.nftsService.getListings(Number(page) || 1, Number(limit) || 20, type as any);
  }

  @Get("auctions")
  getActiveAuctions(@Query("page") page?: string, @Query("limit") limit?: string) {
    return this.nftsService.getActiveAuctions(Number(page) || 1, Number(limit) || 20);
  }

  @Get(":id")
  getNft(@Param("id") id: string) {
    return this.nftsService.getNft(id);
  }

  @Post("list")
  listNft(@CurrentUser() user: any, @Body() body: { nftId: string; price: number }) {
    return this.nftsService.listNft(user.id, body.nftId, body.price);
  }

  @Delete("listing/:id")
  cancelListing(@CurrentUser() user: any, @Param("id") id: string) {
    return this.nftsService.cancelListing(user.id, id);
  }

  @Post("buy/:listingId")
  buyNft(@CurrentUser() user: any, @Param("listingId") listingId: string) {
    return this.nftsService.buyNft(user.id, listingId);
  }

  @Post("stake/:nftId")
  stakeNft(@CurrentUser() user: any, @Param("nftId") nftId: string) {
    return this.nftsService.stakeNft(user.id, nftId);
  }

  @Post("unstake/:nftId")
  unstakeNft(@CurrentUser() user: any, @Param("nftId") nftId: string) {
    return this.nftsService.unstakeNft(user.id, nftId);
  }

  @Post("auctions/:auctionId/bid")
  placeBid(@CurrentUser() user: any, @Param("auctionId") auctionId: string, @Body() body: { amount: number }) {
    return this.nftsService.placeBid(user.id, auctionId, body.amount);
  }
}
