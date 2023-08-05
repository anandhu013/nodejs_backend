import { Role } from "../utils/role.enum";
import express, { Request, Response } from "express"

const roles=Object.values(Role);
const rolesRouter=express.Router();

rolesRouter.get('/',(req:Request,res:Response) => {
    res.status(200).send(roles);
});

export default rolesRouter;