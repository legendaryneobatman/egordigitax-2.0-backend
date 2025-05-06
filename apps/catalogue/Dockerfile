FROM node:18-alpine

ARG PORT
ENV PORT=$PORT

WORKDIR /app

RUN mkdir ./node_modules

COPY --from=edigitax-base /app/node_modules ./node_modules
COPY --from=edigitax-base /app/apps/catalogue ./apps/catalogue
COPY --from=edigitax-base /app/packages/ ./packages


COPY . .

EXPOSE $PORT

CMD ["node", "apps/catalogue/dist/src/main.js"]
