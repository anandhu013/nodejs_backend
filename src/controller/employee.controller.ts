import express, { NextFunction } from "express"
import EmployeeService from "../service/employee.service";
import Employee from "../entity/Employee.entity";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";

class EmployeeController{
    public router:express.Router;
    //private employeeService:EmployeeService;

    constructor(private employeeService:EmployeeService)
    {
        this.router=express.Router();
        //this.employeeService=new EmployeeService();

        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeesById);
        this.router.post("/",this.createEmployee);
        this.router.put("/:id",this.updateEmployee);
        this.router.delete("/:id",this.deleteEmployee);
    }

    getAllEmployees= async(req: express.Request,res: express.Response,next:NextFunction) => {

        try{
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
        }
        catch(err)
        {
            next(err);
        }
    }

    getEmployeesById = async(req:express.Request,res:express.Response,next:NextFunction) => {
        const employeeId=Number(req.params.id);

        try{
        const employee=await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employee);
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
            console.log(errors);
            throw new ValidationException(404,"Validation Error",errors);
        }


        const savedEmployee=await this.employeeService.createAnEmployee(req.body.name,req.body.email,req.body.address);
        res.status(201).send(savedEmployee);
        }
        catch(err)
        {
            next(err);
        }
    }

    updateEmployee=async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
            const createEmployeeDto=plainToInstance(CreateEmployeeDto,req.body);
            const errors=await validate(createEmployeeDto);

            if(errors.length>0)
            {
                console.log(errors);
                throw new ValidationException(404,"Validation Error",errors);
            }


            const employeeId=Number(req.params.id);
            const employee=await this.employeeService.updateAnEmployee(employeeId,req.body.name,req.body.email,req.body.address);
            res.status(200).send(employee);
        }catch(err)
        {
            next(err);
        }
    }

    deleteEmployee=async(req:express.Request,res:express.Response,next:NextFunction) => {

        try{
        const employeeId=Number(req.params.id);
        await this.employeeService.deleteEmployee(employeeId);
        res.status(204).send("deletion successfull");
        }
        catch(err)
        {
            next(err);
        }
    }
}

export default EmployeeController;