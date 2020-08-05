"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeacherController_1 = require("../controller/TeacherController");
const RouterInterface_1 = require("./RouterInterface");
class TeacherRouter {
    constructor() {
        this.controller = new TeacherController_1.default();
        this.path = '/api/teacher';
        this.router = express_1.Router();
        this.routes = [
            {
                path: `${this.path}/all`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [this.controller.getAllTeacher]
            },
            {
                path: `${this.path}/all`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getTeacherFromReq,
                    this.controller.addAllTeacher
                ]
            },
            {
                path: `${this.path}/:id(\\d+)`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [
                    this.controller.getTeacherIdFromReq,
                    this.controller.getTeacherById
                ]
            },
            {
                path: `${this.path}/add`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getTeacherFromReq,
                    this.controller.addSingleTeacher
                ]
            },
            {
                path: `${this.path}/:id(\\d+)/update`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getTeacherIdFromReq,
                    this.controller.getTeacherFromReq,
                    this.controller.updateTeacher
                ]
            },
            {
                path: `${this.path}/:id(\\d+)/delete`,
                method: RouterInterface_1.HttpMethod.DELETE,
                actions: [
                    this.controller.getTeacherIdFromReq,
                    this.controller.deleteTeacher
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
exports.default = TeacherRouter;
//# sourceMappingURL=TeacherRouter.js.map