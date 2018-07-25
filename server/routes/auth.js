import express from 'express';
import AuthController from '../controllers/AuthController';
import checkExistingUser from '../middlewares/checkExistingUser';
import UserController from '../controllers/user';
import validateSignup from '../validations/authValidation';

const router = express.Router();

// Register a user
router.post('/signup', validateSignup, checkExistingUser, AuthController.signUp);

// Login a user
router.post('/login', UserController.loginUser);

export default router;
