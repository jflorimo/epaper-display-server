# Use the official Node.js LTS image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY nodemon.json ./
COPY tsconfig.json ./
# COPY src ./
# COPY public ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
# COPY . .

# Build the TypeScript project
# RUN npm run build

# Expose the port the app runs on
# EXPOSE 8999

# Define the command to run the application
CMD ["npx", "nodemon"]
