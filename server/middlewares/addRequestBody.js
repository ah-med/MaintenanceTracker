import db from '../models/index';
import errors from '../controllers/errors';

const addCompanyName = (req, res, next) => {
  // extract email from req.body
  const { companyid } = req.locals;

  // fetch companyname from db
  db.query('select companyname from companies where companyid =$1', [companyid], (err, data) => {
    if (err) return errors.serverError(res);
    req.body.companyname = data.rows[0].companyname;
    next();
  });
};

const addRoleAdmin = (req, res, next) => {
  req.body.role = 'ADMIN';
  next();
};

const addRoleUser = (req, res, next) => {
  req.body.role = 'USER';
  next();
};

const addRoleMaster = (req, res, next) => {
  req.body.role = 'MASTER_ADMIN';
  next();
};

export default {
  addCompanyName, addRoleAdmin, addRoleUser, addRoleMaster
};
