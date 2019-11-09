# docker build -t ubuntu-backendtest-express .

FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y sudo
RUN apt-get --fix-missing update

RUN sudo apt-get install -y curl nano tree && sudo apt-get update
RUN sudo apt-get install -y software-properties-common

RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

RUN npm install -g nodemon
# RUN npm i --global @babel/node @babel/core @babel/cli

WORKDIR /root/

# CMD npm i && npm start
# CMD npm i && DEBUG=api:* npm start
CMD /bin/bash

# sudo chmod 777 backend/
# sudo setfacl -R -d -m g::rwx -m o::rwx backend/

# docker run --rm -it --name backend -h backend -v $PWD/:/root/ -p 3000:3000 ubuntu-backendtest-express
