# React / Express / MySQL environment setup

## Setup development environment

### node and dependencies

* *(suggestion)* install nvm to manage node versions easiliy
* install `node=v8.9.1`. With nvm in place run `nvm use` in root directory
* install dependencies

```bash
npm install
```

### DB setup

* before start make sure Docker is installed
* build Docker container

```bash
 docker build -t <image_name> -f setup/Dockerfile .
```

* run MySQL Docker container

```bash
docker run --name <container_name> -p 3306:3306 -d <image_name>
```

* in order to resume stopped container run

```bash
docker start <container_name>
```

* in order to execute command in running container run (credentials to development DB are stored inside setup/Dockerfile)

```bash
docker exec -it <db> mysql -u<user> -p
```

#### Migrations

* in order to apply migrations run

 ```bash
 npm run knex migrate:latest
 ```

 #### Seeders

* in order to seed DB with data run

```bash
npm run knex seed:run
```
