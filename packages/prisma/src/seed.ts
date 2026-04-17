// ============================================================
// OnlyFlags — Database Seed
// Design/Development by Photon-Bounce
// ============================================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🏈 Seeding OnlyFlags database...");

  // ── Platform Config Defaults ────────────────────────────
  const configs = [
    { key: "app_name", value: "OnlyFlags" },
    { key: "app_credits", value: "Design/Development by Photon-Bounce" },
    { key: "marketplace_fee_percent", value: "5" },
    { key: "fantasy_rake_percent", value: "10" },
    { key: "prediction_rake_percent", value: "10" },
    { key: "tournament_rake_percent", value: "10" },
    { key: "creator_platform_cut_percent", value: "20" },
    { key: "creator_royalty_percent", value: "5" },
    { key: "merch_margin_percent", value: "35" },
    { key: "affiliate_cookie_days", value: "30" },
    { key: "max_rewarded_shares_per_day", value: "5" },
    { key: "quiz_pass_threshold", value: "80" },
    { key: "staking_pool_daily_cap", value: "10000" },
    {
      key: "terms_of_service",
      value: "Welcome to OnlyFlags. By using this platform you agree to abide by community guidelines and fair play rules. Full terms will be published before launch.",
    },
    {
      key: "privacy_policy",
      value: "OnlyFlags respects your privacy. We collect only the data necessary to operate the platform. Full privacy policy will be published before launch.",
    },
  ];

  for (const cfg of configs) {
    await prisma.platformConfig.upsert({
      where: { key: cfg.key },
      update: { value: cfg.value },
      create: cfg,
    });
  }

  // ── Subscription Tier Configs ───────────────────────────
  const tiers = [
    {
      tier: "FREE" as const,
      name: "Free",
      priceMonthly: 0,
      priceAnnual: 0,
      tokenPriceMonthly: 0,
      perks: ["Basic access", "Profile & chat", "Team membership", "Earn tokens"],
      stakingMultiplier: 1.0,
      isActive: true,
    },
    {
      tier: "PRO" as const,
      name: "Pro",
      priceMonthly: 9.99,
      priceAnnual: 99.99,
      tokenPriceMonthly: 500,
      perks: [
        "Ad-free experience",
        "24h early NFT drop access",
        "1.5x staking yield",
        "Pro badge NFT",
        "Priority fantasy matchmaking",
      ],
      stakingMultiplier: 1.5,
      isActive: true,
    },
    {
      tier: "ELITE" as const,
      name: "Elite",
      priceMonthly: 24.99,
      priceAnnual: 249.99,
      tokenPriceMonthly: 1200,
      perks: [
        "All Pro perks",
        "2x staking yield",
        "Monthly exclusive NFT airdrop",
        "VIP chat channels",
        "Elite badge NFT",
        "1 free tournament entry/month",
        "Exclusive content access",
      ],
      stakingMultiplier: 2.0,
      isActive: true,
    },
  ];

  for (const tier of tiers) {
    await prisma.subscriptionTierConfig.upsert({
      where: { tier: tier.tier },
      update: tier,
      create: tier,
    });
  }

  // ── Rules Categories (Flag Football) ────────────────────
  const rulesCategories = [
    {
      name: "Basic Rules",
      sortOrder: 1,
      content: `**Game Objectives:** Every game starts at the 5-yard line and the offensive team has 4 downs to move the ball 10 yards for a first down. There are no kickoffs or punts and a coin toss determines which team gets the ball first. No fumbles, laterals, or pitches. The team that scores the most points wins.

**Number of Players:** Team sizes vary from 4 to 10 players. The IFAFA uses 7 players per team.

**Game Duration:** IFAFA games are 21 minutes long. The clock doesn't stop for the first 20 minutes. In the final minute, the clock stops for timeouts, incomplete passes, and when a player goes out of bounds.

**Field Dimensions:** Standard IFAFA field is 50 by 25 yards with two 10-yard end zones. No-run zones are located 5 yards before midfield and 5 yards before the end zone — teams must pass in those spaces.

**Flag Position:** One flag attached to a belt with Velcro is worn around the waist.`,
    },
    {
      name: "Gameplay Regulations",
      sortOrder: 2,
      content: `**Advancing the Ball:** Move the ball by passing and running. Only direct handoffs are allowed — no laterals or pitches. The quarterback can't run forward unless the ball is handed off first.

**Scoring:** Touchdown = 6 points. Kick from 3-yard line after TD = 1 point. 10-yard kick after TD = 2 points. Safety = 2 points (other team punts/kicks from 14-yard line).

**Flag Pulling:** All shirts must be tucked in. An offensive player is down when their flag is pulled by a defender, or when their flag falls out and a defender touches them. You cannot guard your flag with your hands.`,
    },
    {
      name: "Offensive Rules",
      sortOrder: 3,
      content: `**Blocking:** Only screen blocking is allowed. Players must stand straight up with hands in neutral position — no extended arms, body blocks, or roll blocks. Violations result in penalty or expulsion.

**Passing:** The quarterback has 7 seconds to pass. If not initiated, the play is dead. All passes must be forward and beyond the line of scrimmage. A receiver needs 1 foot inbound for a complete pass. Interceptions may be returned.

**Running:** Spinning is allowed but the runner can't jump over a player. The ball is placed where the carrier's feet are when the flag is pulled.`,
    },
    {
      name: "Defensive Rules",
      sortOrder: 4,
      content: `**Defensive Regulations:** A defender can't pull the flag of a player not in possession, and can't hold or push a player to remove their flag.

**Flag Pulling Strategy:** Go for the top of the flag using both hands. Getting it at the top makes it easier to pull off from the Velcro base.

**Blitzing:** Blitzers must line up at least 7 yards off the line of scrimmage and raise 1 arm to identify themselves. If there's a handoff, any player can blitz. Offensive players can't block a blitzer.`,
    },
    {
      name: "Penalties & Infractions",
      sortOrder: 5,
      content: `**Offensive Penalties:**
- Illegal Blocking: Using hands or physical blocks → 10-yard penalty + loss of down
- Charging: Running through a defender → 10-yard penalty + loss of down
- Flag Guarding: Obstructing your flag → 10-yard penalty + loss of down
- False Start: Moving before snap → 5-yard penalty + loss of down
- Delay of Game: Exceeding 30-second play clock → 5-yard penalty + loss of down

**Defensive Penalties:**
- Unnecessary Roughness: Intentional physical contact → 10-yard penalty + automatic first down
- Illegal Rush: Not lined up 7 yards off LOS → 5-yard penalty + automatic first down
- Roughing the Passer: Contacting passer after throw → 5-yard penalty + automatic first down
- Pass Interference: Interfering with a catch → automatic first down at spot of foul
- Offsides: Crossing LOS before snap → 5-yard penalty + automatic first down`,
    },
  ];

  for (const cat of rulesCategories) {
    const existing = await prisma.rulesCategory.findFirst({
      where: { name: cat.name },
    });
    if (!existing) {
      await prisma.rulesCategory.create({ data: cat });
    }
  }

  console.log("✅ Seed complete! OnlyFlags is ready.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
