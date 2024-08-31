"use strict";
/* INIT OF THE BACKEND SERVER */
Object.defineProperty(exports, "__esModule", { value: true });
//load all envs
require('dotenv').config();
//imports
const express = require("express");
const v1 = require("./app/v1/config");
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const app = express();
//configuration of the api v1 routes
v1.config(app, '/api/v1').then(() => {
    console.log(`apiv1 config terminated succesfully...`);
    app.use((req, res, next) => {
        //generic middleware for all entries
        console.log(`New request for: [${req.method}] ${req.url}`);
        next();
        res.end();
    });
    //Starting the server!
    app.listen(PORT, "0.0.0.0", function () {
        console.log(`Server is running on port ${PORT}.`);
    }).on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        }
        else {
            console.error(err);
        }
    });
});
