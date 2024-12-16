"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express = require("express");
const router = express.Router();
const Middleware = require("../middlewares");
const jsonwebtoken = require("jsonwebtoken"); // JWT generation
require("../controllers");
const userController_1 = require("../controllers/userController");
const ListingController_1 = require("../controllers/ListingController"); // Controller per listings
const getRouter = (config) => {
    // Router per user management
    const userRouter = express.Router();
    router.get('/', function (req, res) {
        console.log(`Generic endpoint for api v1 called!`);
        res.end("Benvenuto/a! Questo e' una api aperta usata solo per scopi di test!");
    });
    router.post('/authenticate', Middleware.passport.authenticate('basic', { session: false }), (req, res, next) => {
        /** Taken from TAW lectures code */
        let tokendata = {
            role: req.user.role,
            email: req.user.email,
            id: req.user.id
        };
        console.log("Login granted. Generating token");
        let token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Note: You can manually check the JWT content at https://jwt.io
        return res.status(200).json({ error: false, errormessage: "", token: token_signed });
    });
    userRouter
        .get('/:userId', userController_1.default.getUser)
        .put('/:userId', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.updateUser) // update account of every user
        .put('/update', Middleware.auth, userController_1.default.updateUserAccount) // update the account information of the authenticated user
        .get('/', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.getAllUsers) // get a list of all users
        .post('/', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.createUser) // create an user as moderator
        .post('/register', userController_1.default.register) // user registration
        .delete('/:userId', Middleware.auth, Middleware.shouldBeAModerator, userController_1.default.deleteUser); // delete of an user
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