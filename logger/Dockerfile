FROM node:alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine as runner

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY --from=builder /app/build ./

CMD ["node", "index.js"]
