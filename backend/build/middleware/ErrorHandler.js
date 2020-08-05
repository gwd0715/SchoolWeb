"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    const status = error.status || 404;
    const message = error.message || 'Wrong API call';
    res.status(status).send({ status, message }).end();
};
exports.default = errorMiddleware;
//# sourceMappingURL=ErrorHandler.js.map