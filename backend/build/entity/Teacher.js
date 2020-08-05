"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
let Teacher = class Teacher {
    getTeacherId() {
        return this.teacherId;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    isIsLeader() {
        return this.isLeader;
    }
    setIsLeader(isLeader) {
        this.isLeader = isLeader;
    }
    getIntroduction() {
        return this.introduction;
    }
    setIntroduction(introduction) {
        this.introduction = introduction;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getPhone() {
        return this.phone;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    getBelieveQuote() {
        return this.believeQuote;
    }
    setBelieveQuote(believeQuote) {
        this.believeQuote = believeQuote;
    }
    getSelfie() {
        return this.selfie;
    }
    setSelfie(selfie) {
        this.selfie = selfie;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Teacher.prototype, "teacherId", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Teacher.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Teacher.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: false }),
    __metadata("design:type", Boolean)
], Teacher.prototype, "isLeader", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "introduction", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Teacher.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Teacher.prototype, "believeQuote", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Teacher.prototype, "selfie", void 0);
Teacher = __decorate([
    typeorm_1.Entity()
], Teacher);
exports.Teacher = Teacher;
exports.default = Teacher;
//# sourceMappingURL=Teacher.js.map