# ---- Base Stage ----
# Use a slim Node.js 20 image
FROM node:20-alpine AS base
# Fail build on any command failure
SHELL ["/bin/sh", "-e", "-c"]
WORKDIR /app

# ---- Dependencies Stage ----
# Install dependencies first to leverage Docker cache
FROM base AS deps
# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Builder Stage ----
# Build the application
#
# --- FIX: Change 'FROM base' to 'FROM deps' ---
# This stage will now inherit pnpm and the installed node_modules
FROM deps AS builder
# We no longer need 'COPY --from=deps /app/node_modules ./node_modules'
# because it's already included in the 'deps' image.
COPY . .

# Set NODE_ENV to production for the build
ENV NODE_ENV=production
RUN pnpm run build

# ---- Runner Stage ----
# Create the final, minimal production image
FROM base AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy the standalone output from the builder
# We use --chown to set permissions for the non-root 'node' user
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# ADDED: Copy the .env file from the builder stage to the runner stage
# This makes it available for the 'node server.js' command
COPY --from=builder --chown=node:node /app/.env ./

# Run as the non-root 'node' user for better security
USER node

EXPOSE 3000
ENV PORT=3000

# Run the standalone server
CMD ["node", "server.js"]
