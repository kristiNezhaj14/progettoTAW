/* INIT OF THE BACKEND SERVER */

//load all envs
require('dotenv').config();

//imports
import express = require('express');
import v1 = require("./app/v1/config");

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const app = express();

//per l'utilizzo di JWT
//https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/


//configuration of the api v1 routes
v1.config(app, '/api/v1').then( () => {
    console.log(`apiv1 config terminated succesfully...`);
    app.use( (req, res, next) => {
        //generic middleware for all entries
        console.log(`New request for: [${req.method}] ${req.url}`);
        next();
        res.end(); // mi assicuro che tutte le richieste finiscano...
    });

    //Starting the server!
    app.listen(PORT, "0.0.0.0", function(){
        console.log(`Server is running on port ${PORT}.`);
    }).on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.error(err);
        }
    });
});