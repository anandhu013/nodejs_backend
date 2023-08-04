import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./Employee.entity";

@Entity()
class Address{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    line1:string;

    @Column()
    pincode:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @OneToOne(() => Employee,(employee) => employee.address)
    @JoinColumn()
    employee:Employee
}

export default Address;