FROM node:12
WORKDIR /hacker_news_interface
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start