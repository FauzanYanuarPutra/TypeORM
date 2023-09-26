import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "TypeORM",
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.ts'],
    migrations: ['src/migration/*.ts'],
    subscribers: [],
})
