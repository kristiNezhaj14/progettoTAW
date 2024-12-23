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

        const list = await db.listDatabases();

        console.log(list);
        
        //< check existance of 'progettoTAW' if not exists generate al demo data else noop

        const v1_routes = require('../routes');
        const router = v1_routes.getRouter(ConfigV1);
        
        const cors_options = {
            origin: "*",
            preflightContinue: true,
            credentials: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            allowedHeaders:['Content-Type', 'Authorization'],
        };

        app.use(cors(cors_options));

        app.options('*', cors(cors_options), (req, res) => {
            return res.status(200).end();
        });

        //router.use(bodyParser.json());
        app.use(prefix, router); //< mount apis into a specific prefix
        console.log(`Apis mounted on prefix ${prefix}`);
    } catch (error){
        console.error("An error occured while connecting to database!");
        console.error(error);
    }
}


export { config, API_ENDPOINT};