"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService = require("./../services/userService");
class UserController {
}
UserController.register = (req, res) => {
    UserController.createUser(req, res); //at the moment they perform the same type of request...
};
UserController.createUser = (req, res) => {
    var data = req.body;
    userService.createUser(data).then((result) => {
        console.log(`Create user`, data, result);
        if (result) {
            res.writeHead(200);
            res.end(JSON.stringify({ status: 'success', id: result._id }));
        }
        else {
            res.writeHead(500);
            res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
        }
    }).catch((reason) => {
        console.error(reason);
        res.writeHead(500);
        res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
    }).finally(() => {
        res.end(); //< it's important to be sure that the request ends....
    });
};
UserController.updateUser = (req, res) => {
    var data = req.body;
    var id = req.params.userId;
    console.log(`Trying to update user ${id} info with:`, data);
    userService.updateUser(id, data).then((result) => {
        if (result) {
            res.writeHead(200);
            res.write(JSON.stringify({ status: 'success' }));
        }
        else {
            res.writeHead(500);
            res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
        }
    }).catch((reason) => {
        res.writeHead(500);
        res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
    }).finally(() => {
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
            res.writeHead(200);
            res.write(JSON.stringify({ status: 'success', user: doc }));
        }).catch((err) => {
            console.error(err);
            res.writeHead(500);
            res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
        }).finally(() => {
            res.end();
        });
    }
};
UserController.deleteUser = (req, res) => {
    var _a;
    let id = (_a = req.params.userId) !== null && _a !== void 0 ? _a : null;
    if (id === null) {
        res.writeHead(400);
        res.write(JSON.stringify({ status: "failed", message: 'Bad Request! Read the api docs!' }));
        res.end();
    }
    else {
        userService.deleteUser(id).then((result) => {
            if (result) {
                res.writeHead(200);
                res.write(JSON.stringify({ status: 'success' }));
            }
            else {
                res.writeHead(500);
                res.write(JSON.stringify({ status: 'error', message: "An unexpected error occured! Maybe the user doesn't exist?" }));
            }
        }).catch((err) => {
            console.error(err);
            res.writeHead(500);
            res.write(JSON.stringify({ status: 'failed', message: 'An error occured, read the api docs!' }));
        }).finally(() => {
            res.end();
        });
    }
};
UserController.getAllUsers = (req, res) => {
    userService.getUsersList().then((list) => {
        if (list) {
            res.writeHead(200);
            //don't want to let people see other information like password and so on...
            const filteredList = list.map((item) => { return { name: item.name, surname: item.surname, email: item.email, createdAt: item.createdAt }; });
            res.end(JSON.stringify({ status: "success", "data": filteredList }));
        }
        else {
            res.writeHead(500);
            res.end(JSON.stringify({ status: "failed", "message": "Failed to retrieve users list" }));
        }
    });
};
exports.default = UserController;
//# sourceMappingURL=userController.js.map