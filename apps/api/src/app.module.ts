// ============================================================
// OnlyFlags API — Root Module
// Design/Development by Photon-Bounce
// ============================================================

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { ScheduleModule } from "@nestjs/schedule";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { TeamsModule } from "./modules/teams/teams.module";
import { TokensModule } from "./modules/tokens/tokens.module";
import { NftsModule } from "./modules/nfts/nfts.module";
import { EventsModule } from "./modules/events/events.module";
import { HealthModule } from "./modules/health/health.module";
import { AffiliatesModule } from "./modules/affiliates/affiliates.module";
import { FantasyModule } from "./modules/fantasy/fantasy.module";
import { PredictionsModule } from "./modules/predictions/predictions.module";
import { SharingModule } from "./modules/sharing/sharing.module";
import { TournamentsModule } from "./modules/tournaments/tournaments.module";

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate limiting: 100 requests per 60 seconds per IP
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

    // Scheduled tasks (staking yield, streak checks, etc.)
    ScheduleModule.forRoot(),

    // Core
    PrismaModule,
    HealthModule,

    // Feature modules
    AuthModule,
    UsersModule,
    TeamsModule,
    TokensModule,
    NftsModule,
    EventsModule,
    AffiliatesModule,
    FantasyModule,
    PredictionsModule,
    SharingModule,
    TournamentsModule,
  ],
})
export class AppModule {}
