import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from '../models/task.entity';
import { Task } from '../models/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  getAllTasks(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    try {
      const user = await this.tasksRepository.findOneOrFail({
        where: { id: id },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  createTask(task: Task): Promise<TaskEntity> {
    return this.tasksRepository.save(task);
  }

  updateTask(id: number, task: Task): Promise<UpdateResult> {
    return this.tasksRepository.update(id, task);
  }

  async deleteTask(id: number): Promise<TaskEntity> {
    const user = await this.getTaskById(id);
    return this.tasksRepository.remove(user);
  }
}
