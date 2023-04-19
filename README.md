# Stock Backend

## Project about

- It is a project created on openAPI technologies and operations on docker in the open source software course.

<hr>

## Project Structure

- Backend: Node.js, Express.js - Swagger - Mongo Db - Mongo Db Atlas

## Project Requirements

- Node.js
- npm
- docker
- mongo db atlas

<hr>

## Install

- Clone the project

```bash
git clone https://github.com/kenanbylan/StockBackendAPI.git
```

- Make sure you are in the project root directory.

```
cd StockBackendAPI
```

- Run the following command in terminal.

```bash
npm install
```

- Run the following command to run the project.

```bash
npm start
```

<hr>

## Project Docker Image Links

- [Backend](https://hub.docker.com/r/kenanbylan/node-stock-backend "Backend")

## Build the project with Dockerfile

```sh
#Build the project.
docker build -t node-stock-backend .
```

```sh
#Run the project.
docker compose up -d
```

After running the application, you can access the swagger file by going to `http://localhost:3000/docs`.

<br>
