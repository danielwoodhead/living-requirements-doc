FROM node:20-bookworm-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run lint && npm test && npm run build

FROM node:20-bookworm-slim
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=build /usr/src/app/dist dist/
EXPOSE 3000
CMD ["node", "./dist/main.js"]