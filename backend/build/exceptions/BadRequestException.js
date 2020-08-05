"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class BadRequestException extends HttpException_1.default {
    constructor() {
        super(400, 'Bad Request');
    }
}
exports.default = BadRequestException;
//# sourceMappingURL=BadRequestException.js.map