# ============================
# 1️⃣ BUILD STAGE
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Force-install all dependencies including dev tools like vite
RUN npm install --include=dev

# Add local binaries to PATH
ENV PATH="/app/node_modules/.bin:$PATH"

# Confirm vite is accessible (debug line)
RUN echo "Vite location:" && ls -l /app/node_modules/.bin/vite && node ./node_modules/vite/bin/vite.js --version

# Copy source code
COPY . .

# Run build using vite via Node (bypasses shell lookup issues)
RUN node ./node_modules/vite/bin/vite.js build

# ============================
# 2️⃣ RUN STAGE
# ============================
FROM nginx:stable-alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]