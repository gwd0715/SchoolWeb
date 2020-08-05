"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherDao_1 = require("../dao/TeacherDao");
const BadRequestException_1 = require("../exceptions/BadRequestException");
const HttpException_1 = require("../exceptions/HttpException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
class TeacherController {
    constructor() {
        this.dao = new TeacherDao_1.default();
    }
    async getTeacherIdFromReq(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new BadRequestException_1.default());
        }
        else {
            res.locals.id = id;
            next();
        }
    }
    async getTeacherFromReq(req, res, next) {
        const teacher = req.body;
        if (teacher) {
            res.locals.teacher = teacher;
            next();
        }
        else {
            next(new BadRequestException_1.default());
        }
    }
    async getAllTeacher(req, res, next) {
        try {
            const teachers = await this.dao.getAllTeacher();
            if (teachers) {
                res.send(teachers);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async getTeacherById(req, res, next) {
        const { id } = res.locals;
        try {
            const teacher = await this.dao.getTeacherById(id);
            if (teacher) {
                res.send(teacher);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async addSingleTeacher(req, res, next) {
        const { teacher } = res.locals;
        try {
            const newTeacher = await this.dao.addSingleTeacher(teacher);
            if (newTeacher) {
                res.send(newTeacher);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async addAllTeacher(req, res, next) {
        const { teacher } = res.locals;
        try {
            const newTeachers = await this.dao.addAllTeachers(teacher);
            if (newTeachers) {
                res.send(newTeachers);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async updateTeacher(req, res, next) {
        const { id, teacher } = res.locals;
        try {
            const formerTeacher = await this.dao.updateTeacherById(id, teacher);
            if (formerTeacher) {
                res.send(formerTeacher);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async deleteTeacher(req, res, next) {
        const { id } = res.locals;
        try {
            const abandonedTeacher = await this.dao.deleteTeacherById(id);
            if (abandonedTeacher) {
                res.send(abandonedTeacher);
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
exports.default = TeacherController;
//# sourceMappingURL=TeacherController.js.map