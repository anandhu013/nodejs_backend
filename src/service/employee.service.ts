import Employee from "../entity/Employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{

    constructor(private employeeRepository:EmployeeRepository)
    {
        
    }

    getAllEmployees() : Promise<Employee[]>
    {
        return this.employeeRepository.findAllEmployees();
    }

    getEmployeeById(id:number):Promise<Employee|null>
    {
        return this.employeeRepository.findAnEmployeeById(id);
    }

    createAnEmployee(name:string,email:string):Promise<Employee>
    {
        const newEmployee = new Employee();
        newEmployee.email = name;
        newEmployee.name = email;
        return this.employeeRepository.createAnEmployee(newEmployee);
    }

    async updateAnEmployee(id:number,name:string,email:string):Promise<Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        employee.name=name;
        employee.email=email;
        employee.updatedAt=new Date();
        return this.employeeRepository.updateAnEmployee(employee);
    }

    async deleteEmployee(id:number):Promise<Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        return this.employeeRepository.deleteEmployee(employee);
    }


}

export default EmployeeService;