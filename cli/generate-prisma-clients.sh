#!/bin/bash

set -e

LOG_FILE="prisma-generation.log"
echo "Starting Prisma clients generation..." > "$LOG_FILE"

# Функция для обработки ошибок
handle_error() {
  echo "Error occurred in $1"
  echo "Error occurred in $1" >> "$LOG_FILE"
  exit 1
}

# Ищем все приложения с Prisma
find apps packages -type f -name "schema.prisma" | while read schema; do
  service_dir=$(dirname "$schema")
  service_name=$(basename "$(dirname "$service_dir")")

  echo "Processing $service_name..."
  echo "Processing $service_name..." >> "$LOG_FILE"

  (
    cd "$(dirname "$schema")/.." || handle_error "$service_name"

    if [ -f "package.json" ] && grep -q "\"prisma\"" package.json; then
      echo "Generating client for $service_name"
      npx prisma generate --schema=./prisma/schema.prisma >> "$LOG_FILE" 2>&1
      echo "✅ Successfully generated client for $service_name"
    else
      echo "⚠️  Prisma not found in $service_name dependencies"
    fi
  ) || handle_error "$service_name"
done

echo "All Prisma clients generated successfully!"
