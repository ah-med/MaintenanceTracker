import errors from '../controllers/errors';
import db from '../models/index';

const fetchRequestStatus = (req, res, next) => {
  // get requestId from req.params
  const { requestId } = req.params;

  // get current status of request from DB
  db.query('select status from requests where requestid=$1', [requestId], (err, data) => {
    if (err) return errors.serverError(res);
    const { status } = data.rows[0];
    req.locals.currStatus = status;
    next();
  });
};

export default fetchRequestStatus;
