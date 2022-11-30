import { Client } from "pg";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { getEnvVarOrFail } from "./envVarUtils";
import { setupDBClientConfig } from "./setupDBClientConfig";
import { setupRouter } from "./routes/food";

dotenv.config(); //Read .env file lines as though they were env vars.

const dbClientConfig = setupDBClientConfig();
const client = new Client(dbClientConfig);

//Configure express routes
const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

app.use("/food", setupRouter(client));

app.get("/", async (req, res) => {
  res.json({ msg: "hello!" });
});

app.get("/health-check", async (req, res) => {
  //For this to be successful, must connect to db
  await client.query("select now()");
  res.status(200).send("system ok");
})

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
  console.log("Attempting to connect to db");
  await client.connect();
  console.log("connected to db");

  const port = getEnvVarOrFail("PORT");
  app.listen(port, () => {
    console.log(`Server started listening for HTTP requests on port ${port}`);
  });
}
