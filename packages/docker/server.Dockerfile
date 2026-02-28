FROM node:20-alpine
WORKDIR /app

# Copy configuration and workspaces
COPY package*.json turbo.json ./
COPY packages ./packages
COPY apps/server ./apps/server

# Install dependencies
RUN npm install

# Create the dummy .env so Prisma v7 can generate types at build time
RUN echo 'DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"' > apps/server/.env
RUN cd packages/db && npx prisma generate

# Build the server
RUN npx turbo run build --filter=server

WORKDIR /app/apps/server
ENV NODE_ENV=production
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]