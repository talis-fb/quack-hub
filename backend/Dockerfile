FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /app

# Copy the backend application files into the container
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Expose the port that your Nest.js backend is listening on (change 3000 to the appropriate port if needed)
EXPOSE 8080

# Start the backend application
CMD ["yarn", "start:dev"]
