import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from 'src/task/services/task.service';
import { UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.dto';
import { UserService } from '../services/user.service';
import { Task } from 'src/task/models/task.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: User): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() user: User,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.deleteUser(id);
  }

  //---------TASK------------

  @Get(':id/task')
  getUserTask(@Param('id') id: number) {
    return this.userService.getUserTask(id);
  }

  @Post(':id/task')
  createUserTask(@Param('id') id: number, @Body() task: Task): Promise<any> {
    return this.userService.createUserTask(id, task);
  }
}
