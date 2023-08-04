import { ValidationError } from "class-validator";


class ValidationException extends Error{
    public status:number;
    public validationErrors:Object
    constructor(status:number,message:string,errors:ValidationError[])
    {
        super(message);
        this.status=status;

        this.validationErrors=this.constructErrorObjects(errors);
    }

    constructErrorObjects=(errors:ValidationError[]):Object =>
    {
        const obj:Object={};

        for(let error of errors)
        {
            if(error.children.length==0)
            {
                obj[error.property]=Object.values(error.constraints);
            }
            else{
                obj[error.property]=this.constructErrorObjects(error.children);
            }
        }


        return obj;
    }






}

export default ValidationException;