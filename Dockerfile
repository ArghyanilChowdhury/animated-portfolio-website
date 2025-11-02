# ============================
# Stage 1: Build the React app
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code and build
COPY . .
RUN npm run build

# ============================
# Stage 2: Serve the built app with Nginx
# ============================
FROM nginx:stable-alpine

# Copy build output from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for access
EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]