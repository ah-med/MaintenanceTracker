import express from 'express';
import RequestController from '../controllers/request';


const router = express.Router();

// Create a Request
router.post('/requests', RequestController.createRequest);

// Modify a Request
router.put('/requests/:requestId', RequestController.modifyRequest);

// Fetch a Request
router.get('/requests/:requestId', RequestController.getRequest);

// Fetch all Requests
router.get('/requests', RequestController.getAllRequests);

export default router;
