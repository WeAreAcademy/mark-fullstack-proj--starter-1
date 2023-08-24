import { IncomingMessage, ServerResponse } from "http";
import { TokenIndexer } from "morgan";

import morgan from "morgan";
import { getRequestIdTokenOrDefault } from "./support/requestId";

morgan.token("requestId", getRequestIdTokenOrDefault);

export function extractTokensForMorgan(
    tokens: TokenIndexer,
    req: IncomingMessage,
    res: ServerResponse
) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.requestId(req, res), //custom - see morgan.token
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
    ].join(" ");
}
