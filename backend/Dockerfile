# Use Node.js 22 Alpine as base
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies for canvas
RUN apk add --no-cache build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application code
COPY . .

# Expose port
EXPOSE 8080

# Default command
CMD ["node", "main.js"]
