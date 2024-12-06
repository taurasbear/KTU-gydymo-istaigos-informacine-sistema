# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
# RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "run", "docker-start"]
