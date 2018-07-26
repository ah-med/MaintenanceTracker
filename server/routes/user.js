import express from 'express';
import RequestController from '../controllers/request';
import verifyToken from '../middlewares/verifyToken';
import verifyStatus from '../middlewares/verifyStatus';
import authValidation from '../validations/authValidation';
import verifyRole from '../middlewares/verifyRole';
import checkExistingUser from '../middlewares/checkExistingUser';
import addRequestBody from '../middlewares/addRequestBody';
import UserController from '../controllers/UserController';


const { validateNewUser } = authValidation;
const { isPending } = verifyStatus;
const { addCompanyName, addRoleUser } = addRequestBody;

const router = express.Router();
// create a new user
router.post('/', validateNewUser, verifyToken, verifyRole.admin, addCompanyName, checkExistingUser, addRoleUser, UserController.createUser);
/*
// Create a Request
router.post('/requests', verifyToken, RequestController.createRequest);

// Modify a Request
router.put('/requests/:requestId', verifyToken, isPending, RequestController.modifyRequest);

// Fetch a Request
router.get('/requests/:requestId', verifyToken, RequestController.getRequest);

// Fetch all Requests
router.get('/requests', verifyToken, RequestController.getAllRequests);
*/
export default router;
