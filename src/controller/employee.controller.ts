import express, { NextFunction, Request, Response } from "express"
import EmployeeService from "../service/employee.service";
import Employee from "../entity/Employee.entity";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import PatchEmployeeDto from "../dto/patch-employee.dto";
import createResponse from "../utils/createresponse.format";
import logger from "../utils/winston";

class EmployeeController{
    public router:express.Router;
    //private employeeService:EmployeeService;

    constructor(private employeeService:EmployeeService)
    {
        this.router=express.Router();
        //this.employeeService=new EmployeeService();

        this.router.get("/",authenticate,this.getAllEmployees);
        this.router.get("/:id",authenticate,this.getEmployeesById);
        this.router.post("/",authenticate,authorize(Role.ADMIN),this.createEmployee);
        this.router.put("/:id",authenticate,authorize(Role.ADMIN),this.updateEmployee);
        this.router.delete("/:id",authenticate,authorize(Role.ADMIN),this.deleteEmployee);
        this.router.post("/login",this.loginEmployee);
        this.router.patch("/:id",authenticate,authorize(Role.ADMIN),this.patchEmployee);
    }

    getAllEmployees= async(req: express.Request,res: express.Response,next:NextFunction) => {

        try{
            //const page=req.query.page;
            //const offset=req.query.offset;
            const employees=await this.employeeService.getAllEmployees();
            res.status(200).send(createResponse(employees,null,"OK"));
            logger.info(`Status : 200 \n ${employees}`);
        }
        catch(err)
        {
            next(err);
        }
    }

    getEmployeesById = async(req:express.Request,res:express.Response,next:NextFunction) => {
        const employeeId=req.params.id;

        try{
        const employee=await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(createResponse(employee,null,"OK"));
        logger.info(`Status : 200 \n ${employee}`);
        }
        catch(err)
        {
            next(err);
        }

    }

    createEmployee= async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
        const createEmployeeDto=plainToInstance(CreateEmployeeDto,req.body);
        const errors=await validate(createEmployeeDto);

        if(errors.length>0)
        {
            //console.log(errors);
            throw new ValidationException(400,"Validation Error",errors);
        }


        const savedEmployee=await this.employeeService.createAnEmployee(createEmployeeDto);
        res.status(201).send(createResponse(savedEmployee,null,"OK"));
        logger.info(`Status : 201 \n ${savedEmployee}`);
        }
        catch(err)
        {
            next(err);
        }
    }

    updateEmployee=async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
            const updateEmployeeDto=plainToInstance(UpdateEmployeeDto,req.body);
            const errors=await validate(updateEmployeeDto);

            if(errors.length>0)
            {
                console.log(errors);
                throw new ValidationException(404,"Validation Error",errors);
            }


            try{
            const employeeId=req.params.id;
            const employee=await this.employeeService.updateAnEmployee(employeeId,updateEmployeeDto);
            res.status(200).send(createResponse(employee,null,"OK"));
            logger.info(`Status : 200 \n ${employee}`);
            }
            catch(err)
            {
                next(err);
            }
        }catch(err)
        {
            next(err);
        }
    }


    patchEmployee=async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
            const patchEmployeeDto=plainToInstance(PatchEmployeeDto,req.body);
            const errors=await validate(patchEmployeeDto);

            if(errors.length>0)
            {
                console.log(errors);
                throw new ValidationException(404,"Validation Error",errors);
            }


            try{
            const employeeId=req.params.id;
            const employee=await this.employeeService.patchAnEmployee(employeeId,patchEmployeeDto);
            res.status(200).send(createResponse(employee,null,"OK"));
            logger.info(`Status : 200 \n ${employee}`);
            }
            catch(err)
            {
                next(err);
            }
        }catch(err)
        {
            next(err);
        }
    }


    deleteEmployee=async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
        const employeeId=req.params.id;
        await this.employeeService.deleteEmployee(employeeId);
        res.status(204).send(createResponse([],"deletion successfull","No COntent"));
        logger.info(`Status : 204 \n Deleted successfully`);
        }
        catch(err)
        {
            next(err);
        }
    }

    loginEmployee=async(req:Request,res:Response,next:NextFunction)=>
    {
        const {username,password}=req.body;
        try{
            const token=await this.employeeService.loginEmployee(username,password);
            res.status(200).send(createResponse(token,null,"OK"));
            logger.info(`Status : 200 \n Token : ${token}`);
        }
        catch(err)
        {
            next(err);
        }
    }
}

export default EmployeeController;