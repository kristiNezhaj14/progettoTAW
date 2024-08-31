"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService = require("./../services/userService");
class UserController {
}
exports.UserController = UserController;
UserController.createUser = (req, res) => {
    var data = req.body;
    console.log(req.body);
    console.log(req);
    console.log(`Received data for user creation: `, data);
    userService.createUser(data).then((result) => {
        if (result) {
            res.writeHead(200, JSON.stringify({ status: 'success' }));
        }
        else {
            res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
        }
    }).catch((reason) => {
        res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
    });
};
UserController.updateUser = (req, res) => {
    var data = req.body;
    var id = req.params.userId;
    userService.updateUser(id, data).then((result) => {
        if (result) {
            res.writeHead(200, JSON.stringify({ status: 'success' }));
        }
        else {
            res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
        }
        res.end();
    }).catch((reason) => {
        res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
        res.end();
    });
};
UserController.getUser = (req, res) => {
    var _a;
    let id = (_a = req.params.userId) !== null && _a !== void 0 ? _a : null;
    if (id === null) {
        res.writeHead(400, "Bad request!");
        res.end();
    }
    else {
        userService.getUserInfo(id).then((doc) => {
            res.writeHead(200, JSON.stringify({ status: 'success', user: doc }));
            res.end();
        }).catch((err) => {
            console.error(err);
            res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
            res.end();
        });
    }
};
UserController.getAllUsers = (req, res) => {
    //todo
};
