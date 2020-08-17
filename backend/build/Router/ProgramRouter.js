"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProgramController_1 = require("../controller/ProgramController");
const RouterInterface_1 = require("./RouterInterface");
class ProgramRouter {
    constructor() {
        this.controller = new ProgramController_1.default();
        this.path = '/api/program';
        this.router = express_1.Router();
        this.routes = [
            {
                path: `${this.path}/all`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [this.controller.getAllProgram]
            },
            {
                path: `${this.path}/addAll`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getProgramFromReq,
                    this.controller.addAllProgram
                ]
            },
            {
                path: `${this.path}/:id(\\d+)`,
                method: RouterInterface_1.HttpMethod.GET,
                actions: [
                    this.controller.getProgramIdFromReq,
                    this.controller.getProgramById
                ]
            },
            {
                path: `${this.path}/add`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getProgramFromReq,
                    this.controller.addSingleProgram
                ]
            },
            {
                path: `${this.path}/:id(\\d+)/update`,
                method: RouterInterface_1.HttpMethod.POST,
                actions: [
                    this.controller.getProgramIdFromReq,
                    this.controller.getProgramFromReq,
                    this.controller.updateProgram
                ]
            },
            {
                path: `${this.path}/:id(\\d+)/delete`,
                method: RouterInterface_1.HttpMethod.DELETE,
                actions: [
                    this.controller.getProgramIdFromReq,
                    this.controller.deleteProgram
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
exports.default = ProgramRouter;
//# sourceMappingURL=ProgramRouter.js.map