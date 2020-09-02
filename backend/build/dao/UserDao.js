"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const console = require("console");
class UserDao {
    constructor() {
        this.repo = typeorm_1.getRepository(User_1.default);
    }
    async getAllUser() {
        try {
            const users = await this.repo.find();
            if (users) {
                users.sort((a, b) => a.username.localeCompare(b.username));
                return users;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserByUsername(usename) {
        try {
            const user = await this.repo.findOne(usename);
            if (user) {
                return user;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addSingleUser(user) {
        try {
            await this.repo.save(user);
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async addAllUsers(users) {
        console.log(users);
        try {
            const newUsers = [];
            for (let i = 0; i < users.length; i++) {
                const newUser = await this.addSingleUser(users[i]);
                newUsers.push(newUser);
            }
            return newUsers;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserByUsername(user) {
        try {
            const abandonedUser = await this.repo.findOne(user.username);
            await this.repo.update(user.username, user);
            return abandonedUser;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteUserByUsername(usernames) {
        try {
            const deletedUser = [];
            await typeorm_1.getManager().transaction(async (transactionalEntityManager) => {
                for (let i = 0; i < usernames.length; i++) {
                    const user = await transactionalEntityManager.findOne(User_1.default, usernames[i]);
                    deletedUser.push({ ...user });
                    const removedEntity = await transactionalEntityManager.remove(user);
                    if (!removedEntity) {
                        throw new Error('failed in User deletion');
                    }
                }
            });
            return deletedUser;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = UserDao;
//# sourceMappingURL=UserDao.js.map