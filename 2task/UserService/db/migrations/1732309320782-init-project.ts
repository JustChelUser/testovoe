import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProject1732309320782 implements MigrationInterface {
    name = 'InitProject1732309320782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "age" integer NOT NULL, "sex" character varying NOT NULL, "hasProblems" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
