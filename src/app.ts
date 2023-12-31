import * as dotenv from "dotenv";
dotenv.config({path:__dirname+'/.env'});

import express, { NextFunction, Request, Response } from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import "reflect-metadata";
import dataSource from "./db/postgres.db";
import {employeeRoute} from "./route/employee.route";
import errorMiddleware from "./middleware/error.middleware";
import departmentRoute from "./route/department.route";
import rolesRouter from "./route/roles.route";

const server=express();

server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees',employeeRoute);
server.use('/department',departmentRoute);
server.use('/roles',rolesRouter);



server.get('/',(req,res) => {
    console.log(req.url);
    res.status(200).send("Hello world typescript");
});


server.use(errorMiddleware);


(async() => {
    await dataSource.initialize();
    server.listen(3000,()=> {
        console.log("Server is listening to 3000");
    });
})();
