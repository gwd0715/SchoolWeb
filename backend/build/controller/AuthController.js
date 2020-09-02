"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDao_1 = require("../dao/UserDao");
const AuthException_1 = require("../exceptions/AuthException");
const BadRequestException_1 = require("../exceptions/BadRequestException");
const HttpException_1 = require("../exceptions/HttpException");
class AuthController {
    constructor() {
        this.dao = new UserDao_1.default();
    }
    async checkUserName(req, res, next) {
        const userName = req.body.username;
        if (userName) {
            try {
                const user = await this.dao.getUserByUsername(userName);
                if (user) {
                    res.send({ taken: true });
                }
                else {
                    res.send({ taken: false });
                }
            }
            catch (error) {
                next(new HttpException_1.default(500, error.message));
            }
        }
        else {
            next(new BadRequestException_1.default());
        }
    }
    async login(req, res, next) {
        console.log(req.body);
        const user = req.body.user;
        if (!user) {
            console.log('user does not exist');
            return next(new AuthException_1.default());
        }
        const username = user.username;
        const password = user.password;
        if (!username || !password) {
            console.log('username and password not found');
            return next(new AuthException_1.default());
        }
        try {
            const userInDB = await this.dao.getUserByUsername(username);
            if (!userInDB) {
                return next(new AuthException_1.default());
            }
            if (await bcrypt.compare(password, userInDB.password)) {
                const payload = { username: userInDB.username };
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '4m' });
                res.cookie('rft', refreshToken, {
                    httpOnly: true,
                    secure: true
                });
                res.status(200).send({ accessToken });
            }
            else {
                return next(new AuthException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async authenticateToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token)
            return next(new AuthException_1.default());
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return next(new AuthException_1.default());
            res.locals.user = user;
            next();
        });
    }
    async refreshToken(req, res, next) {
        const refreshToken = req.cookies.rft;
        if (!refreshToken) {
            return next(new AuthException_1.default());
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return next(new AuthException_1.default());
            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '2m'
            });
            res.status(200).send({ accessToken });
        });
    }
    async logout(req, res, next) {
        res.cookie('rft', '').sendStatus(200);
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map