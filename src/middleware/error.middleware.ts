
import HttpException from "../exception/http.exception";
import express, { NextFunction, Request, Response } from "express"
import ValidationException from "../exception/validation.exception";
import createResponse from "../utils/createresponse.format";

const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction) => {
    try{
        console.error(error.stack);
        if(error instanceof HttpException)
        {
            res.status(error.status).send(createResponse([],error.message,"NOT FOUND"));
            return;
        }
        else if(error instanceof ValidationException)
        {
            res.status(error.status).send(createResponse([],error.validationErrors,error.message));
        }
        else
        {
        res.status(500).send(createResponse([],error.message,"Error"));
        }
        }catch(err)
        {
            next(err);
        }
};

export default errorMiddleware;