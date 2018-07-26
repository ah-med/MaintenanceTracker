import bcrypt from 'bcryptjs';
import errors from '../controllers/errors';


const verifyCredentials = (req, res, next) => {
  // deconstruct password from req.body
  const { password } = req.body;

  // check if password matches
  const match = bcrypt.compareSync(password.trim(), req.locals.password);
  if (!match) return errors.wrongPassword(res);
  next();
};

export default verifyCredentials;
