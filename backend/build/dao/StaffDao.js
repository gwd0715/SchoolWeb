"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Staff_1 = require("../entity/Staff");
class StaffDao {
    constructor() {
        this.repo = typeorm_1.getRepository(Staff_1.default);
    }
    async getAllStaff() {
        try {
            const staffs = await this.repo.find();
            if (staffs) {
                staffs.sort((a, b) => a['id'] - b['id']);
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
            if (staff['selfie'] === '') {
                staff['selfie'] = abandonedStaff['selfie'];
            }
            await this.repo.update(id, staff);
            return abandonedStaff;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteStaffById(ids) {
        try {
            const deletedStaff = [];
            await typeorm_1.getManager().transaction(async (transactionalEntityManager) => {
                for (let i = 0; i < ids.length; i++) {
                    const staff = await transactionalEntityManager.findOne(Staff_1.default, ids[i]);
                    deletedStaff.push({ ...staff });
                    const removedEntity = await transactionalEntityManager.remove(staff);
                    if (!removedEntity) {
                        throw new Error('failed in Staff deletion');
                    }
                }
            });
            return deletedStaff;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = StaffDao;
//# sourceMappingURL=StaffDao.js.map