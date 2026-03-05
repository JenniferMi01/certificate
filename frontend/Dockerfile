# Stage 1: Build
FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Build with empty API bases so requests go to same origin (nginx proxies them)
ENV VITE_API_BASE_DJANGO=""
ENV VITE_API_BASE_ODOO=""
RUN bun run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
