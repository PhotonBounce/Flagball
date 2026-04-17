// ============================================================
// OnlyFlags — Zod Validation Schemas
// Design/Development by Photon-Bounce
// ============================================================

import { z } from "zod";

// ── Auth Schemas ───────────────────────────────────────────

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format"),
  nickname: z
    .string()
    .min(2, "Nickname must be at least 2 characters")
    .max(30, "Nickname must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Nickname can only contain letters, numbers, underscores, and hyphens"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  age: z.number().int().min(13, "Must be at least 13 years old").max(120),
  bio: z.string().max(500).optional(),
});

export const loginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone is required",
});

export const verifyOtpSchema = z.object({
  identifier: z.string(),
  code: z.string().length(6, "OTP must be 6 digits"),
});

// ── Profile Schemas ────────────────────────────────────────

export const updateProfileSchema = z.object({
  nickname: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
  bio: z.string().max(500).optional(),
  isPublic: z.boolean().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
});

export const profileSearchSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  ageMin: z.number().int().min(13).optional(),
  ageMax: z.number().int().max(120).optional(),
  teamId: z.string().uuid().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

// ── Team Schemas ───────────────────────────────────────────

export const teamRequestSchema = z.object({
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  referralEmails: z
    .array(z.string().email("Invalid email address"))
    .length(5, "Exactly 5 referral emails are required"),
});

export const namingContestEntrySchema = z.object({
  contestId: z.string().uuid(),
  suggestedName: z.string().min(2).max(50),
});

// ── NFT Schemas ────────────────────────────────────────────

export const listNftSchema = z.object({
  nftId: z.string().uuid(),
  price: z.number().positive("Price must be positive"),
  currency: z.enum(["POINTS", "MATIC"]),
});

export const auctionBidSchema = z.object({
  dropId: z.string().uuid(),
  bidAmount: z.number().positive("Bid must be positive"),
});

export const stakeNftSchema = z.object({
  nftId: z.string().uuid(),
  lockPeriodDays: z.number().int().refine(
    (val) => val === 0 || val === 7 || val === 30 || val === 90,
    "Lock period must be 0, 7, 30, or 90 days"
  ),
});

// ── Fantasy Schemas ────────────────────────────────────────

export const fantasyEntrySchema = z.object({
  contestId: z.string().uuid(),
  roster: z
    .array(
      z.object({
        playerId: z.string().uuid(),
        position: z.string(),
      })
    )
    .min(1, "Roster must have at least 1 player"),
});

// ── Prediction Schemas ─────────────────────────────────────

export const predictionWagerSchema = z.object({
  marketId: z.string().uuid(),
  selectedOption: z.string(),
  amount: z.number().positive("Wager must be positive"),
});

// ── Game Stats Schemas (Referee) ───────────────────────────

export const gameStatsSchema = z.object({
  playerId: z.string().uuid(),
  eventId: z.string().uuid(),
  touchdownsThrown: z.number().int().min(0).default(0),
  touchdownsCaught: z.number().int().min(0).default(0),
  yardsGained: z.number().int().min(0).default(0),
  interceptions: z.number().int().min(0).default(0),
  flagsPulled: z.number().int().min(0).default(0),
  completions: z.number().int().min(0).default(0),
  sacks: z.number().int().min(0).default(0),
});

// ── Creator Schemas ────────────────────────────────────────

export const createContentSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  category: z.enum(["HIGHLIGHT_COMPILATION", "PLAYBOOK", "TRAINING_VIDEO", "FAN_ART"]),
  price: z.number().positive("Price must be positive"),
});

// ── Sharing Schemas ────────────────────────────────────────

export const shareEventSchema = z.object({
  contentType: z.enum(["NFT", "HIGHLIGHT", "EVENT", "ACHIEVEMENT", "REFERRAL", "PROFILE"]),
  contentId: z.string(),
  platform: z.enum(["INSTAGRAM", "TIKTOK", "X", "FACEBOOK", "SNAPCHAT", "YOUTUBE"]),
});

// ── Push Notification Schemas (Admin) ──────────────────────

export const pushNotificationSchema = z.object({
  targetType: z.enum(["ALL", "TEAM", "GENDER", "CITY_STATE", "INDIVIDUAL"]),
  targetFilter: z.record(z.unknown()),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(500),
});

// ── Event Schemas (Admin) ──────────────────────────────────

export const createEventSchema = z.object({
  teamId: z.string().uuid(),
  opponentTeamId: z.string().uuid().optional(),
  venueName: z.string().min(2).max(200),
  venueAddress: z.string().min(5).max(500),
  dateTime: z.string().datetime(),
  description: z.string().max(1000).optional(),
});

// ── Pagination ─────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ProfileSearchInput = z.infer<typeof profileSearchSchema>;
export type TeamRequestInput = z.infer<typeof teamRequestSchema>;
export type ListNftInput = z.infer<typeof listNftSchema>;
export type AuctionBidInput = z.infer<typeof auctionBidSchema>;
export type StakeNftInput = z.infer<typeof stakeNftSchema>;
export type FantasyEntryInput = z.infer<typeof fantasyEntrySchema>;
export type PredictionWagerInput = z.infer<typeof predictionWagerSchema>;
export type GameStatsInput = z.infer<typeof gameStatsSchema>;
export type CreateContentInput = z.infer<typeof createContentSchema>;
export type ShareEventInput = z.infer<typeof shareEventSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
