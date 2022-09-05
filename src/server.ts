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

app.get("/", async (req, res) => {
  res.json({"msg": "hello!"})
});

app.get("/food", async (req, res) => {
  const dbres = await client.query("select * from food");
  res.json(dbres.rows);
});

app.get("/food/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const dbres = await client.query("select * from food where id = $1", [
    id,
  ]);

  res.json(dbres.rows);
});

app.post("/food", async (req, res) => {
  const newFood = req.body;
  const dbres = await client.query(
    "insert into food (title) values ($1) returning *",
    [newFood.name]
  );
  res.json(dbres.rows);
});

async function connectToDBAndStartListening() {
  await client.connect();
  console.log("connected to db");

  const port = getEnvVarOrFail("PORT");
  app.listen(port, () => {
    console.log(`Server started listening for HTTP requests on port ${port}`);
  });
}

connectToDBAndStartListening();
