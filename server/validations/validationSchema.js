import Joi from 'joi';


const Schema = {
  authSchema: {
    username: Joi.string().alphanum().min(3).max(30)
      .required(),
    companyname: Joi.string().alphanum().min(3).max(30)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(10).required()
  },
  requestSchema: {
    details: Joi.string().min(10).max(250)
      .required(),
    title: Joi.string().min(10).max(50)
      .required(),
    requestId: Joi.number().positive().required(),
  }
};

export default Schema;
