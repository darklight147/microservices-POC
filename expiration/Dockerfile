FROM node:alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

FROM node:alpine as runner

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY --from=builder /app/dist ./

CMD ["node", "index.js"]
