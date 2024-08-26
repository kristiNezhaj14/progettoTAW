import { RequestHandler } from "express";

import userService = require('./../services/userService');

export class UserController {
    static createUser: RequestHandler  = (req, res) => {
        var data = req.body;

        userService.createUser(data).then( (result) => {
            if(result){
                res.writeHead(200, JSON.stringify({ status: 'success'}));
            } else {
                res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
            }
        }).catch( (reason) => {
            res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
        });
    }

    static updateUser: RequestHandler = (req, res) => {
        var data = req.body;
        var id = req.params.userId;

        userService.updateUser(id, data).then((result) => {
            if(result){
                res.writeHead(200, JSON.stringify({ status: 'success'}));
            } else {
                res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
            }
        }).catch( (reason) => {
            res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
        });
    }
}