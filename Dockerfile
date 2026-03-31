FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8898
CMD ["npx", "ts-node", "src/index.ts"]
