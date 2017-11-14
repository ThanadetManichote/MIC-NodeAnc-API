FROM node:8

# replace this with your application's default port
EXPOSE 80

WORKDIR /app/code

ENV NODE_PATH=/usr/local/lib/node_modules/
ENV NODE_ENV=production
ENV NODE_PORT=8123
ENV NODE_URL_ANC_BROADCAST=http://api-anc.eggdigital.com/broadcast/notification
ENV NODE_URL_ANC_CRON=http://api-anc.eggdigital.com/cron/notification
RUN npm config set cache /node_modules/ --global

RUN apt-get update && \
    apt-get install -y nginx

# Install PHP-FPM
RUN apt-get update && \
  apt-get install -y \
    php5-cli \
    php5-fpm \
    php5-intl \
    php5-mcrypt \
    php5-mysql


CMD "/bin/bash" 