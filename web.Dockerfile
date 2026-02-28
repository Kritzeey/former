FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
COPY packages ./packages
COPY apps/web ./apps/web
RUN npm install
RUN npx turbo run build --filter=web
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["npm", "run", "start"]