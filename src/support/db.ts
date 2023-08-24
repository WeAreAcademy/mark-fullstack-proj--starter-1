import { Request } from "express";
import { performance } from "perf_hooks";
import { Pool, QueryResult } from "pg";
import { setupDBClientConfig } from "./setupDBClientConfig";
import { getRequestIdTokenOrDefault } from "./requestId";

const dbClientConfig = setupDBClientConfig();
const pool = new Pool(dbClientConfig);

let queryNumber = 1;

export async function connectClientToDB() {
    console.log("Attempting to connect to db");
    //await pool.connect();
    //not using a single client.  pool seems to handle connections.
    console.log("Connected to db!");
}

export async function loggedQuery(
    req: Request,
    sql: string,
    params: unknown[] = []
): Promise<QueryResult> {
    const startTime = performance.now();
    const reqNumAsStr = getRequestIdTokenOrDefault(req);
    const qNumAsStr = (queryNumber++).toString().padStart(3, "0");
    console.log(
        `SQL START reqNum: ${reqNumAsStr} qNum: ${qNumAsStr} sql: ${sql} params: `,
        params
    );
    const dbRes = await pool.query(sql, params);
    const stopTime = performance.now();
    const timeMsStr = (stopTime - startTime).toFixed(3).padStart(10, " ");
    const dbRowCountStr = dbRes.rowCount.toString().padStart(5, " ");
    console.log(
        `SQL END   reqNum: ${reqNumAsStr} qNum: ${qNumAsStr} time: ${timeMsStr}ms rowCount: ${dbRowCountStr} sql: ${sql} params: `,
        params
    );
    return dbRes;
}
