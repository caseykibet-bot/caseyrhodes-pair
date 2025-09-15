FROM node:lts-bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    imagemagick \
    webp && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && \
    npm install -g qrcode-terminal pm2

COPY . .

EXPOSE 5000

USER node

CMD ["npm", "start"]
