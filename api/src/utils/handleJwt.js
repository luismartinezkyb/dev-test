import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const signToken = async (user) => {
    
    const sign = jwt.sign(
        {
            id:user._id,
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sign;
}

/**
 * DEBES DE PASAR EL TOKEN DE SESION DEL JWT
 * @param {*} token 
 * @returns 
 */
const verifyToken = async(token)=>{
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export {signToken, verifyToken};