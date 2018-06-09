import express from 'express';
import UserController from '../controllers/user';
import verifyAdmin from '../middlewares/verifyAdmin';

const { registerAnAdmin } = verifyAdmin;

const router = express.Router();

// Register a user
router.post('/signup', registerAnAdmin, UserController.createUser);

// Login a user
router.post('/login', UserController.loginUser);

export default router;
