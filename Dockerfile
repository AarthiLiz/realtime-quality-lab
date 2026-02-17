# Use the official Playwright image.
# This includes Node.js and the browsers required for your tests.
FROM mcr.microsoft.com/playwright:v1.41.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the server runs on
EXPOSE 3000

# Default command: Start the server
CMD ["npm", "run", "server"]