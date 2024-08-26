"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = exports.receipt = exports.order = exports.product = exports.table = exports.user = void 0;
const config_1 = require("./../config/config");
const db_connection = config_1.Config.getInstance().db;
;
;
;
;
;
;
;
var user = db_connection.model('User', new config_1.mongoose.Schema({
//todo
}));
exports.user = user;
user.schema.methods.createUser = function () {
};
let table = db_connection.model('Table', new config_1.mongoose.Schema({}));
exports.table = table;
let product = db_connection.model('Product', new config_1.mongoose.Schema({}));
exports.product = product;
let order = db_connection.model('Order', new config_1.mongoose.Schema({}));
exports.order = order;
let receipt = db_connection.model('Receipt', new config_1.mongoose.Schema({}));
exports.receipt = receipt;
let tags = db_connection.model('Tags', new config_1.mongoose.Schema({}));
exports.tags = tags;
