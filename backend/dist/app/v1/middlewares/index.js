"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expectsJsonResponse = (req, res, next) => {
    res.appendHeader("Content-type", "application/json");
    next();
};
