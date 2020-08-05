"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Staff_1 = require("../entity/Staff");
const console = require("console");
class StaffDao {
    constructor() {
        this.repo = typeorm_1.getRepository(Staff_1.default);
    }
    async getAllStaff() {
        try {
            const staffs = await this.repo.find();
            if (staffs) {
                return staffs;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getStaffById(id) {
        try {
            const staff = await this.repo.findOne(id);
            if (staff) {
                return staff;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addSingleStaff(staff) {
        try {
            await this.repo.save(staff);
            return staff;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addAllStaffs(staffs) {
        console.log(staffs);
        try {
            const newStaffs = [];
            for (let i = 0; i < staffs.length; i++) {
                const newStaff = await this.addSingleStaff(staffs[i]);
                newStaffs.push(newStaff);
            }
            return newStaffs;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateStaffById(id, staff) {
        try {
            const abandonedStaff = await this.repo.findOne(id);
            await this.repo.update(id, staff);
            return abandonedStaff;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteStaffById(id) {
        try {
            const staff = await this.repo.findOne(id);
            const response = await this.repo.delete(id);
            if (response.raw[1]) {
                return staff;
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
exports.default = StaffDao;
//# sourceMappingURL=StaffDao.js.map