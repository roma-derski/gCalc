FROM node:18 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8000

ENV NODE_PATH=./build/src

RUN npm run build

# CMD ["npm", "start"]