import Joi from 'joi';


const Schema = {
  signupSchema: {
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    companyname: Joi.string().alphanum().min(3).max(30)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(10).required()
  }
};

export default Schema;
