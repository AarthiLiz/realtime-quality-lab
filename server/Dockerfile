# Stage 1: Build stage
# Use a specific Node.js version on a lean OS like Alpine
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./
# NOTE: package-lock.json is intentionally omitted to force a clean install
# from package.json, as the lockfile in the repository is invalid.

# Install all dependencies for TypeScript compilation
RUN npm install

# Copy the rest of the application source code
COPY . .

# Bundle with esbuild to handle TS extensions and create a single ESM file
RUN npx esbuild server/app.ts --bundle --platform=node --format=esm --outfile=dist/app.js --packages=external

# Remove devDependencies to create a clean production node_modules folder
RUN npm prune --production

# Stage 2: Production stage
# Use the same lean base image for the final image
FROM node:20-alpine

WORKDIR /usr/src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /usr/src/app/dist/app.js ./
COPY --from=build /usr/src/app/server/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# The command to run the application
CMD [ "node", "app.js" ]