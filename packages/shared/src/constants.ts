// ============================================================
// OnlyFlags — Platform Constants
// Design/Development by Photon-Bounce
// ============================================================

export const APP_NAME = "OnlyFlags";
export const APP_CREDITS = "Design/Development by Photon-Bounce";
export const APP_VERSION = "0.1.0";

// Roles
export enum UserRole {
  FAN = "FAN",
  REFEREE = "REFEREE",
  ADMIN = "ADMIN",
}

// NFT Types
export enum NftType {
  ATTENDANCE = "ATTENDANCE",
  ACHIEVEMENT = "ACHIEVEMENT",
  REFERRAL = "REFERRAL",
  CONTEST = "CONTEST",
  SEASON_PASS = "SEASON_PASS",
  HIGHLIGHT = "HIGHLIGHT",
  RULES_EXPERT = "RULES_EXPERT",
  SOCIAL_CHAMPION = "SOCIAL_CHAMPION",
  PLAYER_CARD = "PLAYER_CARD",
  CREATOR = "CREATOR",
  TOURNAMENT = "TOURNAMENT",
  SUBSCRIPTION_BADGE = "SUBSCRIPTION_BADGE",
}

// NFT Rarity
export enum NftRarity {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

// Token Transaction Types
export enum TokenTransactionType {
  EARNED = "EARNED",
  SPENT = "SPENT",
  ADMIN_GRANT = "ADMIN_GRANT",
  STAKING_YIELD = "STAKING_YIELD",
  AFFILIATE_COMMISSION = "AFFILIATE_COMMISSION",
  FANTASY_PRIZE = "FANTASY_PRIZE",
  PREDICTION_PRIZE = "PREDICTION_PRIZE",
  TOURNAMENT_PRIZE = "TOURNAMENT_PRIZE",
  CREATOR_SALE = "CREATOR_SALE",
  SHARE_REWARD = "SHARE_REWARD",
}

// Affiliate Tiers
export enum AffiliateTier {
  STARTER = "STARTER",
  PRO = "PRO",
  ELITE = "ELITE",
}

export const AFFILIATE_TIER_THRESHOLDS = {
  [AffiliateTier.STARTER]: 0,
  [AffiliateTier.PRO]: 50,
  [AffiliateTier.ELITE]: 200,
} as const;

export const AFFILIATE_COMMISSION_RATES = {
  [AffiliateTier.STARTER]: 0.1,
  [AffiliateTier.PRO]: 0.15,
  [AffiliateTier.ELITE]: 0.2,
} as const;

export const AFFILIATE_MULTI_LEVEL_RATE = 0.03;

// Staking Yield (tokens per day by rarity)
export const STAKING_DAILY_YIELD = {
  [NftRarity.COMMON]: 1,
  [NftRarity.UNCOMMON]: 3,
  [NftRarity.RARE]: 8,
  [NftRarity.EPIC]: 20,
  [NftRarity.LEGENDARY]: 50,
} as const;

// Staking Lock Bonuses
export const STAKING_LOCK_MULTIPLIERS = {
  7: 1.2,
  30: 1.5,
  90: 2.0,
} as const;

// Player Card XP Awards
export const XP_AWARDS = {
  TOUCHDOWN_THROWN: 50,
  TOUCHDOWN_CAUGHT: 50,
  FLAG_PULLED: 20,
  INTERCEPTION: 40,
  YARDS_100_PLUS: 30,
} as const;

// Player Card Level → Rarity Mapping
export const LEVEL_RARITY_MAP: Record<string, NftRarity> = {
  "1-9": NftRarity.COMMON,
  "10-19": NftRarity.UNCOMMON,
  "20-29": NftRarity.RARE,
  "30-39": NftRarity.EPIC,
  "40-50": NftRarity.LEGENDARY,
};

export function getRarityForLevel(level: number): NftRarity {
  if (level >= 40) return NftRarity.LEGENDARY;
  if (level >= 30) return NftRarity.EPIC;
  if (level >= 20) return NftRarity.RARE;
  if (level >= 10) return NftRarity.UNCOMMON;
  return NftRarity.COMMON;
}

// Share Streak Multipliers
export const SHARE_STREAK_MULTIPLIERS = {
  3: 1.5,
  7: 2.0,
  30: 3.0,
} as const;

// Subscription Tiers
export enum SubscriptionTier {
  FREE = "FREE",
  PRO = "PRO",
  ELITE = "ELITE",
}

// Social Platforms
export enum SocialPlatform {
  INSTAGRAM = "INSTAGRAM",
  TIKTOK = "TIKTOK",
  X = "X",
  FACEBOOK = "FACEBOOK",
  SNAPCHAT = "SNAPCHAT",
  YOUTUBE = "YOUTUBE",
}

// Shareable Content Types
export enum ShareableContentType {
  NFT = "NFT",
  HIGHLIGHT = "HIGHLIGHT",
  EVENT = "EVENT",
  ACHIEVEMENT = "ACHIEVEMENT",
  REFERRAL = "REFERRAL",
  PROFILE = "PROFILE",
}

// Auction Types
export enum AuctionType {
  ENGLISH = "ENGLISH",
  DUTCH = "DUTCH",
  FIXED_PRICE = "FIXED_PRICE",
}

// Fantasy Contest Types
export enum FantasyContestType {
  HEAD_TO_HEAD = "HEAD_TO_HEAD",
  TOURNAMENT = "TOURNAMENT",
  FIFTY_FIFTY = "FIFTY_FIFTY",
}

// Tournament Formats
export enum TournamentFormat {
  SINGLE_ELIMINATION = "SINGLE_ELIMINATION",
  DOUBLE_ELIMINATION = "DOUBLE_ELIMINATION",
  ROUND_ROBIN = "ROUND_ROBIN",
}

// Prediction Market Types
export enum PredictionType {
  MATCH_WINNER = "MATCH_WINNER",
  SCORE_RANGE = "SCORE_RANGE",
  MVP = "MVP",
  FIRST_TOUCHDOWN = "FIRST_TOUCHDOWN",
  CUSTOM = "CUSTOM",
}

// Creator Content Categories
export enum CreatorCategory {
  HIGHLIGHT_COMPILATION = "HIGHLIGHT_COMPILATION",
  PLAYBOOK = "PLAYBOOK",
  TRAINING_VIDEO = "TRAINING_VIDEO",
  FAN_ART = "FAN_ART",
}

// Platform Revenue Defaults
export const PLATFORM_DEFAULTS = {
  MARKETPLACE_FEE_PERCENT: 5,
  FANTASY_RAKE_PERCENT: 10,
  PREDICTION_RAKE_PERCENT: 10,
  TOURNAMENT_RAKE_PERCENT: 10,
  CREATOR_PLATFORM_CUT_PERCENT: 20,
  CREATOR_ROYALTY_PERCENT: 5,
  MERCH_MARGIN_PERCENT: 35,
  AFFILIATE_COOKIE_DAYS: 30,
  MAX_REWARDED_SHARES_PER_DAY: 5,
  QUIZ_PASS_THRESHOLD: 80,
} as const;
