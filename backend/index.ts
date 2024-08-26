/* INIT OF THE BACKEND SERVER */

//load all envs
require('dotenv').config();

//imports
import express = require('express');
import v1 = require("./app/v1/config");
const app = express();



app.use( (req, res, next) => {
    //generic middleware for all entries
    console.log(`New request for: [${req.method}] ${req.url}`);
    next();
});


v1.config(app, '/api/v1');