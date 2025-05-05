FROM node:18-alpine

WORKDIR /app

RUN mkdir ./node_modules

COPY --from=edigitax-base /app/node_modules ./node_modules
COPY --from=edigitax-base /app/apps/api-gateway ./apps/api-gateway

COPY . .

EXPOSE 3000

CMD ["node", "apps/api-gateway/dist/src/main.js"]
