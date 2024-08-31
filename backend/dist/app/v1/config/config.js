"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.Config = void 0;
const mongoose = require("mongoose");
exports.mongoose = mongoose;
class Config {
    constructor(db) {
        this.db = db;
        console.log(`Config configuration started...`);
        if (Config.instance !== null) {
            throw "Config can't be instanciated more than once!";
        }
        Config.instance = this;
    }
    static getInstance() {
        console.log(`Config get instance called`);
        if (typeof Config.instance === undefined || Config.instance === null) {
            throw "Config never instanciated";
        }
        return Config.instance;
    }
}
exports.Config = Config;
Config.instance = null;
