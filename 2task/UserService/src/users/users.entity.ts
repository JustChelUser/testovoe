import { ApiProperty } from "@nestjs/swagger";
import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty({example:1,description:'Уникальный идентификатор'})
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @ApiProperty({example:'Иван',description:'Имя'})
    @Column()
    name: string;

    @ApiProperty({example:'Иванов',description:'Фамилия'})
    @Column()
    surname: string;

    @ApiProperty({example:22,description:'Возраст'})
    @Column()
    age: number;

    @ApiProperty({example:'М',description:'Пол'})
    @Column()
    sex: string;

    @ApiProperty({example:false,description:'Флаг наличия проблемы'})
    @Column({ default: false }) 
    hasProblems: boolean;
  
}