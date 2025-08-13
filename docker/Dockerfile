FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN yarn

COPY . .

EXPOSE 5002

CMD [ "yarn", "dev" ]
