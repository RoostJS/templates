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

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
RUN npm ci --quiet --only=production
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 80

CMD ["node", "dist/main"]