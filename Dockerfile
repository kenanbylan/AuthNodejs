FROM node:18-alpine 
RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./


RUN npm install
RUN npm install swagger-ui-express


COPY . .


EXPOSE 3000

CMD ["node", "app.js"]


