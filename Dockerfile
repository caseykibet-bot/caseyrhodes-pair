FROM node:lts-alpine

RUN apk add --no-cache \
    ffmpeg \
    imagemagick \
    webp

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && \
    npm install -g qrcode-terminal pm2

COPY . .

EXPOSE 5000

USER node

CMD ["npm", "start"]
