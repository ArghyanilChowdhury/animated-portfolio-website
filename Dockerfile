# ============================
# 1️⃣ BUILD STAGE
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Ensure devDependencies are installed (important for Vite)
ENV NODE_ENV=development

# Install all dependencies (including devDependencies)
RUN npm install

# Copy all source code
COPY . .

# Run build with Vite (use npx from node_modules)
RUN npx vite build

# ============================
# 2️⃣ RUN STAGE
# ============================
FROM nginx:stable-alpine

# Copy the build output from builder stage to Nginx directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]