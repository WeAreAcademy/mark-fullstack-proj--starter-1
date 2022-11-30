import { getEnvVarOrFail } from "./envVarUtils";

/** Create and return a db client config object suitable for node-postgres Client or Pool constructors,
 * based upon various environment variables.
 *
 * Note this does NOT establish a connection to a database!  However, the returned config object
 * can be used by node-postgres to make a client, and in turn a connection.
 *
 *
 * Environment variable: LOCAL
 *
 * If the environment variable LOCAL is set true, the config will specify NO SSL (suitable for a local db)
 *
 * If it is NOT set, SSL will be set to { rejectUnauthorized: false } suitable for connecting to a DB on render.com or heroku.
 *
 * Environment variable: DATABASE_URL:
 *
 * The DATABASE_URL environment variable MUST be set.  This will be used as the dbConfig's connectionString property.
 *
 * @returns a db client config object.
 */
export function setupDBClientConfig() {
  //For the ssl property of the DB connection config, use a value of...
  //   false - when connecting to a local DB
  //   { rejectUnauthorized: false } - when connecting to a render.com DB or heroku DB
  const sslSetting = process.env.LOCAL ? false : { rejectUnauthorized: false };
  const connectionString = getEnvVarOrFail("DATABASE_URL");
  const dbConfig = {
    connectionString,
    ssl: sslSetting,
  };
  return dbConfig;
}
