#!/bin/bash

set -e

LOG_FILE="prisma-generation.log"
echo "Starting Prisma clients generation and migrations..." > "$LOG_FILE"

handle_error() {
  echo "Error occurred in $1"
  echo "Error occurred in $1" >> "$LOG_FILE"
  exit 1
}

run_prisma_operations() {
  local service_name=$1
  local schema_path=$2

  echo "Generating client for $service_name"
  npx dotenv -e ../../.env -- npx prisma generate --schema="$schema_path" >> "$LOG_FILE" 2>&1

  echo "Applying migrations for $service_name"
  npx dotenv -e ../../.env -- npx prisma migrate --schema="$schema_path" >> "$LOG_FILE" 2>&1
}

find apps packages -type f -name "schema.prisma" | while read schema; do
  service_dir=$(dirname "$schema")
  service_name=$(basename "$(dirname "$service_dir")")
  schema_path="./prisma/schema.prisma"

  echo "Processing $service_name..."
  echo "Processing $service_name..." >> "$LOG_FILE"

  (
    cd "$(dirname "$schema")/.." || handle_error "$service_name"

    if [ -f "package.json" ] && grep -q "\"prisma\"" package.json; then
      if [ -f "$schema_path" ]; then
        run_prisma_operations "$service_name" "$schema_path"
        echo "✅ Successfully processed $service_name"
      else
        echo "⚠️  Schema.prisma not found in $service_name"
        handle_error "$service_name"
      fi
    else
      echo "⚠️  Prisma not found in $service_name dependencies"
    fi
  ) || handle_error "$service_name"
done

echo "All Prisma operations completed successfully!"
