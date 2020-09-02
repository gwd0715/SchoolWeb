"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const RouterInterface_1 = require("./RouterInterface");
class AuthRouter {
    constructor() {
        this.controller = new AuthController_1.default();
        this.path = '/api/auth';
        this.router = express_1.Router();
        this.routes = [
            {
                path: `${this.path}/login`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [this.controller.login]
            },
            {
                path: `${this.path}/logout`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [this.controller.logout]
            },
            {
                path: `${this.path}/usernameavailability`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [this.controller.checkUserName]
            },
            {
                path: `${this.path}/refreshToken`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [this.controller.refreshToken]
            }
        ];
        this.registerRouter(this.routes);
    }
    registerRouter(routes) {
        routes.forEach((route) => {
            this.router[route.method](route.path, route.actions.map((action) => action.bind(this.controller)));
        });
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map