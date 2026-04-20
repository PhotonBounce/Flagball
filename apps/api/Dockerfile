# ============================================================
# OnlyFlags API — Dockerfile (Staging/Production)
# Design/Development by Photon-Bounce
# ============================================================

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ── Install dependencies ────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json turbo.json tsconfig.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/prisma/package.json ./packages/prisma/
COPY packages/shared/package.json ./packages/shared/
RUN npm ci

# ── Generate Prisma client ──────────────────────────────────
FROM deps AS prisma
COPY packages/prisma ./packages/prisma
RUN npx -w packages/prisma prisma generate

# ── Build shared package ────────────────────────────────────
FROM prisma AS builder
COPY packages/shared ./packages/shared
RUN npm run build --workspace=packages/shared

# ── Build API ───────────────────────────────────────────────
COPY apps/api ./apps/api
RUN npm run build --workspace=apps/api

# ── Production image ────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV APP_ENV=staging

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/
COPY --from=builder --chown=nestjs:nodejs /app/packages/prisma ./packages/prisma
COPY --from=builder --chown=nestjs:nodejs /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/shared/package.json ./packages/shared/
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

WORKDIR /app/apps/api
EXPOSE 4000
CMD ["node", "dist/main"]
