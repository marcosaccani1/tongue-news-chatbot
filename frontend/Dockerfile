# Stage 1: build dell'app React
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL=http://localhost:5050
ARG VITE_SENTRY_DSN
ARG VITE_APP_ENV=production
ARG VITE_ENABLE_SENTRY_TEST=false

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_ENABLE_SENTRY_TEST=$VITE_ENABLE_SENTRY_TEST

RUN npm run build

# Stage 2: server web per la produzione
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]