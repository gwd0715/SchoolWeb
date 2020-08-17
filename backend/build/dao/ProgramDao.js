"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Program_1 = require("../entity/Program");
const console = require("console");
class ProgramDao {
    constructor() {
        this.repo = typeorm_1.getRepository(Program_1.default);
    }
    async getAllProgram() {
        try {
            const programs = await this.repo.find();
            if (programs) {
                return programs;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getProgramById(id) {
        try {
            const program = await this.repo.findOne(id);
            if (program) {
                return program;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addSingleProgram(program) {
        try {
            await this.repo.save(program);
            return program;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addAllPrograms(programs) {
        console.log(programs);
        try {
            const newprograms = [];
            for (let i = 0; i < programs.length; i++) {
                const newProgram = await this.addSingleProgram(programs[i]);
                newprograms.push(newProgram);
            }
            return newprograms;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateProgramById(id, program) {
        try {
            const abandonedProgram = await this.repo.findOne(id);
            await this.repo.update(id, program);
            return abandonedProgram;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteProgramById(id) {
        try {
            const program = await this.repo.findOne(id);
            const response = await this.repo.delete(id);
            if (response.raw[1]) {
                return program;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = ProgramDao;
//# sourceMappingURL=ProgramDao.js.map