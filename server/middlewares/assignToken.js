import jwt from 'jsonwebtoken';

const assignToken = (req, res, next) => {
  // get user data from req.locals
  const userData = req.locals;

  // user user data to sign JWT with expiration time
  const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '6h' });

  // add token to req.locals
  req.locals.token = token;

  next();
};

export default assignToken;
