import express = require('express');
const router = express.Router();

import * as Middleware from "../middlewares";
import jsonwebtoken = require('jsonwebtoken'); // JWT generation
import "../controllers";
import UserController from '../controllers/userController';
import ListingController from '../controllers/ListingController'; 
import * as userService from '../services/userService';
import { Configuration } from '../config/config';
import mongoose from 'mongoose';


/**
 * todo manage json error response instead of mere string
 * @param config 
 * @returns express.router object with all api/v1 routes
 */
export const getRouter = (config: Configuration) => {
    // Router per user management
    const userRouter = express.Router();

    router.get('/', function (req, res) {
        console.log(`Generic endpoint for api v1 called!`);
        res.end("Benvenuto/a! Questo e' una api aperta usata solo per scopi di test!");
    });

    router.post('/authenticate', Middleware.passport.authenticate('basic', { session: false }), (req, res) => {
        const tokendata = {
            role: req.user.role,
            email: req.user.email,
            id: req.user._id.toString(), // Memorizza l'ID come stringa
        };

        console.log("Login granted. Generating token");
        const token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ error: false, errormessage: "", token: token_signed });
    });

    userRouter
        .get('/:userId', Middleware.auth, UserController.getUser) //get user info if (:userId is me gets logged user's info)
        .put('/:userId', Middleware.auth, Middleware.shouldBeAModerator, UserController.updateUser) // update account of every user
        .put('/update', Middleware.auth, UserController.updateUserAccount) // update the account information of the authenticated user
        .get('/', Middleware.auth, Middleware.shouldBeAModerator, UserController.getAllUsers) // get a list of all users
        .post('/', Middleware.auth, Middleware.shouldBeAModerator, UserController.createUser) // create an user as moderator
        .post('/register', UserController.register) // user registration
        .delete('/:userId', Middleware.auth, Middleware.shouldBeAModerator, UserController.deleteUser);

    router.use('/users', userRouter); //< mount on prefix for user related requests routing

    // Router per listings
    const listingsRouter = express.Router();

    listingsRouter
        .post('/', Middleware.auth, ListingController.createListing) // Crea un nuovo listing
        .get('/', ListingController.getListings); // Recupera tutti i listings

    router.use("/listings", listingsRouter); //< mount on prefix for listings

    return router;
};