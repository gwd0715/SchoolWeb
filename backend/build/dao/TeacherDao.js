"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Teacher_1 = require("../entity/Teacher");
const console = require("console");
class TeacherDao {
    constructor() {
        this.repo = typeorm_1.getRepository(Teacher_1.default);
    }
    async getAllTeacher() {
        try {
            const teachers = await this.repo.find();
            if (teachers) {
                return teachers;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getTeacherById(id) {
        try {
            const teacher = await this.repo.findOne(id);
            if (teacher) {
                return teacher;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addSingleTeacher(teacher) {
        try {
            await this.repo.save(teacher);
            return teacher;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addAllTeachers(teachers) {
        console.log(teachers);
        try {
            const newTeachers = [];
            for (let i = 0; i < teachers.length; i++) {
                const newTeacher = await this.addSingleTeacher(teachers[i]);
                newTeachers.push(newTeacher);
            }
            return newTeachers;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateTeacherById(id, teacher) {
        try {
            const abandonedTeacher = await this.repo.findOne(id);
            await this.repo.update(id, teacher);
            return abandonedTeacher;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteTeacherById(id) {
        try {
            const teacher = await this.repo.findOne(id);
            const response = await this.repo.delete(id);
            if (response.raw[1]) {
                return teacher;
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
exports.default = TeacherDao;
//# sourceMappingURL=TeacherDao.js.map