import Joi from 'joi';
import Schema from './validationSchema';

const { signupSchema } = Schema;


const validateSignup = (req, res, next) => {
  const data = ['email', 'username', 'password', 'companyname'];

  const errObj = {};
  let isError = false;
  data.forEach((val) => {
    const obj = {};
    obj[val] = req.body[val];
    const { error } = Joi.validate({ val: obj[val] }, { val: signupSchema[val] });
    if (error !== null) {
      isError = true;
      errObj[val] = error.details[0].message.replace('"val"', val);
    }
  });
  if (isError) {
    return res.status(422).json({
      error: {
        status: 422,
        title: 'FIELDS_VALIDATION_ERROR',
        description: 'one or more field raised validation error',
        fields: errObj
      }
    });
  }
  next();
};


export default validateSignup;

