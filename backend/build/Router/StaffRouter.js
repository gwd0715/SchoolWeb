"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StaffController_1 = require("../controller/StaffController");
const RouterInterface_1 = require("./RouterInterface");
class StaffRouter {
    constructor() {
        this.controller = new StaffController_1.default();
        this.path = '/api/staff';
        this.router = express_1.Router();
        this.routes = [
            {
                path: `${this.path}/all`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [this.controller.getAllStaff]
            },
            {
                path: `${this.path}/addAll`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getStaffFromReq,
                    this.controller.addAllStaff
                ]
            },
            {
                path: `${this.path}/:id(\\d+)`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [
                    this.controller.getStaffIdFromReq,
                    this.controller.getStaffById
                ]
            },
            {
                path: `${this.path}/add`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getStaffFromReq,
                    this.controller.addSingleStaff
                ]
            },
            {
                path: `${this.path}/:id(\\d+)/update`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getStaffIdFromReq,
                    this.controller.getStaffFromReq,
                    this.controller.updateStaff
                ]
            },
            {
                path: `${this.path}/:id(\\d+)/delete`,
                method: RouterInterface_1.HttpMethod.DELETE,
                actions: [
                    this.controller.getStaffIdFromReq,
                    this.controller.deleteStaff
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
exports.default = StaffRouter;
//# sourceMappingURL=StaffRouter.js.map