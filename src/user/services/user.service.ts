import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.dto';
import { Task } from 'src/task/models/task.dto';
import { TaskEntity } from 'src/task/models/task.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find({ relations: ['tasks'] });
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: id },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  createUser(user: User): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  updateUser(id: number, user: User): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<UserEntity> {
    const user = await this.getUserById(id);
    return this.usersRepository.remove(user);
  }

  //-------------Task--------------

  async getUserTask(id: number): Promise<any> {
    const user = await this.usersRepository.find({
      relations: ['tasks'],
      where: { id: id },
    });

    if (!user) {
      throw new HttpException(
        'User not found. Cannot get Task',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async createUserTask(id: number, task: Task): Promise<TaskEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create Task',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTask = this.taskRepository.create({ ...task, user });
    return this.taskRepository.save(newTask);
  }
}
