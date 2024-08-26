"use strict";
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
exports.config = void 0;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose_1 = require("mongoose");
console.log(`Exporting new config!`);
const config = (app, prefix) => __awaiter(void 0, void 0, void 0, function* () {
    //start http server
    //var auth = jwt({secret: process.env.JWT_SECRET}); //< to implement
    const mongo_cs = process.env.MONGO_DB_CONNECTION_STRING;
    if (typeof mongo_cs === undefined || typeof mongo_cs !== "string") {
        throw "Mongo connection string is MANDATORY";
    }
    try {
        const db_connection = mongoose_1.default.createConnection(mongo_cs);
        const { Config } = require("./config");
        const configuration = new Config(db_connection);
        const v1_routes = require('../routes');
        const router = v1_routes.getRouter(configuration);
        router.use(cors());
        router.use(bodyParser.json());
        app.use(prefix, router); //< mount apis into a specific prefix
    }
    catch (error) {
        console.error("An error occured while connecting to database!");
        console.error(error);
    }
});
exports.config = config;
