# ============================
# 1️⃣ BUILD STAGE
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Explicitly install ALL dependencies (including devDependencies)
RUN npm install --include=dev

# Copy rest of the source code
COPY . .

# Add local binaries to PATH for Vite
ENV PATH=/app/node_modules/.bin:$PATH

# Run build using Vite
RUN npm run build

# ============================
# 2️⃣ RUN STAGE
# ============================
FROM nginx:stable-alpine

# Copy the built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]