FROM node:18-slim

RUN apt-get update && \
    apt-get install -y ffmpeg imagemagick webp && \
    apt-get clean

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
