FROM ubuntu:14.04

RUN apt-get update && \
    apt-get install -y curl && \
	  apt-get install -y nodejs && \
	  apt-get install -y npm && \
	  apt-get install -y postgresql postgresql-contrib && \
	  ln -s /usr/bin/nodejs /usr/bin/node && \
	  npm cache clean -f && \
	  npm install -g n && \
	  n 5.8.0 && \
	  ln -sf /usr/local/n/versions/node/5.8.0/bin/node /usr/bin/node && \
    mkdir /home/app && \
    npm install -g nodemon knex
WORKDIR /home/app
