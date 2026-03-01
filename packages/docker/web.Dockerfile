# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json turbo.json ./
COPY packages ./packages
COPY apps/web ./apps/web

RUN npm install
RUN npx turbo run build --filter=web

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built assets from the builder stage
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
# Copy your custom Nginx routing configuration
COPY docker/packages/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]