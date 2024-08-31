"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express = require("express");
const router = express.Router();
const Middleware = require("../middlewares");
const jsonwebtoken = require("jsonwebtoken"); // JWT generation
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
    router.post('/authenticate', Middleware.passport.authenticate('basic', { session: false }), (req, res, next) => {
        /** Taken from TAW lectures code */
        let tokendata = {
            role: req.user.rolee,
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
        .put('/:userId', userController_1.default.updateUser)
        .get('/', Middleware.shouldBeAModerator, userController_1.default.getAllUsers)
        .post('/', Middleware.shouldBeAModerator, userController_1.default.createUser)
        .post('/register', userController_1.default.register)
        .delete('/:userId', Middleware.shouldBeAModerator, userController_1.default.deleteUser);
    router.use("/users", userRouter); //< use a prefix for user routing
    //router for books
    //router for bids
    //router for chats and
    return router;
};
exports.getRouter = getRouter;
//# sourceMappingURL=index.js.map