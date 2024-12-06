# Use an official Node.js runtime as a parent image
FROM node:14-slim

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code
COPY . .


EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
