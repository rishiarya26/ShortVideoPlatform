FROM node:16.17.1-buster as builder

# set working dir
WORKDIR /usr/src/app

# Copying source files
COPY . /usr/src/app
COPY . ./

# APP_ENV value needs to be dynamic
RUN npm i
RUN APP_ENV=production npm run build


FROM fholzer/nginx-brotli:v1.20.2

RUN apk add --update nodejs npm

COPY --from=builder /usr/src/app/ /usr/src/app

RUN cat /usr/src/app/nginx/nginx.conf > /etc/nginx/nginx.conf 

EXPOSE 80

RUN chmod +x /usr/src/app/start_docker_container.sh
CMD ["/usr/src/app/start_docker_container.sh"]
