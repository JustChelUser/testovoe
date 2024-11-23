FROM node:22

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 7000

CMD ["sh", "-c","npm run migration:run && npm run start:prod"]