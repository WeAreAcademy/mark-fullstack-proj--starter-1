import cors from "cors";
import express from "express";
import morgan from "morgan";
import { extractTokensForMorgan } from "./morganFormatting";
import categoriesRouter from "./routes/categories";
import delaysRouter from "./routes/delays";
import healthCheckRouter from "./routes/healthCheck";
import wordsRouter from "./routes/words";
import { connectClientToDB } from "./support/db";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { addRequestId } from "./support/requestId";

const app = express();

app.use(express.json()); //add JSON body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler
app.use(addRequestId); //add unique requestId to each request
app.use(morgan(extractTokensForMorgan)); //add custom logging for each request

app.use("/words", wordsRouter);
app.use("/delays", delaysRouter);
app.use("/categories", categoriesRouter);
app.use("/health-check", healthCheckRouter);

app.get("/", async (_req, res) => {
    res.json({ msg: "Hello! There's nothing interesting for GET /" });
});

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
    await connectClientToDB();

    const port = getEnvVarOrFail("PORT");
    app.listen(port, () => {
        console.log(
            `Server started listening for HTTP requests on port ${port}.  Let's go!`
        );
    });
}
