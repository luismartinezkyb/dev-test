import {check} from 'express-validator';
import {validateResults} from '../utils/handleValidator.js';

// const validatorRegister = [
//     i don't know if i'm going to use register
    
// ];
const validatorLogin = [
    check('password').exists().notEmpty(),
    check('email').exists().notEmpty().isEmail(),
    (req, res, next) => validateResults(req, res, next)
]
const validatorUpdate = [
    
    check('isActive').exists().notEmpty(),
    check('balance').exists().notEmpty(),
    check('name').exists().notEmpty(),
    check('picture').exists().notEmpty(),
    check('eyeColor').exists().notEmpty(),
    check('company').exists().notEmpty(),
    check('age').exists().notEmpty().isNumeric(),
    check('password').exists().notEmpty(),
    check('email').exists().notEmpty().isEmail(),
    check('phone').exists().notEmpty(),
    check('address').exists().notEmpty(),
    
    (req, res, next) => validateResults(req, res, next)
]

export { validatorLogin, validatorUpdate};