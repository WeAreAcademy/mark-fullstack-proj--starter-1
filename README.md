# mark-fullstack-proj--starter-1

## Usage:

Instead of cloning this project, click "Use this template".  This will allow you to create a repo on github which has this project's content but which is not a fork of it.

Make sure you create the repo as being owned by your own account not by the WeAreAcademy organisation.


## Install

`yarn`

## DB Setup

Copy .env.example to .env and set `DATABASE_URL` and `PORT` to your liking.

Example for a local database: `DATABASE_URL=postgres://neill@localhost/pastebin`

You will need to create your own databases for this project - one locally and one on Heroku.

## Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL (appropriate for your local db)

## running on heroku

When the project is deployed to heroku, the command in your `Procfile` file will be run.
