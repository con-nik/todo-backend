import { TaskEntity } from "src/task/models/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    username: string;

    @OneToMany(() => TaskEntity, task => task.user)
    tasks:TaskEntity[]
}