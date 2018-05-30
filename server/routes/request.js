import express from 'express';
import adminController from '../controllers/admin';

import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';

const { tokenVerification } = verifyToken;
const { isAdmin } = verifyAdmin;

const router = express.Router();

// Get all requests in the application
router.get('/', tokenVerification, isAdmin, adminController.getRequests);


export default router;
