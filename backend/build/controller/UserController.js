"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const UserDao_1 = require("../dao/UserDao");
const BadRequestException_1 = require("../exceptions/BadRequestException");
const HttpException_1 = require("../exceptions/HttpException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
class UserController {
    constructor() {
        this.dao = new UserDao_1.default();
    }
    async getUserFromReq(req, res, next) {
        const user = req.body.user;
        if (user) {
            res.locals.user = user;
            next();
        }
        else {
            next(new BadRequestException_1.default());
        }
    }
    async getAllUser(req, res, next) {
        try {
            const users = await this.dao.getAllUser();
            if (users) {
                res.send(users);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async getUserByUsername(req, res, next) {
        const { user } = res.locals;
        try {
            const userInfo = await this.dao.getUserByUsername(user.username);
            if (userInfo) {
                res.send(userInfo);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async addSingleUser(req, res, next) {
        const { user } = res.locals;
        const password = user.password;
        const hashedPassword = await bcrypt.hash(password, 11);
        const hashedUser = {
            username: user.username,
            password: hashedPassword,
            authorization: 1
        };
        try {
            const check = await this.dao.getUserByUsername(user.username);
            if (check) {
                return next(new BadRequestException_1.default());
            }
            const newUser = await this.dao.addSingleUser(hashedUser);
            if (newUser) {
                res.send(newUser);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async updateUser(req, res, next) {
        const { user } = res.locals;
        try {
            const formerUser = await this.dao.updateUserByUsername(user);
            if (formerUser) {
                res.send(formerUser);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async deleteUser(req, res, next) {
        const { user } = res.locals;
        try {
            const usernames = [];
            for (let i = 0; i < user.length; i++) {
                usernames.push(user[i].id);
            }
            console.log(usernames);
            const abandonedUser = await this.dao.deleteUserByUsername(usernames);
            if (abandonedUser) {
                res.send(abandonedUser);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map