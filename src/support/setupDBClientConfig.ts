import { getEnvVarOrFail } from "./envVarUtils";

/** Create and return a db client config object suitable for node-postgres Client or Pool constructors,
 * based upon various environment variables.
 *
 * Note this does NOT establish a connection to a database!  However, the returned config object
 * can be used by node-postgres to make a client, and in turn a connection.
 *
 *
 * Environment variable: USE_LOCAL_DB
 *
 * If the environment variable USE_LOCAL_DB is set true,
 *   1. the db config will use the LOCAL_DATABASE_URL env var contents
 *   2. the db config will specify ssl: false (suitable for connection to a local db)
 * Else,
 *   1. the db config will use the DATABASE_URL env var contents
 *   2. the db config will specify ssl: { rejectUnauthorized: false } (suitable for connecting to a DB on render.com, etc)
 *
 * Environment variable: DATABASE_URL and LOCAL_DATABASE_URL
 *
 * DATABASE_URL environment variable MUST be set.  This will be used as the dbConfig's connectionString property.
 * LOCAL_DATABASE_URL environment variable needs to be set only if you want to use a local db sometimes during development.
 *
 * @returns a db client config object.
 */
export function setupDBClientConfig() {
    //For the ssl property of the DB connection config, use a value of...
    //   false - when connecting to a local DB
    //   { rejectUnauthorized: false } - when connecting to a render.com DB or heroku DB
    const dbEnvVarName = process.env.USE_LOCAL_DB
        ? "LOCAL_DATABASE_URL"
        : "DATABASE_URL";
    const connectionString = getEnvVarOrFail(dbEnvVarName);

    const sslSetting = process.env.USE_LOCAL_DB
        ? false
        : { rejectUnauthorized: false };

    console.log(
        "Using db env var name:",
        dbEnvVarName,
        "with ssl:",
        sslSetting
    );

    const dbConfig = {
        connectionString,
        ssl: sslSetting,
    };
    return dbConfig;
}
