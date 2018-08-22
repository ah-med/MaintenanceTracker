import express from 'express';
import RequestController from '../controllers/RequestController';
import verifyToken from '../middlewares/verifyToken';
import requestValidation from '../validations/requestValidation';
import verifyRole from '../middlewares/verifyRole';
import verifyRequest from '../middlewares/verifyRequest';
import fetchRequestStatus from '../middlewares/fetchRequestStatus';
import assignRequestStatus from '../middlewares/assignRequestStatus';


const { validateRequestId } = requestValidation;
const { verifyRequestId } = verifyRequest;

const router = express.Router();


// Get all requests in the application
router.get('/', verifyToken, verifyRole.admin, RequestController.fetchAll);

// Approve a request
router.put('/:requestId/approve', verifyToken, verifyRole.admin, validateRequestId, verifyRequestId, assignRequestStatus.approve, fetchRequestStatus, RequestController.updateStatus);

// Disapprove a request
router.put('/:requestId/disapprove', verifyToken, verifyRole.admin, validateRequestId, verifyRequestId, assignRequestStatus.disapprove, fetchRequestStatus, RequestController.updateStatus);

// Resolve a request
router.put('/:requestId/resolve', verifyToken, verifyRole.admin, validateRequestId, verifyRequestId, assignRequestStatus.resolve, fetchRequestStatus, RequestController.updateStatus);

export default router;
