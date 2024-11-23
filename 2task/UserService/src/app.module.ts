import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { config } from "dotenv"
import { dataSourceOptions } from '../db/data-source';

config()
@Module({
  imports: [
   TypeOrmModule.forRoot(dataSourceOptions),
   UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
