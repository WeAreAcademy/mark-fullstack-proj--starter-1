import express from "express";
import { loggedQuery } from "../support/db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        //For this to be successful, must connect to db
        await loggedQuery(req, "select now()");
        res.status(200).send({ status: "ok" });
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(500).send({ status: "error. check logs." });
    }
});

export default router;
