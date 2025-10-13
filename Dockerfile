# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy source code and TypeScript config
COPY tsconfig.json ./
COPY src ./src

# Build the TypeScript code
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built code from builder stage
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
