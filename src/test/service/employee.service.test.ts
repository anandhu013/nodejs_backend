import * as dotenv from "dotenv";
dotenv.config({path:__dirname+'/../../../.env'});

import { when } from "jest-when";
import Employee from "../../entity/Employee.entity";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { DataSource } from "typeorm";
import CreateEmployeeDto from "../../dto/create-employee.dto";
import { plainToInstance } from "class-transformer";
import UpdateEmployeeDto from "../../dto/update-employee.dto";
import PatchEmployeeDto from "../../dto/patch-employee.dto";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";




describe("Employee Service test" , ()=>{

    let employeeService:EmployeeService;
    let employeeRepository:EmployeeRepository;
    beforeAll(()=>{
        const dataSource:DataSource={
            getRepository:jest.fn()
        } as unknown as DataSource;


        employeeRepository=new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService=new EmployeeService(employeeRepository);
        process.env.JWT_TOKEN="ABCDE";
    });

    describe('Test for getEmployeeId',()=> {


        test('test employee for id edf203d2-fef6-4069-b737-5f88ad0c941e',async()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith("edf203d2-fef6-4069-b737-5f88ad0c941e").mockResolvedValueOnce({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alv",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            });
            employeeRepository.findAnEmployeeById=mockFunction;
            const employee=await employeeService.getEmployeeById('edf203d2-fef6-4069-b737-5f88ad0c941e');
            expect(employee).toStrictEqual({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alv",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            });
        });


        test('Employee which is not present' , ()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeById=mockFunction;

            expect(async()=> {await employeeService.getEmployeeById('edf203d2-fef6-4069-b737-5f88ad0c541e')}).rejects.toThrowError();
        })
    });




    describe('Test for createEmployee',()=> {


        test('test Department for id ',async()=>{
            const mockFunction1=jest.fn();
            const mockFunction2=jest.fn();
            when(mockFunction1).calledWith({
                "name":"William",
                "username":"wil",
                "password":"$2a$10$fGN.hf2xPx/XOafCiejuOuKYO3FrprEbw2Q6uAL4XKrT8eltN1.KK",
                "experience":2,
                "joiningDate":"19/11/2021",
                "address":{
                    "addressLine1":"LotusFlat",
                    "addressLine2":"Overbridge",
                    "city":"Kochi",
                    "state":"Kerala",
                    "country":"India",
                    "pincode":"678565"
                },
                "role":"user",
                "departmentId":5,
                "isActive":true
            }).mockResolvedValueOnce({
                "name":"William",
                "username":"wil",
                "password":"$2a$10$fGN.hf2xPx/XOafCiejuOuKYO3FrprEbw2Q6uAL4XKrT8eltN1.KK",
                "experience":2,
                "joiningDate":"19/11/2021",
                "address":{
                    "addressLine1":"LotusFlat",
                    "addressLine2":"Overbridge",
                    "city":"Kochi",
                    "state":"Kerala",
                    "country":"India",
                    "pincode":"678565"
                },
                "role":"user",
                "departmentId":5,
                "isActive":true
            });

            when(mockFunction2).calledWith("william123",10).mockResolvedValueOnce("$2a$10$fGN.hf2xPx/XOafCiejuOuKYO3FrprEbw2Q6uAL4XKrT8eltN1.KK");

            employeeRepository.createAnEmployee=mockFunction1;
            bcrypt.hash=mockFunction2;
            const createEmployeeDto=plainToInstance(CreateEmployeeDto,{
                "name":"William",
                "username":"wil",
                "password":"william123",
                "experience":2,
                "joiningDate":"19/11/2021",
                "address":{
                    "addressLine1":"LotusFlat",
                    "addressLine2":"Overbridge",
                    "city":"Kochi",
                    "state":"Kerala",
                    "country":"India",
                    "pincode":"678565"
                },
                "role":"user",
                "departmentId":5
            })
            const employee=await employeeService.createAnEmployee(createEmployeeDto);
            expect(employee).toStrictEqual({
                "name":"William",
                "username":"wil",
                "password":"$2a$10$fGN.hf2xPx/XOafCiejuOuKYO3FrprEbw2Q6uAL4XKrT8eltN1.KK",
                "experience":2,
                "joiningDate":"19/11/2021",
                "address":{
                    "addressLine1":"LotusFlat",
                    "addressLine2":"Overbridge",
                    "city":"Kochi",
                    "state":"Kerala",
                    "country":"India",
                    "pincode":"678565"
                },
                "role":"user",
                "departmentId":5,
                "isActive":true
            });
        });
    });


    describe('Test for updateEmployee',()=> {


        test('test employee for id edf203d2-fef6-4069-b737-5f88ad0c941e',async()=>{
            const mockFunction1=jest.fn();
            const mockFunction2=jest.fn();
            when(mockFunction1).calledWith("edf203d2-fef6-4069-b737-5f88ad0c941e").mockResolvedValueOnce({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alv",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            });

            when(mockFunction2).calledWith({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alvi",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            }).mockResolvedValueOnce({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alvi",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            })

            employeeRepository.findAnEmployeeById=mockFunction1;
            employeeRepository.updateAnEmployee=mockFunction2;
            const employee=plainToInstance(UpdateEmployeeDto,{
                "name": "Alvin",
                "username": "alvi",
                "joiningDate": "12/6/2019",
                "experience": 5,
                "role": "admin",
                "address": {
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            });
            const employee1=await employeeService.updateAnEmployee("edf203d2-fef6-4069-b737-5f88ad0c941e",employee);
            expect(employee1).toStrictEqual({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alvi",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            });
        });

    });



    describe('Test for patchEmployee',()=> {


        test('test employee for id edf203d2-fef6-4069-b737-5f88ad0c941e',async()=>{
            const mockFunction1=jest.fn();
            const mockFunction2=jest.fn();
            when(mockFunction1).calledWith("edf203d2-fef6-4069-b737-5f88ad0c941e").mockResolvedValueOnce({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alv",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            });

            when(mockFunction2).calledWith({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alvi",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            }).mockResolvedValueOnce({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alvi",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            })

            employeeRepository.findAnEmployeeById=mockFunction1;
            employeeRepository.updateAnEmployee=mockFunction2;
            const employee=plainToInstance(PatchEmployeeDto,{
                "username": "alvi"
            });
            const employee1=await employeeService.patchAnEmployee("edf203d2-fef6-4069-b737-5f88ad0c941e",employee);
            expect(employee1).toStrictEqual({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "createAt": "2023-08-05T17:48:25.854Z",
                "updatedAt": "2023-08-05T17:48:25.854Z",
                "deletedAt": null,
                "name": "Alvin",
                "username": "alvi",
                "joiningDate": "12/6/2019",
                "isActive": true,
                "experience": 5,
                "password": "$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "role": "admin",
                "address": {
                    "id": "6522074c-64e0-4fc1-a7c2-e939921fa24f",
                    "createAt": "2023-08-05T17:49:22.494Z",
                    "updatedAt": "2023-08-05T17:49:22.494Z",
                    "deletedAt": null,
                    "addressLine1": "PRA321",
                    "addressLine2": "MKKNagar",
                    "pincode": "682444",
                    "city": "Ernakulam",
                    "state": "Kerala",
                    "country": "India"
                }
            });
        });

    });



    describe('Test for deleteEmployee',()=> {


        test('test Department for id edf203d2-fef6-4069-b737-5f88ad0c941e',async()=>{
            const mockFunction1=jest.fn();
            const mockFunction2=jest.fn();
            when(mockFunction1).calledWith("edf203d2-fef6-4069-b737-5f88ad0c941e").mockResolvedValueOnce({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "name": "Alvin"
            });

            when(mockFunction2).calledWith({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "name": "Alvin"
            }).mockResolvedValueOnce(null);

            
            employeeRepository.findAnEmployeeById=mockFunction1;
            employeeRepository.deleteEmployee=mockFunction2;
            const employee=await employeeService.deleteEmployee("edf203d2-fef6-4069-b737-5f88ad0c941e");
            expect(employee).toStrictEqual(null);
        });
    });


    describe('Test for LoginEmployee',()=> {


        test('test Department for username alv',async()=>{
            const mockFunction1=jest.fn();
            const mockFunction2=jest.fn();
            when(mockFunction1).calledWith("alv").mockResolvedValueOnce({
                "name": "Alvin",
                "password":"$2a$10$fe2Js/.03z848VRCyncN7.4CoGdUGsTzlk6r6.I45fVjy57gRLOyS",
                "username":"alv",
                "role":"admin"
            });


            const payload ={
                name:"Alvin",
                email:"alv",
                role:"admin"
            }

            console.log(__dirname);

            when(mockFunction2).calledWith(payload,process.env.JWT_TOKEN,{expiresIn:"1h"}).mockReturnValueOnce("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWx2aW4iLCJlbWFpbCI6ImFsdiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MTM5NjQ3NiwiZXhwIjoxNjkxNDAwMDc2fQ.WY8KK00Rvu0wzQmc-nPhWXuXimb2ijUfZQSTVaiXnZU");

            employeeRepository.findAnEmployeeByUsername=mockFunction1;
            jsonwebtoken.sign=mockFunction2;
            const employee=await employeeService.loginEmployee("alv","alvin123");
            console.log(employee);
            expect(employee).toStrictEqual({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWx2aW4iLCJlbWFpbCI6ImFsdiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MTM5NjQ3NiwiZXhwIjoxNjkxNDAwMDc2fQ.WY8KK00Rvu0wzQmc-nPhWXuXimb2ijUfZQSTVaiXnZU"});
        });
    });




    describe('Test for getEmployee',()=> {


        test('test employee for id ',async()=>{
            const mockFunction=jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "name": "Alvin",
                "username": "alv",
                "role": "admin",
            });
            employeeRepository.findAllEmployees=mockFunction;
            const employee=await employeeService.getAllEmployees();
            expect(employee).toStrictEqual({
                "id": "edf203d2-fef6-4069-b737-5f88ad0c941e",
                "name": "Alvin",
                "username": "alv",
                "role": "admin",
            });
        });
    });


})