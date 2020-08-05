"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class NotFoundException extends HttpException_1.default {
    constructor() {
        super(404, 'Resources Not Found');
    }
}
exports.default = NotFoundException;
//# sourceMappingURL=NotFoundException.js.map