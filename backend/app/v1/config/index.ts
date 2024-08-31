//config mongo configuration
import { Express } from "express"; //import Express type
import * as bodyParser from "body-parser";
import * as jsonwebtoken from 'jsonwebtoken';
import {expressjwt as jwt} from 'express-jwt'; 
import * as cors from 'cors';
import mongoose, { mongo } from 'mongoose';
console.log(`Exporting new config!`);
 
const config = async (app: Express, prefix: string)  => {
    console.log(`Configuration of ${prefix} routes..`);

    //start http server
    //var auth = jwt({secret: process.env.JWT_SECRET}); //< to implement
    const mongo_cs = process.env.MONGO_DB_CONNECTION_STRING;
    console.log(`Trying to connect to db via`, mongo_cs);

    if(typeof mongo_cs === undefined || typeof mongo_cs !== "string"){
        throw "Mongo connection string is MANDATORY";
    }
    
    try {
        console.log(`generate db_connection...`);
        const db_connection =  mongoose.createConnection(mongo_cs);
        db_connection.useDb('progettoTAW_auctions');

        const { Config } = require("./config");
        const configuration = new Config(db_connection);        
        const v1_routes = require('../routes');

        const router = v1_routes.getRouter(configuration);
        
        //router.use(cors()); //< disabilito per il momento
        
        //router.use(bodyParser.json());
        app.use(prefix, router); //< mount apis into a specific prefix
        console.log(`Apis mounted on prefix ${prefix}`);
    } catch (error){
        console.error("An error occured while connecting to database!");
        console.error(error);
    }   
}


export { config };