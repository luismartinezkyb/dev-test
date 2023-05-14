const handleHttpError = (res, message = "Something Happend", code = 403) =>{
    res.status(code);
    res.send({error: message});
}

export {handleHttpError};