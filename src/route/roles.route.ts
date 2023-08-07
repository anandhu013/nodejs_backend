import { Role } from "../utils/role.enum";
import express, { Request, Response } from "express"
import createResponse from "../utils/createresponse.format";

const roles=Object.values(Role);
const rolesRouter=express.Router();

rolesRouter.get('/',(req:Request,res:Response) => {
    res.status(200).send(createResponse(roles,null,"OK") );
});

export default rolesRouter;