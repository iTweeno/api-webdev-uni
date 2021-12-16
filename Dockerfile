FROM node:16-buster

WORKDIR /app

COPY . .
RUN yarn install --production --frozen-lockfile
RUN yarn config set unsafe-perm true
RUN yarn global add prisma
EXPOSE 6000

CMD yarn run prisma ; yarn run prod