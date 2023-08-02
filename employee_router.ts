import express from "express";
import Employee from "./Employee";
import dataSource from "./dataSource";
import { FindOptionsWhere, Like, Repository } from "typeorm";



const employeeRouter = express.Router();
//let count: number = 0;

employeeRouter.get('/', async (req, res) => {
    console.log(req.url);
    const nameFilter=req.query.name;
    const emailFilter=req.query.email;
    const employeeRepository= dataSource.getRepository(Employee);
    
    /*
    const filters : FindOptionsWhere<Employee> ={};

    if(nameFilter)
    {
        filters.name=Like(`${nameFilter}%`);
    }
    */

    const qb=employeeRepository.createQueryBuilder();

    if(nameFilter)
        qb.andWhere("name LIKE :name",{name:`${nameFilter}%`});

    if(emailFilter)
        qb.andWhere("email LIKE :email",{email:`%${emailFilter}%`})

    const employees = await qb.getMany();
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

    if(employee)
        res.status(200).send(employee);
    else
        res.status(404).send();
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
    await employeeRepository.softRemove(employee);

    res.status(204).send("Deleted successfully");
})

export default employeeRouter;