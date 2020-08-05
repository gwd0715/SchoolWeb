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
exports.Staff = void 0;
const typeorm_1 = require("typeorm");
let Staff = class Staff {
    getId() {
        return this.id;
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
], Staff.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: false }),
    __metadata("design:type", Boolean)
], Staff.prototype, "isLeader", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "introduction", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "believeQuote", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "selfie", void 0);
Staff = __decorate([
    typeorm_1.Entity()
], Staff);
exports.Staff = Staff;
exports.default = Staff;
//# sourceMappingURL=Staff.js.map