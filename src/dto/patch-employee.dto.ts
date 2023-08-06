import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import UpdateAddressDto from "./update-address.dto";
import PatchAddressDto from "./patch-address.dto";

class PatchEmployeeDto{
    @IsOptional()
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    username:string;

    @IsOptional()
    @ValidateNested({each:true})
    @Type(()=> PatchAddressDto)
    address:Address

    @IsOptional()
    @IsString()
    joiningDate:string

    @IsOptional()
    @IsNumber()
    experience:number

    @IsOptional()
    @IsNumber()
    departmentId:number
}

export default PatchEmployeeDto;