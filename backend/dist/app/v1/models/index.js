"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.user = void 0;
const config_1 = require("./../config/config");
Object.defineProperty(exports, "mongoose", { enumerable: true, get: function () { return config_1.mongoose; } });
const db_connection = config_1.Config.getInstance().db;
;
var user = db_connection.model('User', new config_1.mongoose.Schema({
    //todo
    name: String,
    surname: String,
    password: String,
    email: String,
    roles: Array,
    createdAt: { type: Date, default: Date.now }
}));
exports.user = user;
user.schema.methods.createUser = function () {
    console.log(`Create user called!`);
};
