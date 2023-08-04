import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"
import {  RequestWithUser } from "../utils/requestWithUser";
import { jwtPayload } from "../utils/jwtPayload.type";

const authenticate= async(req:RequestWithUser,res:Response,next:NextFunction) => 
{
    try{
        const token=getTokenFromRequestHeader(req);
        const payload:jwtPayload=jsonwebtoken.verify(token,process.env.JWT_TOKEN) as jwtPayload;

        req.name=payload.name;
        req.email=payload.email;
        req.role=payload.role;
        next();
        
    }catch(err)
    {
        next(err);
    }
}

const getTokenFromRequestHeader= (req:Request) => 
{
    const bearerToken=req.header('Authorization');
    const token=bearerToken?bearerToken.replace("Bearer ",""):"";
    return token;
}

export default authenticate;