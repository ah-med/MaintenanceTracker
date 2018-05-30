import verifyToken from './verifyToken';

const { tokenVerification } = verifyToken;

const verifyAdmin = {
  isAdmin: (req, res, next) => {
    const { userData } = req;
    if (userData.admin === true) {
      next();
    } else {
      return res.status(403).json({
        error: 'forbidden'
      });
    }
  },
  registerAnAdmin: (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return next();
    }
    tokenVerification(req, res, next);
  }
};

export default verifyAdmin;
