// ============================================================
// OnlyFlags — Core Type Definitions
// Design/Development by Photon-Bounce
// ============================================================

import {
  UserRole,
  NftType,
  NftRarity,
  AffiliateTier,
  SubscriptionTier,
  SocialPlatform,
  ShareableContentType,
  AuctionType,
  FantasyContestType,
  TournamentFormat,
  PredictionType,
  CreatorCategory,
  TokenTransactionType,
} from "./constants";

// ── Users ──────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  phone: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: number;
  bio: string | null;
  avatarUrl: string | null;
  isPublic: boolean;
  role: UserRole;
  walletAddress: string | null;
  tosAcceptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ── Teams ──────────────────────────────────────────────────

export interface Team {
  id: string;
  name: string;
  city: string;
  state: string;
  logoUrl: string | null;
  status: "PENDING" | "ACTIVE" | "ARCHIVED";
  createdAt: Date;
}

export interface TeamMembership {
  id: string;
  userId: string;
  teamId: string;
  role: "MEMBER" | "CAPTAIN";
  joinedAt: Date;
}

export interface TeamRequest {
  id: string;
  requesterId: string;
  city: string;
  state: string;
  referralEmails: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
}

// ── Naming Contests ────────────────────────────────────────

export interface NamingContest {
  id: string;
  city: string;
  state: string;
  status: "OPEN" | "CLOSED";
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface NamingContestEntry {
  id: string;
  contestId: string;
  userId: string;
  suggestedName: string;
  isWinner: boolean;
  createdAt: Date;
}

// ── Tokens ─────────────────────────────────────────────────

export interface TokenBalance {
  id: string;
  userId: string;
  balance: number;
  lifetimeEarned: number;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: TokenTransactionType;
  reason: string;
  referenceId: string | null;
  createdAt: Date;
}

// ── NFTs ───────────────────────────────────────────────────

export interface Nft {
  id: string;
  ownerId: string;
  type: NftType;
  rarity: NftRarity;
  name: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  metadata: Record<string, unknown>;
  xp: number;
  level: number;
  mintedOnChain: boolean;
  tokenId: string | null;
  contractAddress: string | null;
  createdAt: Date;
}

export interface NftListing {
  id: string;
  nftId: string;
  sellerId: string;
  price: number;
  currency: "POINTS" | "MATIC";
  status: "ACTIVE" | "SOLD" | "CANCELLED";
  createdAt: Date;
}

export interface NftTransaction {
  id: string;
  nftId: string;
  fromUserId: string;
  toUserId: string;
  price: number;
  currency: "POINTS" | "MATIC";
  createdAt: Date;
}

// ── NFT Auction Drops ──────────────────────────────────────

export interface NftAuctionDrop {
  id: string;
  name: string;
  description: string;
  nftTemplateMetadata: Record<string, unknown>;
  quantity: number;
  auctionType: AuctionType;
  startPrice: number;
  reservePrice: number | null;
  priceDecrement: number | null;
  startTime: Date;
  endTime: Date;
  status: "SCHEDULED" | "ACTIVE" | "ENDED";
  createdAt: Date;
}

export interface NftAuctionBid {
  id: string;
  dropId: string;
  userId: string;
  bidAmount: number;
  createdAt: Date;
}

// ── Staking ────────────────────────────────────────────────

export interface StakedNft {
  id: string;
  nftId: string;
  userId: string;
  stakedAt: Date;
  lockPeriodDays: number | null;
  lockBonusMultiplier: number;
  accumulatedYield: number;
  lastYieldClaimAt: Date;
}

// ── Player Game Stats ──────────────────────────────────────

export interface PlayerGameStats {
  id: string;
  playerId: string;
  eventId: string;
  touchdownsThrown: number;
  touchdownsCaught: number;
  yardsGained: number;
  interceptions: number;
  flagsPulled: number;
  completions: number;
  sacks: number;
  xpEarned: number;
  enteredByRefId: string;
  approvedByAdminId: string | null;
  status: "PENDING" | "APPROVED";
  createdAt: Date;
}

// ── Events ─────────────────────────────────────────────────

export interface GameEvent {
  id: string;
  teamId: string;
  opponentTeamId: string | null;
  venueName: string;
  venueAddress: string;
  dateTime: Date;
  description: string | null;
  createdAt: Date;
}

// ── Chat ───────────────────────────────────────────────────

export interface ChatPermission {
  id: string;
  requesterId: string;
  targetId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "BLOCKED";
  createdAt: Date;
}

// ── Videos ─────────────────────────────────────────────────

export interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
}

// ── Products (Supplements) ─────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  externalUrl: string | null;
  isActive: boolean;
  stock: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  shippingAddress: string;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

// ── Fantasy ────────────────────────────────────────────────

export interface FantasyContest {
  id: string;
  name: string;
  type: FantasyContestType;
  entryFee: number;
  maxEntries: number;
  prizePool: number;
  platformRake: number;
  scoringRules: Record<string, number>;
  linkedEventIds: string[];
  status: "OPEN" | "LOCKED" | "SCORING" | "COMPLETED";
  startTime: Date;
  endTime: Date;
  createdAt: Date;
}

export interface FantasyEntry {
  id: string;
  contestId: string;
  userId: string;
  roster: { playerId: string; position: string }[];
  totalPoints: number;
  rank: number | null;
  payout: number;
  createdAt: Date;
}

// ── Predictions ────────────────────────────────────────────

export interface PredictionMarket {
  id: string;
  eventId: string;
  question: string;
  type: PredictionType;
  options: string[];
  correctOption: string | null;
  totalPool: number;
  platformRake: number;
  status: "OPEN" | "LOCKED" | "RESOLVED";
  createdAt: Date;
}

export interface PredictionWager {
  id: string;
  marketId: string;
  userId: string;
  selectedOption: string;
  amount: number;
  payout: number | null;
  createdAt: Date;
}

// ── Tournaments ────────────────────────────────────────────

export interface Tournament {
  id: string;
  name: string;
  format: TournamentFormat;
  entryFee: number;
  prizeDistribution: Record<string, number>;
  platformRake: number;
  status: "REGISTRATION" | "IN_PROGRESS" | "COMPLETED";
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface TournamentTeamEntry {
  id: string;
  tournamentId: string;
  teamId: string;
  seed: number | null;
  eliminated: boolean;
  placement: number | null;
}

export interface TournamentMatch {
  id: string;
  tournamentId: string;
  eventId: string | null;
  round: number;
  matchNumber: number;
  team1Id: string;
  team2Id: string;
  winnerId: string | null;
}

// ── Subscriptions ──────────────────────────────────────────

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  stripeSubscriptionId: string | null;
  tokenPayment: boolean;
  startDate: Date;
  endDate: Date;
  status: "ACTIVE" | "CANCELLED" | "EXPIRED";
  autoRenew: boolean;
  createdAt: Date;
}

export interface SubscriptionTierConfig {
  id: string;
  tier: SubscriptionTier;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  tokenPriceMonthly: number;
  perks: string[];
  stakingMultiplier: number;
  isActive: boolean;
}

// ── Creator Marketplace ────────────────────────────────────

export interface CreatorContent {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  category: CreatorCategory;
  contentUrl: string;
  thumbnailUrl: string | null;
  price: number;
  status: "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "LISTED";
  royaltyPercent: number;
  createdAt: Date;
}

export interface CreatorSale {
  id: string;
  contentNftId: string;
  sellerId: string;
  buyerId: string;
  price: number;
  creatorRoyalty: number;
  platformFee: number;
  createdAt: Date;
}

// ── Merch ──────────────────────────────────────────────────

export interface MerchProduct {
  id: string;
  printfulProductId: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  platformMargin: number;
  imageUrl: string | null;
  teamId: string | null;
  nftUnlockRequired: NftType | null;
  isActive: boolean;
  createdAt: Date;
}

export interface MerchOrder {
  id: string;
  userId: string;
  printfulOrderId: string;
  items: { productId: string; quantity: number; size: string; color: string }[];
  totalPrice: number;
  tokenDiscount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  shippingAddress: string;
  trackingUrl: string | null;
  createdAt: Date;
}

// ── Social Sharing ─────────────────────────────────────────

export interface ShareEvent {
  id: string;
  userId: string;
  contentType: ShareableContentType;
  contentId: string;
  platform: SocialPlatform;
  deepLinkId: string;
  tokensAwarded: number;
  createdAt: Date;
}

export interface ShareStreak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastShareDate: Date;
  multiplier: number;
  graceDaysUsed: number;
}

// ── Affiliates ─────────────────────────────────────────────

export interface AffiliateProfile {
  id: string;
  userId: string;
  affiliateCode: string;
  tier: AffiliateTier;
  totalReferrals: number;
  lifetimeEarnings: number;
  createdAt: Date;
}

export interface AffiliateReferral {
  id: string;
  affiliateId: string;
  referredUserId: string;
  attributionSource: "URL" | "QR" | "CAMPAIGN";
  campaignTag: string | null;
  signedUpAt: Date;
}

export interface AffiliateCommission {
  id: string;
  affiliateId: string;
  referralId: string;
  sourceType: "SIGNUP" | "SUPPLEMENT" | "NFT_TRADE" | "SEASON_PASS" | "EVENT_TICKET";
  sourceOrderId: string | null;
  amount: number;
  commissionRate: number;
  isMultiLevel: boolean;
  paidOut: boolean;
  createdAt: Date;
}

// ── Wallets ────────────────────────────────────────────────

export interface UserWallet {
  id: string;
  userId: string;
  type: "CUSTODIAL" | "EXTERNAL";
  address: string;
  createdAt: Date;
}

// ── Smart Contract Deployments ─────────────────────────────

export interface SmartContractDeployment {
  id: string;
  contractType: "NFT_COLLECTION" | "TOKEN" | "MARKETPLACE" | "SEASON_PASS" | "STAKING" | "AUCTION" | "DYNAMIC_NFT" | "CREATOR_ROYALTY";
  address: string;
  chainId: number;
  config: Record<string, unknown>;
  deployedBy: string;
  deployedAt: Date;
}

// ── Platform Config ────────────────────────────────────────

export interface PlatformConfig {
  key: string;
  value: string;
  updatedAt: Date;
}

// ── Push Notifications ─────────────────────────────────────

export interface PushNotificationLog {
  id: string;
  adminId: string;
  targetType: "ALL" | "TEAM" | "GENDER" | "CITY_STATE" | "INDIVIDUAL";
  targetFilter: Record<string, unknown>;
  title: string;
  body: string;
  sentAt: Date;
}

// ── Rules & Quiz ───────────────────────────────────────────

export interface RulesCategory {
  id: string;
  name: string;
  sortOrder: number;
  content: string;
}

export interface QuizQuestion {
  id: string;
  categoryId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  isActive: boolean;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  completionTimeSeconds: number;
  createdAt: Date;
}

// ── Promotional Assets ─────────────────────────────────────

export interface PromotionalAsset {
  id: string;
  title: string;
  type: "IMAGE" | "BANNER" | "COPY_TEMPLATE";
  url: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}
