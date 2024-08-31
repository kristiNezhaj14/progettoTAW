import { RequestHandler } from "express";

import userService = require('./../services/userService');

export class UserController {
    static createUser: RequestHandler  = (req, res) => {
        var data = req.body;
        
        console.log(req.body);
        console.log(req);
        console.log(`Received data for user creation: `, data);

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

            res.end();
        }).catch( (reason) => {
            res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
            res.end();
        });
    }

    static getUser: RequestHandler = (req, res) => {
        let id = req.params.userId ?? null;

        if(id === null){
            res.writeHead(400, "Bad request!");
            res.end();
        } else {
            userService.getUserInfo(id).then( (doc) => {
                res.writeHead(200, JSON.stringify({ status: 'success', user: doc }));
                res.end();
            }).catch( (err) => {
                console.error(err);
                res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
                res.end();
            });
        }
    }

    static getAllUsers: RequestHandler = (req, res) => {
        //todo
    }
}