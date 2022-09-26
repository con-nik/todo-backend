import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/models/task.entity';
import { TaskService } from 'src/task/services/task.service';
import { TaskModule } from 'src/task/task.module';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TaskEntity]), TaskModule],
  providers: [UserService, TaskService],
  controllers: [UserController],
})
export class UserModule {}
