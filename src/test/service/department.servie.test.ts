import Department from "../../entity/department-entity";
import DepartmentService from "../../service/department.service";
import DepartmentRepository from "../../repository/department.repository";


import { when } from "jest-when";
import Employee from "../../entity/Employee.entity";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { DataSource } from "typeorm";
import dataSource from "../../db/postgres.db";

describe("Department Service test" , ()=>{

    let departmentService:DepartmentService;
    let departmentRepository:DepartmentRepository;
    let employeeRepository;
    let employeeService;
    beforeAll(()=>{
        const dataSource:DataSource={
            getRepository:jest.fn()
        } as unknown as DataSource;


        departmentRepository=new DepartmentRepository(dataSource.getRepository(Department));
        employeeRepository=new EmployeeRepository(dataSource.getRepository(Employee))
        employeeService=new EmployeeService(employeeRepository);
        departmentService=new DepartmentService(departmentRepository, employeeService);
    });

    describe('Test for getDepartmentId',()=> {


        test('test Department for id 1',async()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({
                "id": 1,
                "name": "HR",
                "createAt": "2023-08-05T17:47:20.787Z",
                "updatedAt": "2023-08-05T17:47:20.787Z",
                "deletedAt": null
            });
            departmentRepository.findDepartmentById=mockFunction;
            const department=await departmentService.getDepartmentById(1);
            expect(department).toStrictEqual({
                "id": 1,
                "name": "HR",
                "createAt": "2023-08-05T17:47:20.787Z",
                "updatedAt": "2023-08-05T17:47:20.787Z",
                "deletedAt": null
            });
        });


        test('Department which is not present' , ()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith(10).mockResolvedValueOnce(null);
            departmentRepository.findDepartmentById=mockFunction;

            expect(async()=> {await departmentService.getDepartmentById(10)}).rejects.toThrowError();
        })
    });






    describe('Test for createDepartment',()=> {


        test('test Department for id 7',async()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith({"name":"Newdept"}).mockResolvedValueOnce({
                "id": 7,
                "name": "Newdept"
            });
            departmentRepository.createDepartment=mockFunction;
            const department=await departmentService.createDepartment({"name":"Newdept"});
            expect(department).toStrictEqual({
                "id": 7,
                "name": "Newdept"
            });
        });
    });


    describe('Test for updateDepartment',()=> {


        test('test Department for id 1',async()=>{
            const mockFunction1=jest.fn();
            const mockFunction2=jest.fn();
            when(mockFunction1).calledWith(1).mockResolvedValueOnce({
                "id": 1,
                "name": "HR"
            });

            when(mockFunction2).calledWith({
                "id": 1,
                "name": "HRDept"
            }).mockResolvedValueOnce({
                "id": 1,
                "name": "HRDept"
            });

            
            departmentRepository.findDepartmentById=mockFunction1;
            departmentRepository.updateDepartment=mockFunction2;
            const department=await departmentService.updateDepartment(1,{"name":"HRDept"});
            expect(department).toStrictEqual({
                "id": 1,
                "name": "HRDept"
            });
        });



        
    });



    describe('Test for deleteDepartment',()=> {


        test('test Department for id 1',async()=>{
            const mockFunction1=jest.fn();
            const mockFunction2=jest.fn();
            const mockFunction3=jest.fn();
            when(mockFunction1).calledWith(1).mockResolvedValueOnce({
                "id": 1,
                "name": "HR"
            });

            when(mockFunction2).calledWith({
                "id": 1,
                "name": "HR"
            }).mockResolvedValueOnce(null);

            when(mockFunction3).calledWith(1).mockResolvedValueOnce(null)

            
            departmentRepository.findDepartmentById=mockFunction1;
            departmentRepository.deleteDepartment=mockFunction2;

            
            
            
            employeeService.findEmployeeByDepartmentId=mockFunction3;


            const department=await departmentService.deleteDepartment(1);
            expect(department).toStrictEqual(null);
        });
    });



    describe('Test for getDepartment',()=> {


        test('test Department ',async()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce({
                "id": 1,
                "name": "HR",
            });
            departmentRepository.findAllDepartments=mockFunction;
            const department=await departmentService.getAllDepartments();
            expect(department).toStrictEqual({
                "id": 1,
                "name": "HR",
            });
        });
    });






})