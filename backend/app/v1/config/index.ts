//config mongo configuration
import { Express } from "express"; //import Express type
import * as bodyParser from "body-parser";
import * as jsonwebtoken from 'jsonwebtoken';
import {expressjwt as jwt} from 'express-jwt'; 
import * as cors from 'cors';
import mongoose, { mongo } from 'mongoose';

console.log(`Exporting new config!`);
 
export const config = async (app: Express, prefix: string)  => {
    //start http server
    //var auth = jwt({secret: process.env.JWT_SECRET}); //< to implement
    const mongo_cs = process.env.MONGO_DB_CONNECTION_STRING;

    if(typeof mongo_cs === undefined || typeof mongo_cs !== "string"){
        throw "Mongo connection string is MANDATORY";
    }
    
    try {
        const db_connection =  mongoose.createConnection(mongo_cs);

        const { Config } = require("./config");
        const configuration = new Config(db_connection);        
        const v1_routes = require('../routes');

        const router = v1_routes.getRouter(configuration);
        router.use(cors());
        router.use(bodyParser.json());

        app.use(prefix, router); //< mount apis into a specific prefix
    } catch (error){
        console.error("An error occured while connecting to database!");
        console.error(error);
    }

    
}


