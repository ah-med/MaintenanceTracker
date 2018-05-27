
import db from '../db/index';

const RequestModel = {

  createRequest: (userId, details, callback) => {
    const text = 'INSERT INTO requests (user_id, type, details, stat) values($1, $2, $3, $4) RETURNING req_id';
    const params = [userId, 'maintenance', details, 'pending'];
    db.query(text, params, (err, result) => {
      callback(err, result);
    });
  }
};

export default RequestModel;
