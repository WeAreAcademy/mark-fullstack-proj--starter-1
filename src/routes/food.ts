import express from "express";
import { Client } from "pg";
import { prepareErrorForClient } from "../errorUtils";

function setupRouter(client: Client) {
  const foodRouter = express.Router();

  foodRouter.get("/", async (req, res) => {
    try {
      const dbRes = await client.query("select * from food");
      console.log("got /food");
      res.json(dbRes.rows);
    } catch (error) {
      console.error(error)
      res.status(500).json(prepareErrorForClient(error))
    }
  });


  foodRouter.get("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const dbRes = await client.query("select * from food where id = $1", [id]);
      console.log("got food by id", id);
      res.json(dbRes.rows);
    } catch (error) {
      console.error(error)
      res.status(500).json(prepareErrorForClient(error))
    }
  });


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
      console.error(error)
      res.status(500).json(prepareErrorForClient(error))
    }
  });

  return foodRouter;
}

export { setupRouter };



