FROM node:22-slim AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx turbo run build --filter=server

FROM node:22-slim AS runner
WORKDIR /app
COPY --from=builder /app .
WORKDIR /app/apps/server
CMD ["npm", "run", "start"]