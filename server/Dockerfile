# Stage 1: Build stage
# Use a specific Node.js version on a lean OS like Alpine
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies using 'npm ci' for faster, reliable builds
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Stage 2: Production stage
# Use the same lean base image for the final image
FROM node:20-alpine

WORKDIR /usr/src/app

# Create a non-root user and group for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy installed dependencies and source code from the builder stage
COPY --from=builder /usr/src/app .

# Switch to the non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# The command to run the application
CMD [ "node", "server.js" ]