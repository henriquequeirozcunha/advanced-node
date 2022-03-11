FROM node:16

WORKDIR /app

COPY ./package.json .

RUN npm install husky -g
RUN npm run prepare
RUN npm install jest -g
RUN npm install --only=prod

COPY . .

EXPOSE 8000
