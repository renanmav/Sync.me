FROM node:10.15.3-alpine

RUN mkdir /usr/app
WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "dev"]
