# ============================================================
# OnlyFlags Web — Dockerfile (Staging/Production)
# Design/Development by Photon-Bounce
# ============================================================

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ── Install dependencies ────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json turbo.json tsconfig.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
RUN npm ci

# ── Build shared package ────────────────────────────────────
FROM deps AS builder
COPY packages/shared ./packages/shared
RUN npm run build --workspace=packages/shared

# ── Build web app ───────────────────────────────────────────
COPY apps/web ./apps/web

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_OUTPUT=standalone
RUN npm run build --workspace=apps/web

# ── Production image ────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV APP_ENV=staging
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs
WORKDIR /app/apps/web
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
