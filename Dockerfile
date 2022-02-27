FROM node:alpine

WORKDIR /app

EXPOSE 1234

COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN yarn

COPY src ./src

CMD ["yarn", "start"]