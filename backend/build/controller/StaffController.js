"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StaffDao_1 = require("../dao/StaffDao");
const BadRequestException_1 = require("../exceptions/BadRequestException");
const HttpException_1 = require("../exceptions/HttpException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
class StaffController {
    constructor() {
        this.dao = new StaffDao_1.default();
    }
    async getStaffTest(req, res, next) {
        const staff = req.body;
        console.log(staff);
        res.status(200).send(staff);
    }
    async getStaffIdFromReq(req, res, next) {
        const id = req.params.id;
        if (!id) {
            next(new BadRequestException_1.default());
        }
        else {
            res.locals.id = id;
            next();
        }
    }
    async getStaffFromReq(req, res, next) {
        const staff = req.body;
        console.log(staff);
        if (staff) {
            res.locals.staff = staff;
            next();
        }
        else {
            next(new BadRequestException_1.default());
        }
    }
    async getAllStaff(req, res, next) {
        try {
            const staffs = await this.dao.getAllStaff();
            if (staffs) {
                res.send(staffs);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async getStaffById(req, res, next) {
        const { id } = res.locals;
        try {
            const staff = await this.dao.getStaffById(id);
            if (staff) {
                res.send(staff);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async addSingleStaff(req, res, next) {
        const { staff } = res.locals;
        try {
            const newStaff = await this.dao.addSingleStaff(staff);
            if (newStaff) {
                res.send(newStaff);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async addAllStaff(req, res, next) {
        const { staff } = res.locals;
        try {
            const newStaffs = await this.dao.addAllStaffs(staff);
            if (newStaffs) {
                res.send(newStaffs);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async updateStaff(req, res, next) {
        const { id, staff } = res.locals;
        try {
            const formerStaff = await this.dao.updateStaffById(id, staff);
            if (formerStaff) {
                res.send(formerStaff);
            }
            else {
                next(new NotFoundException_1.default());
            }
        }
        catch (error) {
            next(new HttpException_1.default(500, error.message));
        }
    }
    async deleteStaff(req, res, next) {
        const { id } = res.locals;
        try {
            const abandonedStaff = await this.dao.deleteStaffById(id);
            if (abandonedStaff) {
                res.send(abandonedStaff);
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
exports.default = StaffController;
//# sourceMappingURL=StaffController.js.map