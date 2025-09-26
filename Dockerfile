# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose app port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]

