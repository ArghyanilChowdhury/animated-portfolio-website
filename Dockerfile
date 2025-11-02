# ============================
# 1️⃣ BUILD STAGE
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Make sure all dependencies are installed, including devDependencies
ENV NODE_ENV=development

RUN npm install

# Copy all project files
COPY . .

# Add local binaries (like vite) to PATH explicitly
ENV PATH="./node_modules/.bin:$PATH"

# Run build using Vite (now it will be found)
RUN vite build

# ============================
# 2️⃣ RUN STAGE
# ============================
FROM nginx:stable-alpine

# Copy build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]