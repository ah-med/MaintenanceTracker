import errors from '../controllers/errors';

const admin = (req, res, next) => {
  const { role } = req.locals;
  if (!(role === 'ADMIN' || role === 'MASTER_ADMIN')) {
    return errors.unauthorizedError(res);
  }
  next();
};

const user = (req, res, next) => {
  const { role } = req.locals;

  if (role !== 'USER') {
    return errors.unauthorizedError(res);
  }

  next();
};

const masterAdmin = (req, res, next) => {
  const { role } = req.locals;

  if (role !== 'MASTER_ADMIN') {
    return errors.unauthorizedError(res);
  }

  next();
};

export default { admin, user, masterAdmin };

