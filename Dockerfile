FROM ubuntu:latest
LABEL authors="YCode"

ENTRYPOINT ["top", "-b"]