import Schema from './validationSchema';
import Validator from './validator';
import Errors from '../controllers/errors';

const { authSchema } = Schema;
const { validationError } = Errors;

const validateSignup = (req, res, next) => {
  const data = ['email', 'username', 'password', 'companyname'];
  const errors = Validator(data, req.body, authSchema);
  return (errors !== null) ? validationError(res, errors) : next();
};

const validateLogin = (req, res, next) => {
  const data = ['email', 'password'];
  const errors = Validator(data, req.body, authSchema);
  return (errors !== null) ? validationError(res, errors) : next();
};

const validateNewUser = (req, res, next) => {
  const data = ['email', 'username', 'password'];
  const errors = Validator(data, req.body, authSchema);
  return (errors !== null) ? validationError(res, errors) : next();
};

export default { validateSignup, validateLogin, validateNewUser };
