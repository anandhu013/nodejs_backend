import { DataSource, Repository } from "typeorm";
import Employee from "../entity/Employee.entity";
import dataSource from "../db/postgres.db";

class EmployeeRepository{
    private dataSource:DataSource;
    constructor(private employeeRepository:Repository<Employee>){
        this.dataSource=dataSource;
    }

    findAllEmployees():Promise<Employee[]>{
        //const employeeRepository= this.dataSource.getRepository(Employee);
        return this.employeeRepository.find();
    }


    findAnEmployeeById(id:number):Promise<Employee>{
        //const employeeRepository= this.dataSource.getRepository(Employee);
        return this.employeeRepository.findOneBy({
            id:id,
        });
    }

    createAnEmployee(employee:Employee):Promise<Employee>{
        return this.employeeRepository.save(employee);
    }

    updateAnEmployee(employee:Employee):Promise<Employee>{
        return this.employeeRepository.save(employee);
    }

    deleteEmployee(employee:Employee):Promise<Employee>{
        return this.employeeRepository.softRemove(employee);
    }

}


export default EmployeeRepository;