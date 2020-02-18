FROM node:12-alpine
ENV DBUSER db
ENV DBHOST db
ENV DBNAME db
ENV DBPASSWORD db
ENV DBPORT 5432
RUN apk add --no-cache curl
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
