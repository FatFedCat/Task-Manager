FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY node_modules ./node_modules
COPY src/ ./src/

EXPOSE 5000

CMD ["node", "src/server.js"]
