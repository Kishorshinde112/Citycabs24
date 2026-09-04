# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled frontend dist and server code
COPY --from=builder /app/dist ./dist
COPY server ./server
COPY public ./public

ENV NODE_ENV=production
ENV PORT=80
ENV DATA_DIR=/app/data

EXPOSE 80
CMD ["node", "server/index.js"]
