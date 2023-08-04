import { when } from "jest-when";
import Employee from "../../entity/Employee.entity";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { DataSource } from "typeorm";

describe("Employee Service test" , ()=>{

    let employeeService:EmployeeService;
    let employeeRepository:EmployeeRepository;
    beforeAll(()=>{
        const dataSource:DataSource={
            getRepository:jest.fn()
        } as unknown as DataSource;


        employeeRepository=new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService=new EmployeeService(employeeRepository);
    });

    describe('Test for getEmployeeId',()=> {


        test('test employee for id 17',async()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith(17).mockResolvedValueOnce({
                "id": 17,
                "createAt": "2023-08-04T02:41:43.431Z",
                "updatedAt": "2023-08-04T02:41:43.431Z",
                "deletedAt": null,
                "name": "Jerry",
                "email": "Jerry@gmail.com",
                "age": null,
                "password": "$2b$10$b.DJ3xlRXmExI6mn/4YbgOSJKA.Qxq9Bx9qpxSqhf3H9VYr8kEwI.",
                "address": {
                    "id": 9,
                    "createAt": "2023-08-04T02:41:43.431Z",
                    "updatedAt": "2023-08-04T02:41:43.431Z",
                    "deletedAt": null,
                    "line1": "line1jerry",
                    "pincode": "Pincodejerry"
                }
            });
            employeeRepository.findAnEmployeeById=mockFunction;
            const employee=await employeeService.getEmployeeById(17);
            expect(employee).toStrictEqual({
                "id": 17,
                "createAt": "2023-08-04T02:41:43.431Z",
                "updatedAt": "2023-08-04T02:41:43.431Z",
                "deletedAt": null,
                "name": "Jerry",
                "email": "Jerry@gmail.com",
                "age": null,
                "password": "$2b$10$b.DJ3xlRXmExI6mn/4YbgOSJKA.Qxq9Bx9qpxSqhf3H9VYr8kEwI.",
                "address": {
                    "id": 9,
                    "createAt": "2023-08-04T02:41:43.431Z",
                    "updatedAt": "2023-08-04T02:41:43.431Z",
                    "deletedAt": null,
                    "line1": "line1jerry",
                    "pincode": "Pincodejerry"
                }
            });
        });


        test('Employee which is not present' , ()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeById=mockFunction;

            expect(async()=> {await employeeService.getEmployeeById(1)}).rejects.toThrowError();
        })
    });
})