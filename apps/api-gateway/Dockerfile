FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY apps/api-gateway/package.json ./apps/api-gateway/package.json

COPY . .

EXPOSE 3000

CMD ["node", "apps/api-gateway/dist/src/main.js"]
