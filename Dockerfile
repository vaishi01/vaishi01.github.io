

FROM node:18 AS builder
 
WORKDIR /app
 
COPY package*.json ./

RUN npm install
 
COPY . .

RUN npm run build
 
FROM node:18-slim
 
RUN npm install -g serve
 
WORKDIR /app
 
COPY --from=builder /app/dist ./dist
 
EXPOSE 3000
 
CMD ["serve", "-s", "dist", "-l", "3000"]

 
