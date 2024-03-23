FROM node:20.11.1-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the backend application files into the container
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Expose the port that your Nest.js backend
EXPOSE 8080

# Start the backend application
CMD ["yarn", "start:migrate:dev"]
