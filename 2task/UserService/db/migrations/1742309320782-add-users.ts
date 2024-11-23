import { User } from 'src/users/users.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers174 implements MigrationInterface {
    name = 'CreateUsers1742309320782'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const packetSize = 10000;
        const users: User[] = [];
        for (let i = 0; i < 1000000; i++) {
            const name = `Имя ${i}`;
            const surname = `Фамилия ${i}`;
            const age = Math.floor(Math.random() * 100);
            const sex = Math.random() > 0.5 ? 'М' : 'Ж';
            const hasProblems = Math.random() > 0.5;
            const user = new User();
            user.name = name;
            user.surname = surname;
            user.age = age;
            user.sex = sex;
            user.hasProblems = hasProblems;
            users.push(user)
            if (users.length === packetSize) {
                await queryRunner.manager.save(users)
                users.length = 0;
            }
        }
        if (users.length > 0) {
            await queryRunner.manager.save(users)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user"`);
    }
}
