# ============================
# 1️⃣ BUILD STAGE
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Ensure devDependencies (like Vite) are installed
RUN npm install --include=dev

# Add local binaries (like vite) to PATH
ENV PATH=/app/node_modules/.bin:$PATH

# Copy rest of the source code
COPY . .

# Verify vite exists before building (for debugging)
RUN echo "Vite location:" && which vite && vite --version

# Build the app
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