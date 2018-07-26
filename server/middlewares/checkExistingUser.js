import db from '../db/index';
import errors from '../controllers/errors';

const checkExistingUser = (req, res, next) => {
  // extract neccessary data from request object
  const { email, username } = req.body;

  // check if email exists
  db.query('select exists(select userid, username from users where email=$1 OR username=$2)', [email, username], (err, mail) => {
    if (err) return errors.serverError(res);
    if (mail.rows[0].exists) {
      return res.status(409).json({
        error: {
          status: 409,
          title: 'ACCOUNT_AREADY_EXISTS',
          description: 'An account with the provided email, username and/or companyname already exist'
        }
      });
    }
    next();
  });
};

export default checkExistingUser;

