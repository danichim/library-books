FROM node:9

WORKDIR /opt/docker

# Bundle app source
COPY . /opt/docker
RUN chmod +x start.sh

# Install app dependencies
RUN npm install && npm install -g http-server
RUN npm build

EXPOSE 8080
CMD ["sh","/opt/docker/start.sh"]
