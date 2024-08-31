import express = require('express');
const router = express.Router();

import * as Middleware from "../middlewares";
import jsonwebtoken = require('jsonwebtoken');  // JWT generation

import "../controllers";
import UserController from '../controllers/userController';
import { Configuration }  from '../config/config';

export const getRouter = (config: Configuration) => {


    

    //should guard for permissions with roles....
    //router for user management
    const userRouter = express.Router();
    
    router.get('/', function(req, res){
        console.log(`Generic endpoint for api v1 called!`);
        res.end("Benvenuto/a! Questo e' una api aperta usata solo per scopi di test!");
    });

    router.post('/authenticate', Middleware.passport.authenticate('basic', { session: false }), (req,res,next) => {
        /** Taken from TAW lectures code */
        let tokendata = {
            role: req.user.rolee,
            email: req.user.email,
            id: req.user.id
        };
        
        console.log("Login granted. Generating token" );
        let token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: '1h' } );
        
        // Note: You can manually check the JWT content at https://jwt.io
        return res.status(200).json({ error: false, errormessage: "", token: token_signed });
    });

    userRouter
    .get('/:userId', UserController.getUser)
    .put('/:userId', UserController.updateUser)
    .get('/', Middleware.shouldBeAModerator, UserController.getAllUsers)
    .post('/', Middleware.shouldBeAModerator, UserController.createUser)
    .post('/register', UserController.register)
    .delete('/:userId', Middleware.shouldBeAModerator, UserController.deleteUser);

    router.use("/users", userRouter); //< use a prefix for user routing

    //router for books

    //router for bids

    //router for chats and

    return router;
}