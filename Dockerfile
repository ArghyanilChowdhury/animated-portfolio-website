# ============================
# 1️⃣ BUILD STAGE
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies including devDependencies
RUN npm install

# Copy all source code and build
COPY . .

# Run the production build
RUN npx vite build

# ============================
# 2️⃣ RUN STAGE
# ============================
FROM nginx:stable-alpine

# Copy the build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]