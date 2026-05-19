# ---- backend build ----
FROM node:22-slim AS backend-build

# Install native dependencies required by canvas and sharp
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    pkg-config \
    git \
    libcairo2-dev \
    libpango1.0-dev \
    libgif-dev \
    libjpeg-dev \
    librsvg2-dev \
    libpixman-1-dev \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace config files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
COPY scripts/ ./scripts/

# Install backend dependencies only (--ignore-scripts to skip failing pathfinder postinstall)
RUN pnpm install --filter knowledgebook-backend --ignore-scripts --frozen-lockfile || pnpm install --filter knowledgebook-backend --ignore-scripts

# Rebuild native addons that need compilation (canvas, sharp, etc.)
RUN pnpm rebuild canvas --filter knowledgebook-backend

# Build and link @nxg-org/mineflayer-pathfinder (2026-rewrite has no pre-built dist)
RUN node scripts/build-pathfinder.mjs

# Copy backend source
COPY backend/ ./backend/

# ---- frontend build ----
FROM node:22-alpine AS frontend-build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json .npmrc ./
COPY frontend/package.json ./frontend/

RUN pnpm install --filter frontend --frozen-lockfile || pnpm install --filter frontend

COPY frontend/ ./frontend/

RUN pnpm --filter frontend build

# ---- final backend image ----
FROM node:22-slim AS backend

RUN apt-get update && apt-get install -y --no-install-recommends \
    libcairo2 \
    libpango1.0-0 \
    libgif7 \
    libjpeg62-turbo \
    librsvg2-2 \
    libpixman-1-0 \
    openssl \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=backend-build /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=backend-build /app/package.json ./package.json
COPY --from=backend-build /app/.npmrc ./.npmrc
COPY --from=backend-build /app/backend ./backend
COPY --from=backend-build /app/node_modules ./node_modules

EXPOSE 4500 3001

CMD ["node", "backend/main.js"]
