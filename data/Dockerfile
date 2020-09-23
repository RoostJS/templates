## Build Stage
FROM node:14 as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm ci --quiet && \
  npm cache clean --force && \
  npm run build

## Production Stage
FROM node:14-alpine

ARG DATA_PORT=3000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
RUN npm ci --quiet --only=production
COPY --from=build /usr/src/app/dist ./dist

EXPOSE $DATA_PORT

CMD ["node", "dist/main"]