import express from 'express';
import adminController from '../controllers/admin';

import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import verifyStatus from '../middlewares/verifyStatus';

const { tokenVerification } = verifyToken;
const { isAdmin } = verifyAdmin;
const { isPending } = verifyStatus;

const router = express.Router();

// Get all requests in the application
router.get('/', tokenVerification, isAdmin, adminController.getRequests);

// Approve a request
router.put('/:requestId/approve', tokenVerification, isAdmin, isPending, adminController.updateStatus);

// Disapprove a request
router.put('/:requestId/disapprove', tokenVerification, isAdmin, adminController.updateStatus);

export default router;
