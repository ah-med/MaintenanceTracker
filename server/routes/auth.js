import express from 'express';
import AuthController from '../controllers/AuthController';
import checkExistingUser from '../middlewares/checkExistingUser';
import UserController from '../controllers/user';
import authValidation from '../validations/authValidation';
import fetchUserData from '../middlewares/fetchUserData';
import verifyCredentials from '../middlewares/verifyCredentials';
import assignToken from '../middlewares/assignToken';

const { validateSignup, validateLogin } = authValidation;

const router = express.Router();

// Register a user
router.post('/signup', validateSignup, checkExistingUser, AuthController.signUp);

// Login a user
router.post('/login', validateLogin, fetchUserData, verifyCredentials, assignToken, AuthController.login);

export default router;
