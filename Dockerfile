FROM centos:latest

WORKDIR /opt/docker

# Prepare CentOS

RUN \
  yum clean all &&\
  yum update -y &&\
  yum install -y curl git wget &&\
  yum install -y java-1.7.0-openjdk &&\
  yum group install "Development Tools" -y &&\
  yum clean all

# Install nvm with node and npm

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4.0.0

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:/opt/docker:$PATH

# Bundle app source
COPY . /opt/docker
RUN chmod +x start.sh

# Install app dependencies
RUN source $NVM_DIR/nvm.sh \
    && npm install \
    && npm install -g http-server

EXPOSE 8080
CMD ["start.sh"]
