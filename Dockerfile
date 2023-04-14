# Use an official Node.js runtime as a parent image
FROM node:18-alpine 

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's /app directory
COPY package*.json ./



# Install dependencies
RUN npm install


# Copy the rest of the application code to the container's /app directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
