import express from "express"
import EmployeeService from "../service/employee.service";
import Employee from "../entity/Employee.entity";
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

    getAllEmployees= async(req: express.Request,res: express.Response) => {
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    getEmployeesById = async(req:express.Request,res:express.Response) => {
        const employeeId=Number(req.params.id);
        const employees=await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employees);
    }

    createEmployee= async(req:express.Request,res:express.Response) => {
        const savedEmployee=await this.employeeService.createAnEmployee(req.body.name,req.body.email);
        res.status(201).send(savedEmployee);
    }

    updateEmployee=async(req:express.Request,res:express.Response) => {
        const employeeId=Number(req.params.id);
        const employee=await this.employeeService.updateAnEmployee(employeeId,req.body.name,req.body.email);
        res.status(200).send(employee);
    }

    deleteEmployee=async(req:express.Request,res:express.Response) => {
        const employeeId=Number(req.params.id);
        await this.employeeService.deleteEmployee(employeeId);
        res.status(204).send("deletion successfull");
    }
}

export default EmployeeController;