import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { getEnvVarOrFail } from "./envVarUtils";
import { setupDBClientConfig } from "./setupDBClientConfig";

config(); //Read .env file lines as though they were env vars.

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

const dbConfig = setupDBClientConfig();
const client = new Client(dbConfig);
client.connect();

app.get("/", async (req, res) => {
  const dbres = await client.query("select * from categories");
  res.json(dbres.rows);
});

//Start the server on the given port
const port = getEnvVarOrFail("PORT");

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
