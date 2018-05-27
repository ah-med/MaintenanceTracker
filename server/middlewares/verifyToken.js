import jwt from 'jsonwebtoken';


// Secret key
const secret = process.env.SECRET_KEY;

const verifyToken = {
  tokenVerification: (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers.authorization;

    // check if bearer is undefined
    if (!bearerHeader) {
      // Forbidden
      return res.status(403).json({
        message: 'Kindly sign in',
        error: true
      });
    }
    const [, token] = bearerHeader.split(' ');
    req.token = token;
    jwt.verify(req.token, secret, (err, userData) => {
      if (err) {
        // Wrong token
        return res.status(403).json({
          error: 'Something is not right. Kindly sign in'
        });
      }
      req.userData = userData;
      next();
    });
  }
};

export default verifyToken;
