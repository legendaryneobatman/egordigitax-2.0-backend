FROM node:18-alpine

WORKDIR /app

RUN mkdir ./node_modules

COPY --from=edigitax-base /app/node_modules ./node_modules
COPY --from=edigitax-base /app/apps/catalogue ./apps/catalogue

COPY . .

EXPOSE 3000

CMD ["node", "apps/catalogue/dist/src/main.js"]
