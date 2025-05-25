FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY turbo.json .

# Копируем исходный код
COPY . .

# Устанавливаем зависимости
RUN npm install

RUN chmod +x ./cli/generate-prisma-clients.sh

# Добавьте установку bash и dos2unix
RUN apk add --no-cache bash dos2unix

# Конвертируем форматы строк и даем права
RUN dos2unix ./cli/generate-prisma-clients.sh && \
    chmod +x ./cli/generate-prisma-clients.sh

# Теперь запускаем скрипт через bash
RUN npm run gen-db

# Собираем все приложения
RUN npm run build
