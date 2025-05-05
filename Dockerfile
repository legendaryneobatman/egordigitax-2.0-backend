FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY turbo.json .

# Копируем исходный код
COPY . .

# Устанавливаем зависимости
RUN npm install

# Собираем все приложения
RUN npm run build
