
import dataSource from "../db/postgres.db";
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Employee from "../entity/Employee.entity";
import Department from "../entity/department-entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "./employee.service";


class DepartmentService {

    constructor(private departmentRepository: DepartmentRepository, private employeeService: EmployeeService) {

    }

    async getAllDepartments(): Promise<Department[]> {
        const departments = await this.departmentRepository.findAllDepartments();

        if (!departments) {
            throw new HttpException(404, `Departments not found`);
        }

        return departments;
    }

    async getDepartmentById(id: number): Promise<Department | null> {
        const department = await this.departmentRepository.findDepartmentById(id);
        if (!department) {
            throw new HttpException(404, `Department not found with ${id}`);
        }

        return department;
    }

    async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const newDepartment = new Department();
        newDepartment.name = createDepartmentDto.name;

        return this.departmentRepository.createDepartment(newDepartment);
    }

    async updateDepartment(id: number, updateDepartment: UpdateDepartmentDto): Promise<Department> {
        const department = await this.departmentRepository.findDepartmentById(id);

        if (!department) {
            throw new HttpException(404, `Department not found with ${id}`);
        }

        department.name = updateDepartment.name;

        return this.departmentRepository.updateDepartment(department);
    }

    async deleteDepartment(id: number): Promise<Department> {
        const department = await this.departmentRepository.findDepartmentById(id);

        if (!department) {
            throw new HttpException(404, `Department not found with ${id}`);
        }

        const employee = await this.employeeService.findEmployeeByDepartmentId(id);

        if (employee) {
            throw new HttpException(404, `Department has employees ${id}`);
        }


        return this.departmentRepository.deleteDepartment(department);
    }


}

export default DepartmentService;