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
exports.updateUser = exports.deleteUser = exports.createUser = void 0;
const models = require("../models");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield models.user.create(data);
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield models.user.findOneAndUpdate({ id: id }, data);
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models.user.findByIdAndDelete({ id: id });
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.deleteUser = deleteUser;
