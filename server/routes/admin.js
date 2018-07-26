import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import authValidation from '../validations/authValidation';
import verifyRole from '../middlewares/verifyRole';
import checkExistingUser from '../middlewares/checkExistingUser';
import addRequestBody from '../middlewares/addRequestBody';
import UserController from '../controllers/UserController';


const { validateNewUser } = authValidation;
const { addCompanyName, addRoleAdmin } = addRequestBody;

const router = express.Router();
// create a new admin
router.post('/', validateNewUser, verifyToken, verifyRole.masterAdmin, addCompanyName, checkExistingUser, addRoleAdmin, UserController.createUser);


export default router;
