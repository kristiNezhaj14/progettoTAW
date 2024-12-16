import { RequestHandler, request, response } from "express";

import userService = require('./../services/userService');

export default class UserController {

    static register: RequestHandler = (req: request, res: response) => {
        UserController.createUser(req, res); //at the moment they perform the same type of request...
    }

    static createUser: RequestHandler  = (req: request, res: response) => {
        var data = req.body;
        
        userService.createUser(data).then( (result) => {
            console.log(`Create user`, data, result);
            if(result){
                res.writeHead(200);
                res.end(JSON.stringify({ status: 'success', id: result._id}));
            } else {
                res.writeHead(500);
                res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
            }
        }).catch( (reason) => {
            console.error(reason);
            res.writeHead(500);
            res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
        }).finally(() => {
            res.end(); //< it's important to be sure that the request ends....
        });
    }
    static getLoggedInUser: RequestHandler = async (req, res) => {
        try {
            const userId = req.auth?.id; // Usa l'id dal JWT
            if (!userId) {
                return res.status(400).json({ status: 'failed', message: 'User ID is required' });
            }
    
            const user = await userService.getUserInfo(userId);
            if (!user) {
                return res.status(404).json({ status: 'failed', message: 'User not found' });
            }
    
            // Filtra i dati sensibili (es. password)
            const filteredUser = {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            };
    
            res.status(200).json({ status: 'success', user: filteredUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'failed', message: 'An error occurred.' });
        }
    };
    

    static updateUserAccount: RequestHandler = (req, res) => {
        var user_email = req.auth.email;
        var data = req.body;

        userService.getUserByEmail(user_email).then( (userData) => {
            userService.updateUser(userData.id, data).then((result) => {
                if (result) {
                    res.writeHead(200);
                    res.write(JSON.stringify({ status: 'success' }));
                } else {
                    res.writeHead(500);
                    res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
                }
            }).catch((reason) => {
                res.writeHead(500);
                res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
            }).finally(() => {
                res.end();
            });
        });

        
    }

    static updateUser: RequestHandler = (req, res) => {
        var data = req.body;
        var id = req.params.userId;

        console.log(`Trying to update user ${id} info with:`, data);

        userService.updateUser(id, data).then((result) => {
            if(result){
                res.writeHead(200);
                res.write(JSON.stringify({ status: 'success'}));
            } else {
                res.writeHead(500);
                res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
            }
        }).catch( (reason) => {
            res.writeHead(500);
            res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
        }).finally( () => {
            res.end();
        });
    }

    static getUser: RequestHandler = async (req, res) => {
        const id = req.params.userId;
    
        try {
            const user = await userService.getUserInfo(id);
            if (!user) {
                return res.status(404).json({ status: 'failed', message: 'User not found' });
            }
            return res.status(200).json({ status: 'success', user });
        } catch (err) {
            console.error('Error in getUser:', err.message);
            return res.status(400).json({ status: 'failed', message: err.message });
        }
    };
    
    
    static deleteUser: RequestHandler = (req, res) => {
        let id = req.params.userId ?? null;

        if(id === null){
            res.writeHead(400);
            res.write(JSON.stringify({ status: "failed", message: 'Bad Request! Read the api docs!'}));
            res.end();
        } else {
            userService.deleteUser(id).then( (result) => {
                if(result){
                    res.writeHead(200);
                    res.write(JSON.stringify({ status: 'success' }));
                } else {
                    res.writeHead(500);
                    res.write(JSON.stringify({ status: 'error', message: "An unexpected error occured! Maybe the user doesn't exist?" }));
                }
            }).catch( (err) => {
                console.error(err);
                res.writeHead(500);
                res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!'}));
            }).finally( () => {
                res.end();
            });
        }
    }

    static getAllUsers: RequestHandler = (req, res) => {
        userService.getUsersList().then( (list) => {
            if(list){
                res.writeHead(200);
                //don't want to let people see other information like password and so on...
                const filteredList = list.map((item) => { return { name: item.name, surname: item.surname, email: item.email, createdAt: item.createdAt}; });
                res.end(JSON.stringify({status: "success", "data": filteredList }));
            } else {
                res.writeHead(500);
                res.end(JSON.stringify({status: "failed", "message": "Failed to retrieve users list"}));
            }
        });
    }
}