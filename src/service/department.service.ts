
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Department from "../entity/department-entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";


class DepartmentService{

    constructor(private departmentRepository:DepartmentRepository)
    {
        
    }

    async getAllDepartments() : Promise<Department[]>
    {
        const departments=await this.departmentRepository.findAllDepartments();

        if(!departments)
        {
            throw new HttpException(404,`Departments not found`);
        }

        return departments;
    }

    async getDepartmentById(id:number):Promise<Department|null>
    {
        const department= await this.departmentRepository.findDepartmentById(id);
        if(!department)
        {
            throw new HttpException(404,`Department not found with ${id}`);
        }

        return department;
    }

    async createDepartment(createDepartmentDto:CreateDepartmentDto):Promise<Department>
    {
        const newDepartment = new Department();
        newDepartment.name=createDepartmentDto.name;

        return this.departmentRepository.createDepartment(newDepartment);
    }

    async updateDepartment(id:number,updateDepartment:UpdateDepartmentDto):Promise<Department>
    {
        const department=await this.departmentRepository.findDepartmentById(id);

        if(!department)
        {
            throw new HttpException(404,`Department not found with ${id}`);
        }

        department.name=updateDepartment.name;

        return this.departmentRepository.updateDepartment(department);
    }

    async deleteDepartment(id:number):Promise<Department>
    {
        const department=await this.departmentRepository.findDepartmentById(id);

        if(!department)
        {
            throw new HttpException(404,`Department not found with ${id}`);
        }
        return this.departmentRepository.deleteDepartment(department);
    }


}

export default DepartmentService;