FROM node:13

ENV APP_INSTANCES=2
ENV NODE_ENV=docker
RUN npm install pm2 -g

WORKDIR /app
COPY . .
RUN npm install .

ENTRYPOINT [ "" ]
CMD [ "sh", "-c", "pm2-runtime start server.js --instances $APP_INSTANCES" ]

EXPOSE 8080