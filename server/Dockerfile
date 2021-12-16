FROM golang:1.16-alpine AS builder

COPY . /app/
WORKDIR /app

RUN go get ./
RUN go build -o server server.go

FROM alpine:latest

WORKDIR /root/
COPY --from=builder /app/server .

COPY . ./

CMD ./server