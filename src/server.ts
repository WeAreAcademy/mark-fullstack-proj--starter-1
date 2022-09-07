import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { getEnvVarOrFail } from "./envVarUtils";
import { setupDBClientConfig } from "./setupDBClientConfig";
import { setupRouter } from "./routes/food";

config(); //Read .env file lines as though they were env vars.

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

const dbConfig = setupDBClientConfig();
const client = new Client(dbConfig);

app.get("/", async (req, res) => {
  res.json({ msg: "hello!" });
});

app.use("/food", setupRouter(client));

async function connectToDBAndStartListening() {
  await client.connect();
  console.log("connected to db");

  const port = getEnvVarOrFail("PORT");
  app.listen(port, () => {
    console.log(`Server started listening for HTTP requests on port ${port}`);
  });
}

connectToDBAndStartListening();
