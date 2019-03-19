FROM python:3.7

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get -y install gcc zlib1g-dev bedtools && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
ADD . /app

RUN pip install -r requirements.txt

# Define our command to be run when launching the container
CMD python run.py 0.0.0.0:$PORT
