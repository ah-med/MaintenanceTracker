import db from '../models/index';
import errors from '../controllers/errors';

const checkExistingAccount = (req, res, next) => {
  // extract neccessary data from request object
  const { companyname, email, username } = req.body;

  // check if user has a company registerd
  const text = 'select exists(select companyid from companies where companyname=$1)';

  // check if company name exists
  db.query(text, [companyname], (err, company) => {
    // check if email exists
    db.query('select exists(select userid, username from users where email=$1 AND username=$2)', [email, username], (err, mail) => {
      if (err) {
        return errors.serverError(res);
      }
      if (company.rows[0].exists || mail.rows[0].exists) {
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
  });
};

export default checkExistingAccount;
