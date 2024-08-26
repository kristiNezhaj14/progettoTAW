"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService = require("./../services/userService");
class UserController {
}
exports.UserController = UserController;
UserController.createUser = (req, res) => {
    var data = req.body;
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
    }).catch((reason) => {
        res.writeHead(500, JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
    });
};
