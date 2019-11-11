# docker build -t ubuntu-frontendtest-react .

FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y sudo
RUN apt-get update --fix-missing
RUN sudo apt-get install -y curl wget nano git tree && sudo apt-get update
RUN sudo apt-get install -y software-properties-common #build-essential gcc g++ make
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN npm install -g react@16.6.0
RUN npm install -g react-dom@16.6.0
RUN npm install -g prop-types

WORKDIR /root/

CMD cd /root/ && npm install && /bin/bash

# sudo chmod 777 frontend/
# sudo setfacl -R -d -m g::rwx -m o::rwx frontend/

# docker run --rm -it --name frontend -h frontend -v $PWD/:/root/ -p 8080:8080 ubuntu-frontendtest-react
