# Base

FROM node:24 AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .



# Development

FROM base as development

EXPOSE 5000

CMD ["npm", "run", "dev", "--", "--host"]



# Build

FROM base AS builder

RUN npm run build



# Production

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]