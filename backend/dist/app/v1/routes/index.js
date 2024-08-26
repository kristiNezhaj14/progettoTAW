"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express = require("express");
const router = express.Router();
require("../controllers");
const userController_1 = require("../controllers/userController");
const getRouter = (config) => {
    //router for user management
    const userRouter = express.Router();
    userRouter.get('/:id', function (req, res) {
        //get a specific user
    }).put('/:id', function (req, res) {
        //update a specific user info
    }).get('/', function (req, res) {
        //get a list of users --> manage filters
    }).post('/', userController_1.UserController.createUser);
    router.use("/users", userRouter); //< use a prefix for user routing
    //router for table management 
    const tablesRouter = express.Router();
    tablesRouter.get('/:id', function (req, res) {
        //get a specific user
    }).put('/:id', function (req, res) {
        //update a specific user info
    }).get('/', function (req, res) {
        //get a list of users --> manage filters
    }).post('/', (req, res) => { });
    router.use("/tables", tablesRouter); //< use a prefix for user routing
    //router for product management
    //router for order management
    //router for receipt management
    return router;
};
exports.getRouter = getRouter;
