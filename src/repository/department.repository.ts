import { DataSource, Repository } from "typeorm";
import dataSource from "../db/postgres.db";
import Department from "../entity/department-entity";

class DepartmentRepository{
    private dataSource:DataSource;
    constructor(private departmentRepository:Repository<Department>){
        this.dataSource=dataSource;
    }

    findAllDepartments():Promise<Department[]>{
        //const employeeRepository= this.dataSource.getRepository(Employee);
        return this.departmentRepository.find();
    }


    findDepartmentById(id:number):Promise<Department>{
        //const employeeRepository= this.dataSource.getRepository(Employee);
        return this.departmentRepository.findOne({
            where:{id:id}
        });
    }


    createDepartment(department:Department):Promise<Department>{
        return this.departmentRepository.save(department);
    }

    updateDepartment(department:Department):Promise<Department>{
        return this.departmentRepository.save(department);
    }

    deleteDepartment(department:Department):Promise<Department>{
        return this.departmentRepository.softRemove(department);
    }

}


export default DepartmentRepository;