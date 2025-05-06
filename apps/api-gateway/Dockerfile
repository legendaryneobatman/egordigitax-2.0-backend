FROM node:18-alpine

WORKDIR /app

ENV PORT=$PORT

RUN mkdir ./node_modules

COPY --from=edigitax-base /app/node_modules ./node_modules
COPY --from=edigitax-base /app/apps/api-gateway ./apps/api-gateway
COPY --from=edigitax-base /app/packages/ ./packages
COPY --from=edigitax-base /app/.env ./.env

COPY . .

EXPOSE $PORT

CMD ["node", "apps/api-gateway/dist/src/main.js"]
