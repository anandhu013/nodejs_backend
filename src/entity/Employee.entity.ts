import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../utils/role.enum";


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
}

export default Employee;