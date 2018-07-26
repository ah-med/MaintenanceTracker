import Joi from 'joi';

const Validator = (data, obj, schema) => {
  const errObj = {};
  let isError = false;
  data.forEach((val) => {
    const { error } = Joi.validate({ val: obj[val] }, { val: schema[val] });
    if (error !== null) {
      isError = true;
      errObj[val] = error.details[0].message.replace('"val"', val);
    }
  });

  if (isError) {
    return errObj;
  }

  return null;
};

export default Validator;
