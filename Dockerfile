# Use the official Node.js image as a base image
FROM node:18

# Install C++ build tools, Python, and Java
RUN apt-get update && apt-get install -y \
    g++ \
    make \
    python3 \
    python3-pip \
    default-jdk \
    && ln -s /usr/bin/python3 /usr/bin/python

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your Next.js application
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
