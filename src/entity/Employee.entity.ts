import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../utils/role.enum";
import Department from "./department-entity";


@Entity("employees")
class Employee extends AbstractEntity{

    @Column()
    name:string;

    @Column()
    username:string;

    @Column()
    joiningDate:string;

    @Column()
    isActive:boolean;

    @Column()
    experience:number;

    @OneToOne(() => Address,(address) => address.employee,{cascade:true})
    address:Address;

    @Column()
    password:string

    @Column({})
    role:Role

    @ManyToOne((type) => Department, (department) => department.employees,{cascade:true})
    department:Department;

    @Column({nullable:true})
    departmentId:number;
}

export default Employee;