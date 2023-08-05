import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./Employee.entity";
import AbstractEntity from "./abstract-entity";

@Entity()
class Address extends AbstractEntity{

    @Column()
    addressLine1:string;

    @Column()
    addressLine2:string;

    @Column()
    pincode:string;

    @Column()
    city:string;

    @Column()
    state:string;

    @Column()
    country:string;

    @OneToOne(() => Employee,(employee) => employee.address)
    @JoinColumn()
    employee:Employee
}

export default Address;