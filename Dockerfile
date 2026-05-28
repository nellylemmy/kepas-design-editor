FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY src ./src
COPY templates ./templates
COPY public ./public
COPY migrations ./migrations
COPY scripts ./scripts

EXPOSE 4200

CMD ["node", "src/index.js"]
