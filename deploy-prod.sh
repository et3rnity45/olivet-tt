#!/bin/sh
git fetch origin && git reset --hard origin/main && git clean -f -d
GATEWAY_PORT=8080 docker-compose -f docker-compose.prod.yml up --build -d
