
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production


COPY . .


FROM node:22-alpine


RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app


COPY --from=builder /app .


RUN chown -R appuser:appgroup /app


USER appuser


EXPOSE 3000


HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "app.js"]