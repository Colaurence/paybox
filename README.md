# Paybox Core

### Installation

This app requires Docker (19+) for setting up the application

Install the containers.

```sh
$ cp .env.example .env
$ docker-compose -f "docker-compose.yml" up -d --build
```

Once it has succesfullly installed the container. Trigger the following commands
```sh
$ docker exec -it {PROJECT_NAME}-app bash
$ cp .env.example .env
```

### List of Exposed Ports

| Container Name | Port |
| ------ | ------ |
| db | 3316 |
| webserver | 8014 |
