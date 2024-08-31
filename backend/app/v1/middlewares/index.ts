import { RequestHandler } from "express";

import passport = require('passport');           // authentication middleware for Express
import passportHTTP = require('passport-http');  // implements Basic and Digest authentication for HTTP (used for /login endpoint)

const { expressjwt: jwt } = require('express-jwt');            // JWT parsing middleware for express

import cors = require('cors'); // Enable CORS middleware
import { UserModel } from "../models";
import { getSchema } from '../models/User';


export const auth = jwt( {
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"]
}); //jwt middleware

passport.use( new passportHTTP.BasicStrategy(
    async function(email, password, done) {
        // "done" callback (verify callback) documentation:  http://www.passportjs.org/docs/configure/

        // Delegate function we provide to passport middleware
        // to verify user credentials 
        console.log(`New login attempt from ${email}`);

        try {
            const user = await UserModel.getModel().findOne({email: email});

            if( !user ) {
                console.error(`User with email: ${email} not found!`);
                return done(null,false, {statusCode: 401, error: true, errormessage: "Unauthorized"} );
            }

            const validPassword = await user.comparePassword( password );
            console.log(`Has a valid password: `, validPassword);
            
            if(validPassword ) {
                return done(null, user); // if it's all ok
            }

            return done(null, false, {statusCode: 401, error: true, errormessage: "Unauthorized"}); //same error to user not found in order to prevent malicious attempts

        } catch(err){
            console.error(`Error on authentication by BasicStrategy: `, err);
            return done( {statusCode: 500, error: true, errormessage: err} );
        }
    }
));

export { passport };

/**
 * Just a middleware that indicate that the response body is a json string...
 * @param req 
 * @param res 
 * @param next 
 */
export const expectsJsonResponse: RequestHandler = (req, res, next) => {
    res.appendHeader("Content-type", "application/json");
    next();
}

/**
 * Middleware that checks id a user is a moderator or not
 * @param req 
 * @param res 
 * @param next 
 */
export const shouldBeAModerator: RequestHandler = (req, res, next) => {
    const authenticatedUser = { isModerator: true}; ///todo modify here the user info!!!
    if(authenticatedUser.isModerator){
        next();
    } else {
        res.writeHead(401);
        res.write(JSON.stringify({status: "failed", message: "You should be a moderator to perform this request"}));
        res.end();
    }
}