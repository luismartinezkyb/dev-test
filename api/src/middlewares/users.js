import { handleHttpError } from '../utils/handleError.js';
import { verifyToken } from '../utils/handleJwt.js';


const authMiddleware = async(req, res, next)=>{
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "NEED_TOKEN", 401)
            return;
        }
        const token = req.headers.authorization.split(' ').pop();
        
        const dataToken = await verifyToken(token);
        
        if(!dataToken) {
            handleHttpError(res, "NO_VALID_TOKEN", 401)
            return;
        }
        req.token=token;
        next();
    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

export {authMiddleware};