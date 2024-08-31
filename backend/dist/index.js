"use strict";
/* INIT OF THE BACKEND SERVER */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//load all envs
require('dotenv').config();
//imports
const express = require("express");
const api_v1_configuration = require("./app/v1/config");
const middlewares_1 = require("./app/v1/middlewares");
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST = process.env.HOST ? process.env.HOST : '0.0.0.0';
const app = express();
//per l'utilizzo di JWT
//https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/
/**
 * function that start all api configurations
 */
const startApiConfigurations = function (app) {
    return __awaiter(this, void 0, void 0, function* () {
        //defaults configs for app
        app.use(express.json()); //!important for exchange information via json and for getting req.body
        app.use(middlewares_1.expectsJsonResponse); //< by default we always respond with json
        //configuration of the api v1 routes
        yield api_v1_configuration.config(app, api_v1_configuration.API_ENDPOINT);
        /** HERE goes the configuration invocations of every api version **/
        return app;
    });
};
//start configurations and then start express server on port
startApiConfigurations(app).then(function (app) {
    console.log(`API versions configuration terminated succesfully...`);
    app.use((req, res, next) => {
        //generic middleware that logs every request
        console.log(`New request for: [${req.method}] ${req.url}`);
        next(); //< call to the next request handler
    });
    //Starting the server!
    app.listen(PORT, HOST, function () {
        console.log(`Server is running on ${HOST}:${PORT}.`); //< just a check
    }).on("error", (err) => {
        switch (err.code) {
            case "EPORTINUSE":
                console.error("Error: PORT already in use");
                break;
            default:
                console.error(err);
                break;
        }
    });
    //insert also socketio
});
//# sourceMappingURL=index.js.map