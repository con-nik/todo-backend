import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Task } from '../models/task.dto';
import { TaskEntity } from '../models/task.entity';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(): Promise<TaskEntity[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: number,
    @Body() task: Task,
  ): Promise<UpdateResult> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<TaskEntity> {
    return this.taskService.deleteTask(id);
  }
}
