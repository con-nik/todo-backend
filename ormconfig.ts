import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

export const config: PostgresConnectionOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'elefant',
    port: 5432,
    host: '127.0.0.1',
    database: 'todo_db',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
}