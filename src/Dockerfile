FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

# Copy start script
COPY ./start.sh ./start.sh

# If you are building your code for production
RUN yarn install --production=true

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "bash", "start.sh" ]