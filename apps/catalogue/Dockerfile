FROM node:18-alpine

ARG PORT
ENV PORT=$PORT

RUN apk add --no-cache \
    postgresql-client \
    bash \
    su-exec \
    sed

WORKDIR /app

RUN mkdir ./node_modules

COPY --from=edigitax-base /app/node_modules ./node_modules
COPY --from=edigitax-base /app/apps/catalogue ./apps/catalogue
COPY --from=edigitax-base /app/packages/ ./packages
COPY --from=edigitax-base /app/cli/ ./cli
COPY --from=edigitax-base /app/.env ./.env

COPY . .

RUN chmod +x ./cli/startup-with-migrate.sh && \
    apk add --no-cache bash

EXPOSE $PORT

ENTRYPOINT ["./cli/startup-with-migrate.sh"]
