import { NextFunction, Request, Response } from "express"

import logger from "../utils/winston";

const loggerMiddleware =(req:Request,res:Response,next:NextFunction) => {
    //console.log(`${new Date()} : ${req.url}"${req.method}`);
    logger.info(`Request on ${new Date()} : to ${req.url}"    ${req.method}`)
    next();
}

export default loggerMiddleware;