import Employee from "../entity/Employee.entity";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{

    constructor(private employeeRepository:EmployeeRepository)
    {
        
    }

    async getAllEmployees() : Promise<Employee[]>
    {
        const employees=this.employeeRepository.findAllEmployees();

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

    createAnEmployee(name:string,email:string,address:any):Promise<Employee>
    {
        const newEmployee = new Employee();
        newEmployee.email = email;
        newEmployee.name = name;

        const newAddress=new Address();
        newAddress.line1=address.line1;
        newAddress.pincode=address.pincode;

        newEmployee.address=newAddress;


        return this.employeeRepository.createAnEmployee(newEmployee);
    }

    async updateAnEmployee(id:number,name:string,email:string,address:any):Promise<Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        employee.name=name;
        employee.email=email;
        employee.address.line1=address.line1;
        employee.address.pincode=address.pincode;
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


}

export default EmployeeService;