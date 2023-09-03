FROM node:latest as builder
WORKDIR /app
COPY ./product-compare /app/
RUN npm install --slient && npm run build

FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
