"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class AuthException extends HttpException_1.default {
    constructor() {
        super(401, 'Authentication failed');
    }
}
exports.default = AuthException;
//# sourceMappingURL=AuthException.js.map