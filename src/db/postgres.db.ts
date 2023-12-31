import * as dotenv from "dotenv";
dotenv.config({path:__dirname+'/../.env'});


import Employee from "../entity/Employee.entity";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Address from "../entity/address.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ["dist/entity/*.js"],
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    migrations:["dist/db/migrations/*.js"]
})

export default dataSource;