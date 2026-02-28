FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY turbo.json ./
COPY packages ./packages
COPY apps/server ./apps/server
RUN npm install
RUN cd packages/db && npx prisma generate
RUN npx turbo run build --filter=server
WORKDIR /app/apps/server
EXPOSE 3000
CMD ["npm", "run", "start"]
