"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramDao_1 = require("../dao/ProgramDao");
const BadRequestException_1 = require("../exceptions/BadRequestException");
const HttpException_1 = require("../exceptions/HttpException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
class ProgramController {
    constructor() {
        this.dao = new ProgramDao_1.default();
    }
    async getProgramIdFromReq(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new BadRequestException_1.default());
        }
        else {
            res.locals.id = id;
            next();
        }
    }
    async getProgramFromReq(req, res, next) {
        const program = req.body;
        if (program) {
            res.locals.program = program;
            next();
        }
        else {
            next(new BadRequestException_1.default());
        }
    }
    async getAllProgram(req, res, next) {
        try {
            const programs = await this.dao.getAllProgram();
            if (programs) {
                res.send(programs);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async getProgramById(req, res, next) {
        const { id } = res.locals;
        try {
            const program = await this.dao.getProgramById(id);
            if (program) {
                res.send(program);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async addSingleProgram(req, res, next) {
        const { program } = res.locals;
        try {
            const newProgram = await this.dao.addSingleProgram(program);
            if (newProgram) {
                res.send(newProgram);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async addAllProgram(req, res, next) {
        const { program } = res.locals;
        try {
            const newPrograms = await this.dao.addAllPrograms(program);
            if (newPrograms) {
                res.send(newPrograms);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async updateProgram(req, res, next) {
        const { id, program } = res.locals;
        try {
            const formerProgram = await this.dao.updateProgramById(id, program);
            if (formerProgram) {
                res.send(formerProgram);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async deleteProgram(req, res, next) {
        const { id } = res.locals;
        try {
            const abandonedProgram = await this.dao.deleteProgramById(id);
            if (abandonedProgram) {
                res.send(abandonedProgram);
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
exports.default = ProgramController;
//# sourceMappingURL=ProgramController.js.map