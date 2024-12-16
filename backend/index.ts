/* INIT OF THE BACKEND SERVER */

//load all envs
require('dotenv').config();

//imports
import express = require('express');
import api_v1_configuration = require("./app/v1/config");
import { expectsJsonResponse } from './app/v1/middlewares';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST: string = process.env.HOST ? process.env.HOST : '0.0.0.0';

const app = express();

//per l'utilizzo di JWT
//https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/

/**
 * function that start all api configurations
 */
const startApiConfigurations = async function (app){

    //defaults configs for app
    app.use(express.json()); //!important for exchange information via json and for getting req.body

    app.use(expectsJsonResponse); //< by default we always respond with json

    //configuration of the api v1 routes
    await api_v1_configuration.config(app, api_v1_configuration.API_ENDPOINT);
    
    /** HERE goes the configuration invocations of every api version **/
    
    return app;
};

//start configurations and then start express server on port
startApiConfigurations(app).then( function(app){
    console.log(`API versions configuration terminated succesfully...`);
    
    app.use( (req, res, next) => {
        //generic middleware that logs every request
        console.log(`New request for: [${req.method}] ${req.url}`);
        next(); //< call to the next request handler
    });

    //Starting the server!
    app.listen(PORT, HOST, function(){
        console.log(`Server is running on ${HOST}:${PORT}.`); //< just a check
    }).on("error", (err: any) => {
        switch(err.code){
            case "EPORTINUSE":
                console.error("Error: PORT already in use"); break;
            default: 
                console.error(err); break;
        }
    });

    

    //insert also socketio
});