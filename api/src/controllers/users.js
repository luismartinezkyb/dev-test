//imports
import { getConnection } from '../database/database.js';
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
//handlers
import { handleHttpError } from '../utils/handleError.js';
//as we don't use bcrypt to encrypt passwords we can only use plain text passwords
// import { compare } from '../utils/handlePassword.js';
import {signToken, verifyToken} from '../utils/handleJwt.js';


//validators
import { matchedData } from 'express-validator';



/**
 * getUsers: We send all the users that we have stored into the database in this case is in lowdb
 * getUser: i send only one user to check all his data
 * createUser: i don't know if i'll create a route for create an user 
 * deleteUser: route that delete an user
 * loginUser: route that can login an user only by his credentials
 * @param {*} req 
 * @param {*} res 
 */


const getUsers=(req, res) => {
    try {
        const db = getConnection();
        res.json(db.data.users);    
    } catch (error) {
        console.log(error.message)
        handleHttpError(res, 'Something went wrong with getUsers controller')
    }
    
}
const getUser=(req, res)=>{
    const {id}=req.params;
    
    try {
        const db = getConnection();

        const getUser = db.data.users.find(u => u._id === id);

        if(!getUser){
            res.status(404).json({message:'User not found'});
            return;
        }
        res.json(getUser);
    } catch (error) {
        console.log(error.message)
        handleHttpError(res, 'Something went wrong with getUsers controller')
        
    }


}
const createUser= async(req, res) => {
    res.send("i don't know if i'll create an user, but here is the route without data lol")
}

const updateUser= async(req, res) => {
    const {id}=req.params;
    const {
        isActive,
        balance, 
        picture, 
        age, 
        eyeColor, 
        name,
        company,
        email,
        password,
        phone,
        address
    }=req.body;

    try {
        const db = getConnection();

        const user = db.data.users.find(u=>u._id === id);
        
        if(!user){
            return res.json({message:'There is no users with the given id'});
        }
        
        user.isActive=isActive;
        user.balance=balance;
        user.picture=picture;
        user.age=age;
        user.eyeColor=eyeColor;
        user.name=name;
        user.company=company;
        user.email=email;
        user.password=password;
        user.phone=phone;
        user.address=address;

        db.data.users.map(u => u._id===id ? user : u);

        await db.write();
        
        res.json({
            message:'User updated successfully',
            status: 'success',
            newUser: user,
        });
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Something went wrong with login controller')
    }
}
const deleteUser= async(req, res) => {
    const {id}=req.params;

    try {
        const db = getConnection();

        const user = db.data.users.find(u => u._id === id);

        if(!user){
            res.json({message:'There is no users with the given id'});
            return;
        }

        const newUser = db.data.users.filter(u => u._id !== id);
        console.log(newUser)
        db.data.users=newUser;
        await db.write();

        res.status(200).json({message:`User with the id ${id} deleted successfully`})
    } catch (error) {
        console.log(error.message)
        handleHttpError(res, 'Something went wrong with deleteUsers controller')
    }

}
const loginUser= async(req, res) => {
    
    try {
        req = matchedData(req);
        
        const {email, password} = req;
        const db = getConnection();

        const user = db.data.users.find(u => u.email === email);
        
        if(!user) {
            handleHttpError(res, 'USER DOES NOT EXIST', 404)
            return;
        }
        
        const check =  password===user.password;

        if(!check){
            handleHttpError(res, 'PASSWORD_INVALID', 401)
            return;
        }
        const token = await signToken(user);
        const data={token,user}
        res.cookie('jwt', token, {
            withCredentials: true,
            httpOnly: false,
        });
        
        res.status(200).json({data, created:true});

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Something went wrong with login controller')
    }
}
const checkUser= async(req, res, next) => {

    const {token} = req;
    

	if (!token) {
        handleHttpError(res, "NO_TOKEN_IN_COOKIE", 401)
        return;
		
	}
    
    jwt.verify(
        token, 
        JWT_SECRET, 
        async (err, decodedToken) =>{ 
        if (err) {
            handleHttpError(res, "ERR_VERIFY_TKN", 401)
            return;
        }else {
            const db=getConnection();
            const user = db.data.users.find(u=>u._id===decodedToken.id);
            
            if (!user) {
                res.json({status:false})
                next();    
            }
            res.json({status:true, user, token});
        }
    })
}


export {getUsers, createUser, deleteUser, updateUser, loginUser, getUser, checkUser};