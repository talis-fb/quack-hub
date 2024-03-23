FROM node:20.11.1-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the backend application files into the container
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Expose the port that your Vue.js app is listening on
EXPOSE 3000

# Start the backend application
CMD ["yarn", "dev"]
