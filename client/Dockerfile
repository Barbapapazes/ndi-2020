FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm i -g http-server-pwa

COPY . .

EXPOSE 8080
CMD ["http-server-pwa", "./dist"]