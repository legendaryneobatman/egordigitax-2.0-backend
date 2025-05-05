FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY turbo.json .

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем все приложения
RUN npm run build
