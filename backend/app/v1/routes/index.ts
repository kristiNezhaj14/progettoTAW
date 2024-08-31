import express = require('express');
const router = express.Router();

import "../controllers";
import { UserController } from '../controllers/userController';
import { Config } from '../config/config';


export const getRouter = (config: Config) => {
    //should guard for permissions with roles....
    //router for user management
    const userRouter = express.Router();

    router.get('/', function(req, res){
        console.log(`Generic endpoint for api v1 called!`);
        res.end("Benvenuto/a! Questo e' una api aperta usata solo per scopi di test!");
    });

    userRouter.get('/:userId',UserController.getUser)
    .put('/:userId',UserController.updateUser)
    .get('/', UserController.getAllUsers)
    .post('/',  UserController.createUser);

    router.use("/users", userRouter); //< use a prefix for user routing
    //router for books

    //router for bids

    //router for chats and

    return router;
}