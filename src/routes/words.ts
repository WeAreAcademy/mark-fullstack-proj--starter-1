import express from "express";
import { loggedQuery } from "../support/db";

const router = express.Router();

router.get("/", async (req, res) => {
    const dbRes = await loggedQuery(
        req,
        "select * from words order by word asc"
    );
    res.json({ data: dbRes.rows });
});

router.post("/", async (req, res) => {
    const dbRes = await loggedQuery(
        req,
        "insert into words (word, category_id) values ($1, $2) returning *",
        [req.body.word, req.body.category_id]
    );
    //pretend we've some important work to do here in a second query
    const dbRes2 = await loggedQuery(req, "select * from words");

    res.json({ data: dbRes.rows, wordsCount: dbRes2.rowCount });
});

router.get("/:wordId", async (req, res) => {
    const wordId = req.params.wordId;
    const dbRes = await loggedQuery(req, "select * from words where id = $1", [
        wordId,
    ]);
    res.json({ data: dbRes.rows });
});

export default router;
