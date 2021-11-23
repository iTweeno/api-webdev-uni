#Eu FROM node:12.19.0-buster
FROM node:16-buster

#app dir
WORKDIR /app

#dependencies
COPY . .
RUN yarn install --production --frozen-lockfile --ignore-scripts
RUN yarn prisma generate
EXPOSE 6000

CMD [ "yarn", "run", "prod"]