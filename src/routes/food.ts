import express from "express";
import { Client } from "pg";
import { prepareErrorForClient } from "../errorUtils";

function setupRouter(client: Client) {
  const foodRouter = express.Router();

  foodRouter.get("/", async (req, res) => {
    try {
      const dbres = await client.query("select * from food");
      console.log("got /food");
      res.json(dbres.rows);
    } catch (error) {
      console.error(error)
      res.status(500).json(prepareErrorForClient(error))
    }
  });


  foodRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const dbres = await client.query("select * from food where id = $1", [id]);
    console.log("got food by id", id);
    res.json(dbres.rows);
  });

  foodRouter.post("/", async (req, res) => {
    const newFood = req.body;
    const dbres = await client.query(
      "insert into food (title) values ($1) returning *",
      [newFood.name]
    );
    console.log("inserted new food: ", newFood);
    res.json(dbres.rows);
  });
  return foodRouter;
}

export { setupRouter };



