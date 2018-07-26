import jwt from 'jsonwebtoken';
import errors from '../controllers/errors';

// Secret key
const secret = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers.authorization;

  // check if bearer is undefined
  if (!bearerHeader) return errors.unauthorizedError(res);

  // get the token from header value
  const [, token] = bearerHeader.split(' ');

  jwt.verify(token, secret, (err, userData) => {
    if (err) {
      // Wrong token
      return res.status(403).json({
        error: err
      });
    }
    req.locals = userData;
    next();
  });
};


export default verifyToken;
