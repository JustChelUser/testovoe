"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers174 = void 0;
const users_entity_1 = require("../../src/users/users.entity");
class CreateUsers174 {
    constructor() {
        this.name = 'CreateUsers1742309320782';
    }
    async up(queryRunner) {
        const packetSize = 10000;
        const users = [];
        for (let i = 0; i < 1000000; i++) {
            const name = `Имя ${i}`;
            const surname = `Фамилия ${i}`;
            const age = Math.floor(Math.random() * 100);
            const sex = Math.random() > 0.5 ? 'М' : 'Ж';
            const hasProblems = Math.random() > 0.5;
            const user = new users_entity_1.User();
            user.name = name;
            user.surname = surname;
            user.age = age;
            user.sex = sex;
            user.hasProblems = hasProblems;
            users.push(user);
            if (users.length === packetSize) {
                await queryRunner.manager.save(users);
                users.length = 0;
            }
        }
        if (users.length > 0) {
            await queryRunner.manager.save(users);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "user"`);
    }
}
exports.CreateUsers174 = CreateUsers174;
//# sourceMappingURL=1742309320782-add-users.js.map