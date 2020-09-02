"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt = require("jsonwebtoken");
const AuthException_1 = require("../exceptions/AuthException");
exports.authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return next(new AuthException_1.default());
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('expired');
            return next(new AuthException_1.default());
        }
        res.locals.user = user;
        next();
    });
};
//# sourceMappingURL=Autentification.js.map