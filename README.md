# mark-fullstack-proj--starter-1

## Usage:

Instead of cloning this project, click "Use this template".  This will allow you to create a repo on github which has this project's content but which is not a fork of it.


## Install

`yarn`

Copy .env.example to .env and set `DATABASE_URL` and `PORT` to your liking.

## Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL (appropriate for your local db)

## running on heroku

When the project is deployed to heroku, the command in your `Procfile` file will be run.
