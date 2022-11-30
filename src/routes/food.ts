import express, { Router } from "express";
import { Client } from "pg";
import { prepareErrorForClient } from "../support/errorUtils";

function setupRouter(client: Client): Router {
  const foodRouter: Router = express.Router();

  //This is GET /food/
  foodRouter.get("/", async (req, res) => {
    try {
      const dbRes = await client.query("select * from food");
      console.log("got /food");
      res.json(dbRes.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json(prepareErrorForClient(error));
    }
  });

  //This is GET /food/:id
  foodRouter.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const dbRes = await client.query("select * from food where id = $1", [
        id,
      ]);
      console.log("got food by id", id);
      res.json(dbRes.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json(prepareErrorForClient(error));
    }
  });

  //This is POST /food/
  foodRouter.post("/", async (req, res) => {
    try {
      const newFood = req.body;
      const dbRes = await client.query(
        "insert into food (title) values ($1) returning *",
        [newFood.name]
      );
      console.log("inserted new food: ", newFood);
      res.json(dbRes.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json(prepareErrorForClient(error));
    }
  });

  return foodRouter;
}

export { setupRouter };
