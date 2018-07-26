import express from 'express';
import UsersRequestController from '../controllers/UsersRequestController';
import verifyToken from '../middlewares/verifyToken';
import authValidation from '../validations/authValidation';
import requestValidation from '../validations/requestValidation';
import verifyRole from '../middlewares/verifyRole';
import checkExistingUser from '../middlewares/checkExistingUser';
import addRequestBody from '../middlewares/addRequestBody';
import UserController from '../controllers/UserController';


const { validateNewUser } = authValidation;
const { validateRequest } = requestValidation;
const { addCompanyName, addRoleUser } = addRequestBody;

const router = express.Router();
// create a new user
router.post('/', validateNewUser, verifyToken, verifyRole.admin, addCompanyName, checkExistingUser, addRoleUser, UserController.createUser);

// Create a Request
router.post('/requests', verifyToken, verifyRole.user, validateRequest, UsersRequestController.createRequest);
/*
// Modify a Request
router.put('/requests/:requestId', verifyToken, isPending, RequestController.modifyRequest);

// Fetch a Request
router.get('/requests/:requestId', verifyToken, RequestController.getRequest);

// Fetch all Requests
router.get('/requests', verifyToken, RequestController.getAllRequests);
*/
export default router;
