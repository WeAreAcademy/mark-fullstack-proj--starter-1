import express from "express";
import { loggedQuery } from "../support/db";

const router = express.Router();

router.get("/:seconds", async (req, res) => {
    await loggedQuery(req, "SELECT pg_sleep($1)", [req.params.seconds]);
    res.json({ data: [] });
});

export default router;
