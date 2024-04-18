FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx 
EXPOSE 3000
COPY --from=builder /app/build  /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]