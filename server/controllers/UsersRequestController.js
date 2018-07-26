import db from '../db/index';
import errors from './errors';

/**
 * @class UsersRequestController
 */
class UsersRequestController {
  /**
    * Create a Request
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static createRequest(req, res) {
    const { details, title } = req.body;
    const { userid } = req.locals;
    const createdat = new Date();
    const params = [userid, title, details, createdat, createdat];
    const text = 'INSERT INTO requests(userid, reqtitle, reqdetails, createdat, lastupdated) VALUES($1, $2, $3, $4, $5) RETURNING requestid';
    db.query(text, params, (err, data) => {
      if (err) return errors.serverError(res);
      return res.status(201).json({
        message: 'request created successfully',
        data: {
          userId: userid,
          requestId: data.rows[0].requestid,
          title,
          details,
          createdAt: createdat
        }
      });
    });
  }
  /**
  * Fetch a requests that belongs to a logged in user
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {undefined} returns undefined *
  */
  static getRequest(req, res) {
    const { userData } = req;
    const { requestId } = req.params;
    getRequest(requestId, userData.id, (err, result) => {
      if (result.rowCount === 1) {
        const {
          type, details, stat
        } = result.rows[0];
        return res.status(200).json({
          request: [{
            requestId: result.rows[0].req_id,
            type,
            details,
            status: stat
          }]
        });
      }
      return res.status(404).json({
        error: 'request not found'
      });
    });
  }
  /**
  * Fetch all requests that belongs to a logged in user
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {undefined} returns undefined *
  */
  static getAllRequests(req, res) {
    const { userData } = req;
    getAllRequests(userData.id, (err, result) => res.status(200).json({
      requests: result.rows
    }));
  }
  /**
  * Modify a Request
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {undefined} returns undefined *
  */
  static modifyRequest(req, res) {
    const { requestId } = req.params;
    const { userData } = req;
    const { details } = req.body;
    modifyRequest(userData.id, requestId, details, (err, result) => {
      if (result.rowCount === 1) {
        return res.status(200).json({
          message: 'Modified successfully'
        });
      }
    });
  }
}

export default UsersRequestController;
