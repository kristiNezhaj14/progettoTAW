"use strict";
/* INIT OF THE BACKEND SERVER */
Object.defineProperty(exports, "__esModule", { value: true });
//load all envs
require('dotenv').config();
//imports
const express = require("express");
const v1 = require("./app/v1/config");
const app = express();
app.use((req, res, next) => {
    //generic middleware for all entries
    console.log(`New request for: [${req.method}] ${req.url}`);
    next();
});
v1.config(app, '/api/v1');
