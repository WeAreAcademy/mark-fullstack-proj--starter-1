import express from "express";
import { loggedQuery } from "../support/db";

const router = express.Router();

router.get("/", async (req, res) => {
    const dbRes = await loggedQuery(req, "select * from categories");
    res.json({ data: dbRes.rows });
});

export default router;
