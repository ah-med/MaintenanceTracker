import errors from '../controllers/errors';
import db from '../models/index';

const verifyUserRequestId = (req, res, next) => {
// get requestId from req.params
  const { requestId } = req.params;
  // get userId from req.locals
  const { userid } = req.locals;

  // check if requestid belongs to userid
  const text = 'select exists(select * from requests where userid=$1 and requestid=$2)';
  const params = [userid, requestId];
  db.query(text, params, (err, data) => {
    if (err) return errors.serverError(res);
    if (!data.rows[0].exists) return errors.errorNotFound(res);
    next();
  });
};

const verifyRequestId = (req, res, next) => {
  // get requestId from req.params
  const { requestId } = req.params;

  // get companyid from req.locals
  const { companyid } = req.locals;

  // check if requestid exists
  const text = 'select exists(select * from requests where requestid=$1 and companyid=$2)';
  const params = [requestId, companyid];
  db.query(text, params, (err, data) => {
    if (err) return errors.serverError(res);
    if (!data.rows[0].exists) return errors.errorNotFound(res);
    next();
  });
};

export default { verifyUserRequestId, verifyRequestId };

