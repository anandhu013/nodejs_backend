import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

 class AbstractEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;
 }

 export default AbstractEntity;