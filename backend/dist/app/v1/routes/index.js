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
exports.getRouter = void 0;
const express = require("express");
const router = express.Router();
const Middleware = require("../middlewares");
const jsonwebtoken = require("jsonwebtoken"); // JWT generation
require("../controllers");
const userController_1 = require("../controllers/userController");
const ListingController_1 = require("../controllers/ListingController");
const userService = require("../services/userService");
const mongoose_1 = require("mongoose");
const getRouter = (config) => {
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
        .get('/:userId', Middleware.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Controlla se il parametro è "me" e usa l'ID dal token JWT
            const userId = req.params.userId === "me" ? req.auth.id : req.params.userId;
            console.log("User ID resolved to:", userId);
            if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ status: 'failed', message: 'Invalid user ID format' });
            }
            const user = yield userService.getUserInfo(userId);
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
        }
        catch (err) {
            console.error('Error in /users/:userId endpoint:', err.message);
            res.status(500).json({ status: 'failed', message: 'Internal Server Error' });
        }
    }))
        .put('/:userId', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.updateUser) // update account of every user
        .put('/update', Middleware.auth, userController_1.default.updateUserAccount) // update the account information of the authenticated user
        .get('/', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.getAllUsers) // get a list of all users
        .post('/', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.createUser) // create an user as moderator
        .post('/register', userController_1.default.register) // user registration
        .delete('/:userId', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.deleteUser);
    router.use("/users", userRouter); //< mount on prefix for user related requests routing
    // Router per listings
    const listingsRouter = express.Router();
    listingsRouter
        .post('/', Middleware.auth, ListingController_1.default.createListing) // Crea un nuovo listing
        .get('/', ListingController_1.default.getListings); // Recupera tutti i listings
    router.use("/listings", listingsRouter); //< mount on prefix for listings
    return router;
};
exports.getRouter = getRouter;
//# sourceMappingURL=index.js.map