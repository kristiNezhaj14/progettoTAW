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
exports.getUserByEmail = exports.getUsersList = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUserInfo = void 0;
const mongoose_1 = require("mongoose");
const Models = require("../models");
const getUsersList = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (currentPage = 1, pagination = 0) {
    let result = yield Models.UserModel.getModel().find({});
    return result;
});
exports.getUsersList = getUsersList;
const getUserInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Models.UserModel.getModel().findById(new mongoose_1.default.Types.ObjectId(id));
    return result;
});
exports.getUserInfo = getUserInfo;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Models.UserModel.getModel().create(data);
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Models.UserModel.getModel().findOne({ email: email });
    return result;
});
exports.getUserByEmail = getUserByEmail;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield Models.UserModel.getModel().findById(id);
    //we need to do this approach instead of directly call UpdateOne because of the hashedpassword middleware
    //that cannot be called in pre('updateOne') by construction
    user.set(data);
    return yield user.save();
    //return await user.updateOne(data);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Models.UserModel.getModel().findByIdAndDelete(new mongoose_1.default.Types.ObjectId(id));
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
});
exports.deleteUser = deleteUser;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield Models.UserModel.getModel().findOne({ email: email });
    let isValid = yield user.comparePassword(password);
    return isValid;
});
//# sourceMappingURL=userService.js.map