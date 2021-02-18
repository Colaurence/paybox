FROM node:12.18.4

WORKDIR /app

COPY ./project/package.json .

RUN npm i -g @adonisjs/cli && \
    npm i -g pm2 && \
    npm i --quiet --production

COPY ./project .

EXPOSE 3331

RUN pwd && ls -al

RUN npm install

CMD ["pm2-runtime", "start", "server.js"]