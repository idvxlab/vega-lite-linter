FROM python:3.7.4-slim

RUN apt-get update
RUN apt-get install libquadmath0
RUN apt-get install -y libgomp1 
RUN apt-get install -y clasp
RUN apt-get install -y gringo
COPY requirements.txt /
RUN pip3 install -r /requirements.txt --extra-index-url https://test.pypi.org/simple/ 
COPY . /server
WORKDIR /server