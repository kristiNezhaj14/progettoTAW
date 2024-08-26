import { RequestHandler } from "express";

const expectsJsonResponse: RequestHandler = (req, res, next) => {
    res.appendHeader("Content-type", "application/json");
    next();
}