FROM node
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8009
CMD ["index-user.js"]
