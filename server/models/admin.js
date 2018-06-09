import db from '../db/index';

const adminModel = {
  getRequests: (callback) => {
    const text = 'SELECT * FROM requests';
    db.query(text, (err, result) => {
      callback(err, result);
    });
  },
  updateStatus: (requestId, status, callback) => {
    const text = 'UPDATE requests SET stat = $1 WHERE req_id = $2 RETURNING *';
    const param = [status, requestId];
    db.query(text, param, (err, result) => {
      callback(err, result);
    });
  },
  setAdmin: (email) => {
    db.query('UPDATE users SET admin = true WHERE email = $1 RETURNING *', [email], () => {});
  }
};

export default adminModel;
