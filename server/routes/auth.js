import express from 'express';
import AuthController from '../controllers/AuthController';
import checkExistingAccount from '../middlewares/checkExistingAccount';
import authValidation from '../validations/authValidation';
import fetchUserData from '../middlewares/fetchUserData';
import verifyCredentials from '../middlewares/verifyCredentials';
import assignToken from '../middlewares/assignToken';
import addRequestBody from '../middlewares/addRequestBody';


const { validateSignup, validateLogin } = authValidation;
const { addRoleMaster } = addRequestBody;

const router = express.Router();

// Register a user
router.post('/signup', validateSignup, checkExistingAccount, addRoleMaster, AuthController.signUp);

// Login a user
router.post('/login', validateLogin, fetchUserData, verifyCredentials, assignToken, AuthController.login);

export default router;
