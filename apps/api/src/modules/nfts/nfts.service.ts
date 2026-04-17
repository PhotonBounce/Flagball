import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { TokensService } from "../tokens/tokens.service";
import { NftType, NftRarity } from "@prisma/client";

@Injectable()
export class NftsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokensService: TokensService,
  ) {}

  // ── NFT Collection ──

  async getUserNfts(userId: string, page = 1, limit = 20, type?: NftType) {
    const where: any = { ownerId: userId };
    if (type) where.type = type;

    const [nfts, total] = await Promise.all([
      this.prisma.nft.findMany({
        where,
        include: { stakedRecord: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.nft.count({ where }),
    ]);

    return { nfts, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getNft(nftId: string) {
    const nft = await this.prisma.nft.findUnique({
      where: { id: nftId },
      include: {
        owner: { select: { id: true, nickname: true, avatarUrl: true } },
        stakedRecord: true,
      },
    });
    if (!nft) throw new NotFoundException("NFT not found");
    return nft;
  }

  async mintNft(userId: string, data: { type: NftType; rarity: NftRarity; name: string; description: string; imageUrl?: string; metadata?: any }) {
    return this.prisma.nft.create({
      data: {
        ownerId: userId,
        type: data.type,
        rarity: data.rarity,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        metadata: data.metadata || {},
      },
    });
  }

  // ── Marketplace ──

  async getListings(page = 1, limit = 20, type?: NftType) {
    const where: any = { status: "ACTIVE" };
    if (type) where.nft = { type };

    const [listings, total] = await Promise.all([
      this.prisma.nftListing.findMany({
        where,
        include: {
          nft: true,
          seller: { select: { id: true, nickname: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.nftListing.count({ where }),
    ]);

    return { listings, total, page, totalPages: Math.ceil(total / limit) };
  }

  async listNft(userId: string, nftId: string, price: number) {
    const nft = await this.prisma.nft.findUnique({
      where: { id: nftId },
      include: { stakedRecord: true },
    });
    if (!nft) throw new NotFoundException("NFT not found");
    if (nft.ownerId !== userId) throw new ForbiddenException("You don't own this NFT");
    if (nft.stakedRecord) throw new BadRequestException("Cannot list a staked NFT");

    const existing = await this.prisma.nftListing.findFirst({
      where: { nftId, status: "ACTIVE" },
    });
    if (existing) throw new BadRequestException("NFT is already listed");

    return this.prisma.nftListing.create({
      data: { nftId, sellerId: userId, price },
    });
  }

  async cancelListing(userId: string, listingId: string) {
    const listing = await this.prisma.nftListing.findUnique({ where: { id: listingId } });
    if (!listing) throw new NotFoundException("Listing not found");
    if (listing.sellerId !== userId) throw new ForbiddenException("Not your listing");

    return this.prisma.nftListing.update({
      where: { id: listingId },
      data: { status: "CANCELLED" },
    });
  }

  async buyNft(buyerId: string, listingId: string) {
    const listing = await this.prisma.nftListing.findUnique({
      where: { id: listingId },
      include: { nft: true },
    });
    if (!listing || listing.status !== "ACTIVE") throw new NotFoundException("Listing not found or inactive");
    if (listing.sellerId === buyerId) throw new BadRequestException("Cannot buy your own NFT");

    const platformFee = Math.floor(listing.price * 0.05);
    const sellerAmount = listing.price - platformFee;

    await this.tokensService.spendTokens(buyerId, listing.price, "NFT purchase", listingId);

    const [nft] = await this.prisma.$transaction([
      this.prisma.nft.update({
        where: { id: listing.nftId },
        data: { ownerId: buyerId },
      }),
      this.prisma.nftListing.update({
        where: { id: listingId },
        data: { status: "SOLD" },
      }),
      this.prisma.nftTransaction.create({
        data: {
          nftId: listing.nftId,
          fromUserId: listing.sellerId,
          toUserId: buyerId,
          price: listing.price,
          currency: "POINTS",
        },
      }),
    ]);

    await this.tokensService.awardTokens(listing.sellerId, sellerAmount, "EARNED", "NFT sale", listingId);

    return nft;
  }

  // ── Staking ──

  async stakeNft(userId: string, nftId: string) {
    const nft = await this.prisma.nft.findUnique({
      where: { id: nftId },
      include: { stakedRecord: true },
    });
    if (!nft) throw new NotFoundException("NFT not found");
    if (nft.ownerId !== userId) throw new ForbiddenException("You don't own this NFT");
    if (nft.stakedRecord) throw new BadRequestException("NFT is already staked");

    const stake = await this.prisma.stakedNft.create({
      data: { userId, nftId },
    });

    return { nft, stake };
  }

  async unstakeNft(userId: string, nftId: string) {
    const stake = await this.prisma.stakedNft.findUnique({
      where: { nftId },
    });
    if (!stake || stake.userId !== userId) throw new NotFoundException("Active stake not found");

    const now = new Date();
    const daysStaked = Math.max(1, Math.floor((now.getTime() - stake.stakedAt.getTime()) / (1000 * 60 * 60 * 24)));
    const dailyYield = 2;
    const reward = daysStaked * dailyYield * stake.lockBonusMultiplier;
    const totalReward = stake.accumulatedYield + reward;

    await this.prisma.stakedNft.delete({ where: { id: stake.id } });

    if (totalReward > 0) {
      await this.tokensService.awardTokens(userId, totalReward, "STAKING_YIELD", `Staking reward for ${daysStaked} days`, stake.id);
    }

    return { nftId, reward: totalReward, daysStaked };
  }

  // ── Auction Drops ──

  async getActiveAuctions(page = 1, limit = 20) {
    const now = new Date();
    const [auctions, total] = await Promise.all([
      this.prisma.nftAuctionDrop.findMany({
        where: { startTime: { lte: now }, endTime: { gt: now } },
        include: { _count: { select: { bids: true } } },
        orderBy: { endTime: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.nftAuctionDrop.count({
        where: { startTime: { lte: now }, endTime: { gt: now } },
      }),
    ]);

    return { auctions, total, page, totalPages: Math.ceil(total / limit) };
  }

  async placeBid(userId: string, auctionId: string, amount: number) {
    const auction = await this.prisma.nftAuctionDrop.findUnique({
      where: { id: auctionId },
      include: { bids: { orderBy: { bidAmount: "desc" }, take: 1 } },
    });

    if (!auction) throw new NotFoundException("Auction not found");
    const now = new Date();
    if (now < auction.startTime || now > auction.endTime) {
      throw new BadRequestException("Auction is not active");
    }

    const currentHighBid = auction.bids[0]?.bidAmount || 0;
    if (amount <= currentHighBid) {
      throw new BadRequestException(`Bid must exceed current high bid of ${currentHighBid}`);
    }
    if (amount < auction.startPrice) {
      throw new BadRequestException(`Bid must be at least ${auction.startPrice}`);
    }

    return this.prisma.nftAuctionBid.create({
      data: { dropId: auctionId, userId, bidAmount: amount },
    });
  }
}
