"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
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
        this.app.use(cors());
        this.app.use(bodyParser.json());
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