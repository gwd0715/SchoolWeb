"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const badAPICall = (req, res, next) => {
    res.status(404).send({ status: 404, message: 'Bad API call!' }).end();
};
exports.default = badAPICall;
//# sourceMappingURL=BadAPICAll.js.map