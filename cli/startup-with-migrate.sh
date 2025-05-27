#!/bin/sh
set -e

# Проверка обязательных переменных
if [ -z "$APP_NAME" ] || [ -z "$DATABASE_URL" ]; then
  echo "ERROR: APP_NAME and DATABASE_URL environment variables are required"
  exit 1
fi

# Парсинг DATABASE_URL с использованием URI-формата
DB_URI="$DATABASE_URL"
DB_USER=$(echo "$DB_URI" | sed -e 's/^postgres:\/\///' -e 's/\(.*\)@.*/\1/' -e 's/:.*//')
DB_PASS=$(echo "$DB_URI" | sed -e 's/^postgres:\/\///' -e 's/[^:]*:\([^@]*\).*/\1/')
DB_HOST_PORT=$(echo "$DB_URI" | sed -e 's/^postgres:\/\/[^@]*@//' -e 's/\/.*//')
DB_HOST=$(echo "$DB_HOST_PORT" | cut -d: -f1)
DB_PORT=$(echo "$DB_HOST_PORT" | cut -d: -f2)
DB_NAME=$(echo "$DB_URI" | sed -e 's/.*\///')

# Экспорт пароля
export PGPASSWORD="$DB_PASS"

# Ожидание доступности PostgreSQL
echo "[$APP_NAME] Checking PostgreSQL connection..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres; do
  echo "[$APP_NAME] Waiting for PostgreSQL...HOST: $DB_HOST, PORT: $DB_PORT, USER: $DB_USER"
  sleep 2
done

# Проверка и создание БД
if ! psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt -d postgres | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
  echo "[$APP_NAME] Creating database $DB_NAME..."
  createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -O "$DB_USER" "$DB_NAME"
fi

# Применение миграций
echo "[$APP_NAME] Applying migrations..."
(
  cd "apps/$APP_NAME"
  npx dotenv -e ../../.env -- npx prisma migrate deploy --force --schema="./prisma/schema.prisma"
)

# Применение сидов
echo "[$APP_NAME] Applying seeds..."
(
  cd "apps/$APP_NAME"
  npx dotenv -e ../../.env -- npx prisma db seed --schema="./prisma/schema.prisma"
)

echo "[$APP_NAME] Migrations applied successfully"

# Запуск приложения
echo "[$APP_NAME] Starting application..."
(
  node "apps/$APP_NAME/dist/src/main.js"
)
exec "$@"
