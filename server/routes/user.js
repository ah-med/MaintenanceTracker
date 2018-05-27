import express from 'express';
import RequestController from '../controllers/request';

import verifyToken from '../middlewares/verifyToken';

const { tokenVerification } = verifyToken;
const router = express.Router();

// Create a Request
router.post('/requests', tokenVerification, RequestController.createRequest);

// Modify a Request
router.put('/requests/:requestId', tokenVerification, RequestController.modifyRequest);

// Fetch a Request
router.get('/requests/:requestId', tokenVerification, RequestController.getRequest);

// Fetch all Requests
router.get('/requests', tokenVerification, RequestController.getAllRequests);

export default router;
