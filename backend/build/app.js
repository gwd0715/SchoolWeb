"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const Autentification_1 = require("./middleware/Autentification");
const BadAPICAll_1 = require("./middleware/BadAPICAll");
const ErrorHandler_1 = require("./middleware/ErrorHandler");
class App {
    constructor(routers, port) {
        this.app = express();
        this.port = port;
        this.initiallizeMiddleware();
        this.registerRouter(routers);
        this.initiallizeErrorHandling();
    }
    initiallizeMiddleware() {
        this.app.use(cors({
            credentials: true,
            origin: 'http://localhost:3000'
        }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(['/api/staff/delete', '/api/staff/add'], Autentification_1.authMiddleware);
    }
    initiallizeErrorHandling() {
        this.app.use(ErrorHandler_1.default);
        this.app.use(BadAPICAll_1.default);
    }
    registerRouter(routers) {
        routers.forEach((router) => {
            this.app.use(router.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App listening on port ' + this.port);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map