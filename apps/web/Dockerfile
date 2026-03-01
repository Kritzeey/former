FROM node:22-slim AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

FROM node:22-slim AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN npm install
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=web

FROM node:22-slim AS runner
WORKDIR /app
COPY --from=installer /app .
WORKDIR /app/apps/web
CMD ["npm", "run", "start"]