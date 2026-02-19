# 2️⃣ Production stage
FROM node:20-alpine

WORKDIR /app

# Копируем только нужное
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/main.js"]
