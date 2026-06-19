FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set fetch-retries 5 \
    && npm ci --omit=dev

COPY src/ ./src/

EXPOSE 5000

CMD ["node", "src/server.js"]
