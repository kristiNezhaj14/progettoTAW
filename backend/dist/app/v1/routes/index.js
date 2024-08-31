"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express = require("express");
const router = express.Router();
require("../controllers");
const userController_1 = require("../controllers/userController");
const getRouter = (config) => {
    //should guard for permissions with roles....
    //router for user management
    const userRouter = express.Router();
    router.get('/', function (req, res) {
        console.log(`Generic endpoint for api v1 called!`);
        res.end("Benvenuto/a! Questo e' una api aperta usata solo per scopi di test!");
    });
    userRouter.get('/:userId', userController_1.UserController.getUser)
        .put('/:userId', userController_1.UserController.updateUser)
        .get('/', userController_1.UserController.getAllUsers)
        .post('/', userController_1.UserController.createUser);
    router.use("/users", userRouter); //< use a prefix for user routing
    //router for books
    //router for bids
    //router for chats and
    return router;
};
exports.getRouter = getRouter;
