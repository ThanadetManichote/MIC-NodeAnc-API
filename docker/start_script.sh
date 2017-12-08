#!/usr/bin/sh

COMPOSE_FILE=docker-compose.yml

touch ../node_modules/
docker rm -f $(docker ps -f name=nodejs -q)
#docker rm -f nodejs-nodeanc

# echo 'version: "3.0"' > ${COMPOSE_FILE}

# echo "services:" >> ${COMPOSE_FILE}
# echo " nodeanc:" >> ${COMPOSE_FILE}
# echo "    build: ./" >> ${COMPOSE_FILE}

# echo "    volumes:" >> ${COMPOSE_FILE}
# echo "      - ../:/app" >> ${COMPOSE_FILE}
# echo "      - ../node_modules/:/node_modules/" >> ${COMPOSE_FILE}
# echo "    ports:" >> ${COMPOSE_FILE}
# echo '      - "8123:80" '  >> ${COMPOSE_FILE}

# echo "    tty : true" >> ${COMPOSE_FILE}
# echo "    container_name:" >> ${COMPOSE_FILE}
# echo "      nodejs-nodeanc" >> ${COMPOSE_FILE}

docker-compose build --force-rm nodeanc
docker-compose up -d nodeanc

docker exec -it nodejs-nodeanc /usr/local/bin/npm install -g nodemon express request isomorphic-fetch moment connect-multiparty

docker exec -it nodejs-nodeanc nodemon server.js