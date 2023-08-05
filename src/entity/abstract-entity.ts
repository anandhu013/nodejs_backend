import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

 class AbstractEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;
 }

 export default AbstractEntity;