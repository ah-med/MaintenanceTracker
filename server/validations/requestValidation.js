import Schema from './validationSchema';
import Validator from './validator';
import Errors from '../controllers/errors';

const { requestSchema } = Schema;
const { validationError } = Errors;

const validateRequest = (req, res, next) => {
  const data = ['details', 'title'];
  const errors = Validator(data, req.body, requestSchema);
  return (errors !== null) ? validationError(res, errors) : next();
};


export default { validateRequest };
