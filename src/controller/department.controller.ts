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
import DepartmentService from "../service/department.service";
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import createResponse from "../utils/createresponse.format";
import { Role } from "../utils/role.enum";

class DepartmentController{
    public router:express.Router;
    //private employeeService:EmployeeService;

    constructor(private departmentService:DepartmentService)
    {
        this.router=express.Router();
        //this.employeeService=new EmployeeService();

        this.router.get("/",authenticate,this.getAllDepartments);
        this.router.get("/:id",authenticate,this.getDepartmentById);
        this.router.post("/",authenticate,authorize(Role.ADMIN),this.createDepartment);
        this.router.put("/:id",authenticate,authorize(Role.ADMIN),this.updateDepartment);
        this.router.delete("/:id",authenticate,authorize(Role.ADMIN),this.deleteDepartment);
        
    }

    getAllDepartments= async(req: express.Request,res: express.Response,next:NextFunction) => {

        try{
        const departments=await this.departmentService.getAllDepartments();
        res.status(200).send(createResponse(departments,null,"OK"));
        }
        catch(err)
        {
            next(err);
        }
    }

    getDepartmentById = async(req:express.Request,res:express.Response,next:NextFunction) => {
        const departmentId=Number(req.params.id);

        try{
        const department=await this.departmentService.getDepartmentById(departmentId);
        res.status(200).send(createResponse(department,null,"OK"));
        }
        catch(err)
        {
            next(err);
        }

    }

    createDepartment= async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
        const createDepartmentDto=plainToInstance(CreateDepartmentDto,req.body);
        const errors=await validate(createDepartmentDto);

        if(errors.length>0)
        {
            //console.log(errors);
            throw new ValidationException(400,"Validation Error",errors);
        }


        const savedDepartment=await this.departmentService.createDepartment(createDepartmentDto);
        res.status(201).send(createResponse(savedDepartment,null,"Created"));
        }
        catch(err)
        {
            next(err);
        }
    }

    updateDepartment=async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
            const updateDepartmentDto=plainToInstance(UpdateDepartmentDto,req.body);
            const errors=await validate(updateDepartmentDto);

            if(errors.length>0)
            {
                console.log(errors);
                throw new ValidationException(404,"Validation Error",errors);
            }


            try{
            const departmentId=Number(req.params.id);
            const department=await this.departmentService.updateDepartment(departmentId,updateDepartmentDto);
            res.status(200).send(createResponse(department,null,"OK"));
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

    deleteDepartment=async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
        const departmentId=Number(req.params.id);
        await this.departmentService.deleteDepartment(departmentId);
        res.status(204).send(createResponse(null,null,"NoContent"));
        }
        catch(err)
        {
            next(err);
        }
    }

}

export default DepartmentController;