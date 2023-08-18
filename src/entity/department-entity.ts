import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./Employee.entity";

@Entity()
class Department{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @OneToMany(() => Employee, (employee) => employee.department)
    @JoinColumn()
    employees: Employee;

}

export default Department;