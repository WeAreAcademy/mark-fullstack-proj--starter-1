import { NextFunction, Request, Response } from "express";
import shortUUIDGenerator from "short-uuid";

export const addRequestId = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    req.requestId = shortUUIDGenerator.generate();
    next();
};

export function getRequestIdTokenOrDefault(req: Request): string {
    return req.requestId ?? "noRequestId";
}
