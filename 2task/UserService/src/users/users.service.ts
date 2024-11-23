import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    async updateUsersWithProblems() {
        try {
            const usersWithProblemsCount = await this.userRepository.countBy({ hasProblems: true })
            await this.userRepository.update({ hasProblems: true }, { hasProblems: false })
            return usersWithProblemsCount;
        } catch (error) {
            throw new HttpException("Error: "+error, HttpStatus.NOT_FOUND);
        }
    }
}
