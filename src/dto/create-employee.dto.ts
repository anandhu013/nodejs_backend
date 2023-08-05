import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
import { Role } from "../utils/role.enum";

class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=> CreateAddressDto)
    address:Address

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsEnum(Role)
    role:Role

    @IsNotEmpty()
    @IsString()
    joiningDate:string

    @IsNotEmpty()
    @IsNumber()
    experience:number

    @IsNotEmpty()
    @IsNumber()
    departmentId:number

    
}

export default CreateEmployeeDto;