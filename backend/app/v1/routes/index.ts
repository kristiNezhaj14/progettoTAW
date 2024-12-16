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

export const getRouter = (config: Configuration) => {
    // Router per user management
    const userRouter = express.Router();

    router.get('/', function (req, res) {
        console.log(`Generic endpoint for api v1 called!`);
        res.end("Benvenuto/a! Questo e' una api aperta usata solo per scopi di test!");
    });

<<<<<<< HEAD
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
        .get('/:userId', Middleware.auth, async (req, res) => {
            try {
                // Controlla se il parametro è "me" e usa l'ID dal token JWT
                const userId = req.params.userId === "me" ? req.auth.id : req.params.userId;

                console.log("User ID resolved to:", userId);

                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    return res.status(400).json({ status: 'failed', message: 'Invalid user ID format' });
                }

                const user = await userService.getUserInfo(userId);
                if (!user) {
                    return res.status(404).json({ status: 'failed', message: 'User not found' });
                }

                res.status(200).json({
                    status: 'success',
                    user: {
                        _id: user._id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: user.role,
                        createdAt: user.createdAt,
                    },
                });
            } catch (err) {
                console.error('Error in /users/:userId endpoint:', err.message);
                res.status(500).json({ status: 'failed', message: 'Internal Server Error' });
            }
        })
        .put('/:userId', Middleware.auth, Middleware.shouldBeAModerator, UserController.updateUser) // update account of every user
        .put('/update', Middleware.auth, UserController.updateUserAccount) // update the account information of the authenticated user
        .get('/', Middleware.auth, Middleware.shouldBeAModerator, UserController.getAllUsers) // get a list of all users
        .post('/', Middleware.auth, Middleware.shouldBeAModerator, UserController.createUser) // create an user as moderator
        .post('/register', UserController.register) // user registration
        .delete('/:userId', Middleware.auth, Middleware.shouldBeAModerator, UserController.deleteUser);



    
    router.use("/users", userRouter); //< mount on prefix for user related requests routing

    // Router per listings
    const listingsRouter = express.Router();

    listingsRouter
        .post('/', Middleware.auth, ListingController.createListing) // Crea un nuovo listing
        .get('/', ListingController.getListings); // Recupera tutti i listings

    router.use("/listings", listingsRouter); //< mount on prefix for listings

    return router;
};
