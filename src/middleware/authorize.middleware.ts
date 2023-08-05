import { NextFunction, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";


const authorize=(role:string) => 
{
    return (req:RequestWithUser,res:Response,next:NextFunction) => {
        try{
            if(role!==req.role)
            {
                throw new HttpException(403,'Forbidden access');
            }
            next();
    
        }catch(err)
        {
            next(err);
        }
    }
}

/*const authorize=async(req:RequestWithUser,res:Response,next:NextFunction)=>
{
    try{
        if(Role.ADMIN!==req.role)
        {
            throw new HttpException(403,'Forbidden access');
        }
        next();

    }catch(err)
    {
        next(err);
    }
}
*/
export default authorize;


