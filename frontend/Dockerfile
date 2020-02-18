FROM nginx:1.16.0-alpine
ENV BACKEND_SERVER backend
ENV BACKEND_PORT 3000
RUN apk add --no-cache curl
COPY ./index.html /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
