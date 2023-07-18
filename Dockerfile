FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx prisma db pull

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]