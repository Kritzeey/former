FROM node:20-alpine
WORKDIR /app

COPY package*.json turbo.json ./
COPY packages ./packages
COPY apps/server ./apps/server

RUN npm install

RUN cd packages/db && DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

RUN npx turbo run build --filter=server

WORKDIR /app/apps/server
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]