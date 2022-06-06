FROM node:16-slim

WORKDIR  /usr/src/public

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]