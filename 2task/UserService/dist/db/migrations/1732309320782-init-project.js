"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitProject1732309320782 = void 0;
class InitProject1732309320782 {
    constructor() {
        this.name = 'InitProject1732309320782';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "age" integer NOT NULL, "sex" character varying NOT NULL, "hasProblems" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.InitProject1732309320782 = InitProject1732309320782;
//# sourceMappingURL=1732309320782-init-project.js.map