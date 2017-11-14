#!/usr/bin/sh

CHAPTER=$1
COMPOSE_FILE=docker-compose.yml

if [ -z $CHAPTER ] ; then
    echo "Invalid project! Please try 'bash:> sh start_script.sh test-1'"
    exit 1;
fi

touch ../node_modules/
docker rm -f $(docker ps -f name=nodejs -q)
#docker rm -f nodejs-${CHAPTER}

echo 'version: "3.0"' > ${COMPOSE_FILE}

echo "services:" >> ${COMPOSE_FILE}
echo " ${CHAPTER}:" >> ${COMPOSE_FILE}
echo "    build: ./" >> ${COMPOSE_FILE}

echo "    volumes:" >> ${COMPOSE_FILE}
echo "      - ../code/${CHAPTER}:/app/code" >> ${COMPOSE_FILE}
echo "      - ../node_modules/:/node_modules/" >> ${COMPOSE_FILE}
echo "    ports:" >> ${COMPOSE_FILE}
echo '      - "8123:80" '  >> ${COMPOSE_FILE}

echo "    tty : true" >> ${COMPOSE_FILE}
echo "    container_name:" >> ${COMPOSE_FILE}
echo "      nodejs-${CHAPTER}" >> ${COMPOSE_FILE}

docker-compose build --force-rm ${CHAPTER}
docker-compose up    -d ${CHAPTER}


docker exec -it nodejs-${CHAPTER} /usr/local/bin/npm install -g nodemon express request isomorphic-fetch body-parser moment

docker exec -it nodejs-${CHAPTER} nodemon server.js 