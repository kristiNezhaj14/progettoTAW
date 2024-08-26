"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.Config = void 0;
const mongoose = require("mongoose");
exports.mongoose = mongoose;
class Config {
    constructor(db) {
        this.db = db;
        if (typeof Config.instance != undefined) {
            throw "Config can't be instanciated more than once!";
        }
        Config.instance = this;
    }
    static getInstance() {
        if (typeof Config.instance == undefined) {
            throw "Config never instanciated";
        }
        return Config.instance;
    }
}
exports.Config = Config;
