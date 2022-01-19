# This is an express js A.P.I coded in typescript that integrates with a Stars Wars Films A.P.I

#### Documentation

https://documenter.getpostman.com/view/14327196/UVXnFZLf

#### Live Link

https://oboth-swapi-api.herokuapp.com/api/1.0/movies

#### GitHub

https://github.com/ObothA/swapi

##### Technology Stack

Express js, Typescript, MySQL on planetscale, Prisma ORM.

#### vscode containerization

This development environment has been containerized with docker to run in vscode.
Follow these steps to run:

- Create a `.env.development` file and add these environment variables
  NODE_ENV='development'
  PORT=5000
  SWAPI_URL='https://www.swapi.tech/api'
  DATABASE_URL=""
  `DATABASE_URL` should be a connection string to a MySQL database, preferably with the planet scale database provider. But any other MySQL database should work as well.
- Press F1, search and select `Remote-Containers:Reopen in Container` and it will run in a docker container.
