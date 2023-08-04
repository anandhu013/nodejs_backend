import CreateEmployeeDto from "../dto/create-employee.dto";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import Employee from "../entity/Employee.entity";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"

class EmployeeService{

    constructor(private employeeRepository:EmployeeRepository)
    {
        
    }

    async getAllEmployees() : Promise<Employee[]>
    {
        const employees=await this.employeeRepository.findAllEmployees();

        if(!employees)
        {
            throw new HttpException(404,`Employees not found`);
        }

        return employees;
    }

    async getEmployeeById(id:number):Promise<Employee|null>
    {
        const employee= await this.employeeRepository.findAnEmployeeById(id);
        if(!employee)
        {
            throw new HttpException(404,`Employee not found with ${id}`);
        }

        return employee;
    }

    async createAnEmployee(createEmployeeDto:CreateEmployeeDto):Promise<Employee>
    {
        const newEmployee = new Employee();
        newEmployee.email = createEmployeeDto.email;
        newEmployee.name = createEmployeeDto.name;
        newEmployee.role=createEmployeeDto.role;
        newEmployee.password=await bcrypt.hash(createEmployeeDto.password,10);

        const newAddress=new Address();
        newAddress.line1=createEmployeeDto.address.line1;
        newAddress.pincode=createEmployeeDto.address.pincode;

        newEmployee.address=newAddress;


        return this.employeeRepository.createAnEmployee(newEmployee);
    }

    async updateAnEmployee(id:number,updateEmployeeDto:UpdateEmployeeDto):Promise<Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);

        if(!employee)
        {
            throw new HttpException(404,`Employee not found with ${id}`);
        }

        employee.name=updateEmployeeDto.name;
        employee.email=updateEmployeeDto.email;
        employee.address.line1=updateEmployeeDto.address.line1;
        employee.address.pincode=updateEmployeeDto.address.pincode;
        employee.updatedAt=new Date();
        return this.employeeRepository.updateAnEmployee(employee);
    }

    async deleteEmployee(id:number):Promise<Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);

        if(!employee)
        {
            throw new HttpException(404,`Employee not found with ${id}`);
        }
        return this.employeeRepository.deleteEmployee(employee);
    }

    loginEmployee = async(email:string,password:string) =>{
        const employee=await this.employeeRepository.findAnEmployeeByEmail(email);
        if(!employee)
        {
            throw new HttpException(401,`Not found employee with ${email}`);
        }

        const result=await bcrypt.compare(password,employee.password);

        if(!result)
        {
            throw new HttpException(401,"Incorrect password or email");
        }

        const payload ={
            name:employee.name,
            email:employee.email,
            role:employee.role
        }

        const token=jsonwebtoken.sign(payload,process.env.JWT_TOKEN,{
            expiresIn:"1h"
        });

        return {token:token};
    }


}

export default EmployeeService;