# Base image
FROM node:18-alpine

RUN apk update && apk upgrade

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app
RUN npm ci
RUN npm ci swagger-ui-express

# Bundle app source
COPY . /app

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]