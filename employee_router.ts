import express from "express";
import Employee from "./Employee";


const employees:Employee[]=[
    {
        id:1,
        name:"Name1",
        email:"email1@gmail.com",
        createdAt:new Date(),
        updatedAt:new Date()
    },
    {
        id:2,
        name:"Name2",
        email:"email2@gmail.com",
        createdAt:new Date(),
        updatedAt:new Date()
    }
];

const employeeRouter = express.Router();
let count:number = 0;

employeeRouter.get('/',(req,res) => {
    console.log(req.url);
    res.status(200).send(employees);
})

employeeRouter.post('/',(req,res) => {
    console.log(req.url);
    const newEmployee = new Employee();
    newEmployee.email=req.body.email;
    newEmployee.name=req.body.name;
    newEmployee.id=++count;
    newEmployee.createdAt=new Date();
    newEmployee.updatedAt=new Date();
    employees.push(newEmployee);
    
    res.status(201).send(newEmployee);
})

employeeRouter.get('/:id',(req,res) => {
    console.log(req.url);
    const emp=employees.find(employee => employee.id===Number(req.params.id));
    res.status(200).send(emp);
})


employeeRouter.put('/:id',(req,res) => {
    console.log(req.url);
    const emp=employees.find(employee => employee.id===Number(req.params.id));
    emp.email=req.body.email;
    emp.name=req.body.name;
    
    emp.updatedAt=new Date();

    res.status(200).send(emp);
})

employeeRouter.patch('/:id',(req,res) => {
    console.log(req.url);
    res.status(200).send("Employee updated");
})

employeeRouter.delete('/:id',(req,res) => {
    console.log(req.url);
    const index=employees.findIndex((emp) => emp.id===Number(req.params.id));

    employees.splice(index,1);

    res.status(204).send("Employee deleted");
})

export default employeeRouter;0