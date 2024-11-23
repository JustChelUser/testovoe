import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @ApiOperation({ summary: 'Количество пользователей с проблемами' })
    @ApiResponse({ status: 200 })
    @Get()
    async updateUsersWithProblems() {
        return await this.userService.updateUsersWithProblems()
    }
}
