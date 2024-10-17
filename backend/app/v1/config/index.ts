//config mongo configuration
import { Express } from "express"; //import Express type
import * as bodyParser from "body-parser";
import * as jsonwebtoken from 'jsonwebtoken';
import {expressjwt as jwt} from 'express-jwt'; 
import * as cors from 'cors';

import ConfigV1 from "./config";
import mongoose from "mongoose";

const API_ENDPOINT = "/api/v1"
const config = async (app: Express, prefix: string)  => {
    console.log(`Configuration of ${prefix} routes..`);

    //var auth = jwt({secret: process.env.JWT_SECRET}); //< to implement
       
    try {
        console.log(`generate db_connection...`);

        const mongo_cs = process.env.MONGO_DB_CONNECTION_STRING;
        console.log(`Trying to connect to db via`, mongo_cs);

        if(typeof mongo_cs === undefined || typeof mongo_cs !== "string"){
            throw "Mongo connection string is MANDATORY";
        }

        let db = mongoose.createConnection(mongo_cs);
        db = db.useDb('progettoTAW');
        ConfigV1.setDbConnection(db);

        //this.db.listDatabases().then( list => {
        //    console.log(`List of databases: `, list);
        //    //this.db.useDb('progettoTAW_auctions');
        //});

        const v1_routes = require('../routes');
        const router = v1_routes.getRouter(ConfigV1);
        
        app.use(cors({
            origin: "*",
            preflightContinue: true,
            credentials: true
        })); 
        
        //router.use(bodyParser.json());
        app.use(prefix, router); //< mount apis into a specific prefix

        console.log(`Apis mounted on prefix ${prefix}`);
    } catch (error){
        console.error("An error occured while connecting to database!");
        console.error(error);
    }
}


export { config, API_ENDPOINT};