import { IsNotEmpty, IsOptional, IsString } from "class-validator";

class PatchAddressDto{

    @IsOptional()
    @IsString()
    addressLine1:string;

    @IsOptional()
    @IsString()
    addressLine2:string;

    @IsOptional()
    @IsString()
    city:string;

    @IsOptional()
    @IsString()
    state:string;

    @IsOptional()
    @IsString()
    country:string;

    @IsOptional()
    @IsString()
    pincode:string;


}

export default PatchAddressDto;