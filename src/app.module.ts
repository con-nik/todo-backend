import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {config} from '../ormconfig';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),
    UserModule,
    TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
