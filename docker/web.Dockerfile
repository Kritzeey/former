FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json turbo.json ./
COPY packages ./packages
COPY apps/web ./apps/web
RUN npm install
RUN npx turbo run build --filter=web

FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]