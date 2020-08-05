FROM node:12-alpine
WORKDIR /usr/src/backend
COPY package*.json ./
RUN npm install --production
COPY build ./build
COPY ormconfig.docker.json ./ormconfig.json
COPY .env ./
RUN ls /usr/src/backend
CMD ["node","./build/index.js"]