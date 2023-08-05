const createResponse=(data:any,errors:any,message:string):Object => 
{
    let res:Object={};

    res["data"]=data;
    res["errors"]=errors;
    res["message"]=message;
    res["meta"]={"length":data.length,
                    "size":data.length}

    return res;
}

export default createResponse;