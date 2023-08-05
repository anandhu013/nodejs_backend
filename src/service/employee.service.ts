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

    async getEmployeeById(id:string):Promise<Employee|null>
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
        newEmployee.username = createEmployeeDto.username;
        newEmployee.name = createEmployeeDto.name;
        newEmployee.role=createEmployeeDto.role;
        newEmployee.password=await bcrypt.hash(createEmployeeDto.password,10);
        newEmployee.experience=createEmployeeDto.experience;
        newEmployee.isActive=true;
        newEmployee.joiningDate=createEmployeeDto.joiningDate;

        const newAddress=new Address();
        newAddress.addressLine1=createEmployeeDto.address.addressLine1;
        newAddress.addressLine2=createEmployeeDto.address.addressLine2;
        newAddress.city=createEmployeeDto.address.city;
        newAddress.state=createEmployeeDto.address.state;
        newAddress.country=createEmployeeDto.address.country;
        newAddress.pincode=createEmployeeDto.address.pincode;

        newEmployee.address=newAddress;


        return this.employeeRepository.createAnEmployee(newEmployee);
    }

    async updateAnEmployee(id:string,updateEmployeeDto:UpdateEmployeeDto):Promise<Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);

        if(!employee)
        {
            throw new HttpException(404,`Employee not found with ${id}`);
        }

        employee.name=updateEmployeeDto.name;
        employee.username=updateEmployeeDto.username;
        employee.joiningDate=updateEmployeeDto.joiningDate;
        employee.experience=updateEmployeeDto.experience;


        employee.address.addressLine1=updateEmployeeDto.address.addressLine1;
        employee.address.addressLine2=updateEmployeeDto.address.addressLine2;
        employee.address.pincode=updateEmployeeDto.address.pincode;
        employee.address.city=updateEmployeeDto.address.city;
        employee.address.state=updateEmployeeDto.address.state;
        employee.address.country=updateEmployeeDto.address.country;

        return this.employeeRepository.updateAnEmployee(employee);
    }

    async deleteEmployee(id:string):Promise<Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);

        if(!employee)
        {
            throw new HttpException(404,`Employee not found with ${id}`);
        }
        return this.employeeRepository.deleteEmployee(employee);
    }

    loginEmployee = async(username:string,password:string) =>{
        const employee=await this.employeeRepository.findAnEmployeeByUsername(username);
        if(!employee)
        {
            throw new HttpException(401,`Not found employee with ${username}`);
        }

        const result=await bcrypt.compare(password,employee.password);

        if(!result)
        {
            throw new HttpException(401,"Incorrect password or email");
        }

        const payload ={
            name:employee.name,
            email:employee.username,
            role:employee.role
        }

        const token=jsonwebtoken.sign(payload,"ABCDE",{
            expiresIn:"1h"
        });

        return {token:token};
    }


}

export default EmployeeService;