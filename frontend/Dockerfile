FROM alpine:3.10

RUN sed -i 's?http://dl-cdn.alpinelinux.org/?https://mirrors.aliyun.com/?' /etc/apk/repositories && \
  apk add -U tzdata && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  apk del tzdata && \
  apk add git wget

RUN apk add build-base

RUN apk add pcre-dev openssl-dev zlib-dev perl-dev libressl-dev curl openssl

RUN cd /root && wget https://openresty.org/download/openresty-1.17.8.2.tar.gz && tar -zxvf openresty-1.17.8.2.tar.gz
RUN cd /root && wget https://github.com/fdintino/nginx-upload-module/archive/2.3.0.tar.gz && tar -zxvf 2.3.0.tar.gz
RUN cd /root && wget https://github.com/openresty/lua-resty-upload/archive/v0.10.tar.gz && tar -zxvf v0.10.tar.gz

RUN cd /root/openresty-1.17.8.2 && \
  ./configure --prefix=/usr/local/openresty --add-module=/root/nginx-upload-module-2.3.0 && \
  make && make install

ENV PATH=/usr/local/openresty/bin:/usr/local/openresty/nginx/sbin:$PATH 

RUN cp /root/lua-resty-upload-0.10/lib/resty/upload.lua /usr/local/openresty/lualib/resty/

COPY build /usr/local/openresty/nginx/html

RUN rm /usr/local/openresty/nginx/conf/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf.default

COPY nginx/nginx.conf /usr/local/openresty/nginx/conf/
COPY nginx/lua /usr/local/openresty/nginx/lua

RUN mkdir -p /usr/local/openresty/nginx/static/staff
COPY staff /usr/local/openresty/nginx/static/staff


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]