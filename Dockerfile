# FROM node:10.20.1-jessie as builder

# # set working dir
# WORKDIR /usr/src/app

# # Copying source files
# COPY . /usr/src/app
# COPY . ./

# RUN npm i
# RUN NODE_ENV=production npm run export --verbose


# FROM nginx:alpine
# ENV PORT 30005
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /usr/src/app/out/ /usr/share/nginx/html
# EXPOSE 30005
# CMD ["nginx", "-g", "daemon off;"]

FROM node:10.20.1-jessie as builder

# set working dir
WORKDIR /usr/src/app

# Copying source files
COPY . /usr/src/app
COPY . ./

RUN npm i
RUN npm run export


FROM fholzer/nginx-brotli:v1.19.1

# COPY reverse-proxy.nginx.conf /etc/nginx/conf.d/
# COPY mime-type.nginx.conf /etc/nginx/conf.d/

COPY --from=builder /usr/src/app/ /usr/src/app

RUN cat /usr/src/app/nginx/nginx.conf > /etc/nginx/nginx.conf 

EXPOSE 80

CMD ["nginx"]