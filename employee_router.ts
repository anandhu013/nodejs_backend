import express from "express";
import Employee from "./Employee";
import dataSource from "./dataSource";
import { Repository } from "typeorm";


const employees: Employee[] = [
    {
        id: 1,
        name: "Name1",
        email: "email1@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: "Name2",
        email: "email2@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const employeeRouter = express.Router();
let count: number = 0;

employeeRouter.get('/', async (req, res) => {
    console.log(req.url);
    const employeeRepository= dataSource.getRepository(Employee);
    const employees = await employeeRepository.find();
    res.status(200).send(employees);
})

employeeRouter.post('/', async(req, res) => {
    console.log(req.url);
    const newEmployee = new Employee();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    const employeeRepository=dataSource.getRepository(Employee);
    const savedEmployee=await employeeRepository.save(newEmployee);

    res.status(201).send(savedEmployee);
})

employeeRouter.get('/:id', async (req, res) => {

    console.log(req.url);


    const employeeRepository= dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({ "id": Number(req.params.id) })
    res.status(200).send(employee);
})


employeeRouter.put('/:id', async (req, res) => {
    console.log(req.url);
    
    const employeeRepository= dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({ "id": Number(req.params.id) })
    employee.name=req.body.name;
    employee.email=req.body.email;
    employee.updatedAt = new Date();

    const updatedemp=await employeeRepository.save(employee);

    res.status(200).send(updatedemp);
})

employeeRouter.patch('/:id', (req, res) => {
    console.log(req.url);
    res.status(200).send("Employee updated");
})

employeeRouter.delete('/:id', async (req, res) => {
    console.log(req.url);
    const employeeRepository= dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({ "id": Number(req.params.id) })
    await employeeRepository.remove(employee);

    res.status(204).send("Deleted successfully");
})

export default employeeRouter;