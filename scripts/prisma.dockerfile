FROM node:20.11.1-bullseye-slim

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "prisma:studio"]
