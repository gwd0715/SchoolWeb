"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const RouterInterface_1 = require("./RouterInterface");
class UserRouter {
    constructor() {
        this.controller = new UserController_1.default();
        this.path = '/api/user';
        this.router = express_1.Router();
        this.routes = [
            {
                path: `${this.path}/all`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [this.controller.getAllUser]
            },
            {
                path: `${this.path}/`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getUserFromReq,
                    this.controller.getUserByUsername
                ]
            },
            {
                path: `${this.path}/add`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getUserFromReq,
                    this.controller.addSingleUser
                ]
            },
            {
                path: `${this.path}/update`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getUserFromReq,
                    this.controller.updateUser
                ]
            },
            {
                path: `${this.path}/delete`,
                method: RouterInterface_1.HttpMethod.DELETE,
                actions: [
                    this.controller.getUserFromReq,
                    this.controller.deleteUser
                ]
            }
        ];
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.routes.forEach((route) => {
            this.router[route.method](route.path, route.actions.map((action) => action.bind(this.controller)));
        });
    }
}
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map