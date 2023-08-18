import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import UpdateAddressDto from "./update-address.dto";

class UpdateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=> UpdateAddressDto)
    address:Address

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

export default UpdateEmployeeDto;