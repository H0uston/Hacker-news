# specify node version
FROM node:12

# app directory
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# install dependensies
COPY package.json .
RUN npm install

# copy project files
COPY ./server .

CMD ["node", "server"]