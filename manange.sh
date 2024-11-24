#!/bin/bash

# Variables
IMAGE_NAME="epaper-display-server:1.0.0"
CONTAINER_NAME="epaper-display-server"
PORT=8888

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Functions
build() {
  echo -e "${GREEN}[Building] the Docker image...${NC}"
  docker build -t $IMAGE_NAME .
}

run() {
    echo -ne "${RED}[Stopping] the Docker container...${NC} "
    docker stop $CONTAINER_NAME
    echo -ne "${RED}[Removing] the Docker container...${NC} "
    docker rm $CONTAINER_NAME
    echo -ne "${GREEN}[Running] the Docker container...${NC} "
    docker run -d --name $CONTAINER_NAME -p $PORT:8080 -v "./src:/app/src" -v "./public:/app/public" $IMAGE_NAME
}

stop() {
  echo -e "${RED}[Stopping] the Docker container...${NC}"
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
}

logs() {
  echo -e "${GREEN}[Fetching] logs for the Docker container...${NC}"
  docker logs -f $CONTAINER_NAME
}

# Help menu
help_menu() {
  echo "Usage: ./manage.sh [command]"
  echo
  echo "Commands:"
  echo "  build      Build the Docker image"
  echo "  run        Run the Docker container"
  echo "  stop       Stop and remove the Docker container"
  echo "  logs       View logs of the Docker container"
  echo "  help       Display this help menu"
}

# Main script
case "$1" in
  build)
    build
    ;;
  run)
    run
    ;;
  stop)
    stop
    ;;
  logs)
    logs
    ;;
  help|*)
    help_menu
    ;;
esac
