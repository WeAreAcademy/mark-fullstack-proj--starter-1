# mark-fullstack-proj--starter-1

## Usage:

Instead of cloning this project, click "Use this template". This will allow you to create a repo on github which has this project's content but which is not a fork of it.

Make sure you create the repo as being owned by your own account not by the WeAreAcademy organisation.

## Install

`yarn`

## DB Setup

Copy .env.example to .env and set `DATABASE_URL`, `LOCAL_DATABASE_URL` and `PORT` to your liking.

e.g.

```
DATABASE_URL=postgres://someuser:somebigsecretpassword@somedbhost/pastebin
LOCAL_DATABASE_URL=postgres://neill@localhost/pastebin
PORT=4000
```

You will need to create your own databases for this project - certainly one remotely and ideally one locally, too, for development and testing.

Hosts for postgres with a free offering include:

-   https://render.com
-   https://www.elephantsql.com/
-   https://supabase.com/

## Running locally

`yarn start:dev`

The env var LOCAL_DATABASE_URL will be consulted.

## Running locally against a remote db

`yarn start:dev-with-remote-db`

The env var DATABASE_URL will be consulted.

# Deploying to render.com

To deploy to render.com:

-   build command should be `yarn && yarn build`

## Running on render.com

After deployment, render.com should be set up to run either `yarn start` or
`node dist/server.js`

The env var DATABASE_URL will be consulted and so must be set on render.com prior to application start.
