# Stage 1: Build
FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json ./
COPY bun.lockb* ./

RUN bun install --frozen-lockfile

COPY . .

# If there's a build step, run it
RUN if [ -f "src/app.ts" ]; then bun build ./src/app.ts --outdir ./dist; fi

# Stage 2: Production
FROM oven/bun:distroless

WORKDIR /app

# Copy only the built assets and necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the application
CMD ["run", "src/app.ts"]
