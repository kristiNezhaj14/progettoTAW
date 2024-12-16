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
exports.API_ENDPOINT = exports.config = void 0;
const cors = require("cors");
const config_1 = require("./config");
const mongoose_1 = require("mongoose");
const API_ENDPOINT = "/api/v1";
exports.API_ENDPOINT = API_ENDPOINT;
const config = (app, prefix) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Configuration of ${prefix} routes..`);
    //var auth = jwt({secret: process.env.JWT_SECRET}); //< to implement
    try {
        console.log(`generate db_connection...`);
        const mongo_cs = process.env.MONGO_DB_CONNECTION_STRING;
        console.log(`Trying to connect to db via`, mongo_cs);
        if (typeof mongo_cs === undefined || typeof mongo_cs !== "string") {
            throw "Mongo connection string is MANDATORY";
        }
        let db = mongoose_1.default.createConnection(mongo_cs);
        db = db.useDb('progettoTAW');
        config_1.default.setDbConnection(db);
        const list = yield db.listDatabases();
        console.log(list);
        //< check existance of 'progettoTAW' if not exists generate al demo data else noop
        const v1_routes = require('../routes');
        const router = v1_routes.getRouter(config_1.default);
        app.use(cors({
            origin: "*",
            preflightContinue: true,
            credentials: true
        }));
        //router.use(bodyParser.json());
        app.use(prefix, router); //< mount apis into a specific prefix
        console.log(`Apis mounted on prefix ${prefix}`);
    }
    catch (error) {
        console.error("An error occured while connecting to database!");
        console.error(error);
    }
});
exports.config = config;
//# sourceMappingURL=index.js.map