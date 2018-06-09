
import db from '../db/index';

const RequestModel = {

  createRequest: (userId, details, callback) => {
    const text = 'INSERT INTO requests (user_id, type, details, stat) values($1, $2, $3, $4) RETURNING req_id';
    const params = [userId, 'maintenance', details, 'pending'];
    db.query(text, params, (err, result) => {
      callback(err, result);
    });
  },
  getRequest: (reqId, userId, callback) => {
    const text = 'SELECT * FROM requests WHERE req_id = $1 AND user_id = $2';
    const params = [reqId, userId];
    db.query(text, params, (err, result) => {
      callback(err, result);
    });
  },
  getAllRequests: (userId, callback) => {
    const text = 'SELECT req_id, type, details, stat FROM requests WHERE user_id = $1';
    const params = [userId];
    db.query(text, params, (err, result) => {
      callback(err, result);
    });
  },
  modifyRequest: (userId, reqId, details, callback) => {
    const text = 'UPDATE requests SET details = $1 WHERE user_id = $2 AND req_id = $3 RETURNING *';
    const params = [details, userId, reqId];
    db.query(text, params, (err, result) => {
      callback(err, result);
    });
  },
  getStatus: (requestId, callback) => {
    const text = 'SELECT stat FROM requests WHERE req_id = $1';
    const param = [requestId];
    db.query(text, param, (err, result) => {
      callback(err, result);
    });
  }
};

export default RequestModel;
