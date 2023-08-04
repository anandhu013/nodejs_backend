
import HttpException from "../exception/http.exception";
import express, { NextFunction, Request, Response } from "express"
import ValidationException from "../exception/validation.exception";

const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction) => {
    try{
        console.error(error.stack);
        if(error instanceof HttpException)
        {
            res.status(error.status).send({error:error.message});
            return;
        }
        else if(error instanceof ValidationException)
        {
            res.status(error.status).send({message:error.message,
            errors:error.validationErrors});
        }
        else
        {
        res.status(500).send(error.message);
        }
        }catch(err)
        {
            next(err);
        }
};

export default errorMiddleware;