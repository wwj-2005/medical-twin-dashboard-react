FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm i --production
COPY server.js ./
EXPOSE 8081
CMD ["node", "server.js"]