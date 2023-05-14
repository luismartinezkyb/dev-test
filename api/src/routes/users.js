import {Router} from 'express';

import { getUser, getUsers, createUser, deleteUser, updateUser, loginUser, checkUser} from '../controllers/users.js';
import {validatorLogin, validatorUpdate} from '../validators/auth.js';
//import {checkUser} from '../middlewares/user.js';

const router = Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/user', createUser);
router.put('/user/:id', validatorUpdate, updateUser);
router.delete('/user/:id', deleteUser);
router.post('/user/login', validatorLogin, loginUser)
router.post('/user/check', checkUser);

//module.exports = router;
export default router;