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
exports.shouldBeAModerator = exports.expectsJsonResponse = exports.passport = exports.auth = void 0;
const passport = require("passport"); // authentication middleware for Express
exports.passport = passport;
const passportHTTP = require("passport-http"); // implements Basic and Digest authentication for HTTP (used for /login endpoint)
const { expressjwt: jwt } = require('express-jwt'); // JWT parsing middleware for express
const models_1 = require("../models");
exports.auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
}); //jwt middleware
passport.use(new passportHTTP.BasicStrategy(function (email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        // "done" callback (verify callback) documentation:  http://www.passportjs.org/docs/configure/
        // Delegate function we provide to passport middleware
        // to verify user credentials 
        console.log(`New login attempt from ${email}`);
        try {
            const user = yield models_1.UserModel.getModel().findOne({ email: email });
            if (!user) {
                console.error(`User with email: ${email} not found!`);
                return done(null, false, { statusCode: 401, error: true, errormessage: "Unauthorized" });
            }
            const validPassword = yield user.comparePassword(password);
            console.log(`Has a valid password: `, validPassword);
            if (validPassword) {
                return done(null, user); // if it's all ok
            }
            return done(null, false, { statusCode: 401, error: true, errormessage: "Unauthorized" }); //same error to user not found in order to prevent malicious attempts
        }
        catch (err) {
            console.error(`Error on authentication by BasicStrategy: `, err);
            return done({ statusCode: 500, error: true, errormessage: err });
        }
    });
}));
/**
 * Just a middleware that indicate that the response body is a json string...
 * @param req
 * @param res
 * @param next
 */
const expectsJsonResponse = (req, res, next) => {
    res.appendHeader("Content-type", "application/json");
    next();
};
exports.expectsJsonResponse = expectsJsonResponse;
/**
 * Middleware that checks id a user is a moderator or not
 * @param req
 * @param res
 * @param next
 */
const shouldBeAModerator = (req, res, next) => {
    //console.log(req, res, req.auth);
    if (req.auth.role === 'moderator') {
        console.log(`User ${req.auth.email} is a moderator so request can proceed.`);
        next();
    }
    else {
        console.log(`User ${req.auth.email} tried to accomplish a request that only a moderator can do.`);
        res.writeHead(401);
        res.write(JSON.stringify({ status: "failed", message: "You should be a moderator to perform this request" }));
        res.end();
    }
};
exports.shouldBeAModerator = shouldBeAModerator;
//# sourceMappingURL=index.js.map