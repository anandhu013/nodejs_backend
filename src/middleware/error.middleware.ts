
import HttpException from "../exception/http.exception";
import express, { NextFunction, Request, Response } from "express"
import ValidationException from "../exception/validation.exception";
import createResponse from "../utils/createresponse.format";
import logger from "../utils/winston";

const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction) => {
    try{
        console.error(error.stack);
        if(error instanceof HttpException)
        {
            res.status(error.status).send(createResponse([],error.message,"NOT FOUND"));
            logger.info(`Status : ${error.status} \n ${error.message}`);
            return;
        }
        else if(error instanceof ValidationException)
        {
            res.status(error.status).send(createResponse([],error.validationErrors,error.message));
            logger.info(`Status : ${error.status} \n ${error.validationErrors}`);
        }
        else
        {
        res.status(500).send(createResponse([],error.message,"Error"));
        logger.info(`Status : 500 \n ${error.message}`);
        }
        }catch(err)
        {
            next(err);
        }
};

export default errorMiddleware;