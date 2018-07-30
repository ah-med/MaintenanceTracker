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
    const { userid, companyid } = req.locals;
    const createdat = new Date();
    const params = [userid, companyid, title, details, createdat, createdat];
    const text = 'INSERT INTO requests(userid, companyid, reqtitle, reqdetails, createdat, lastupdated) VALUES($1, $2, $3, $4, $5, $6) RETURNING requestid';
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
  static fetchRequest(req, res) {
    const { requestId } = req.params;
    const { userid } = req.locals;
    const text = 'select * from requests where userid=$1 and requestid=$2';
    const params = [userid, requestId];
    db.query(text, params, (err, request) => {
      if (err) return errors.serverError(res);
      const {
        requestid, reqtitle, reqdetails, status, createdat, lastupdated
      } = request.rows[0];
      return res.status(200).json({
        message: 'success',
        data: {
          userId: userid,
          requestId: requestid,
          title: reqtitle,
          details: reqdetails,
          status,
          createdAt: createdat,
          lastUpdated: lastupdated
        }
      });
    });
  }
  /**
  * Fetch all requests that belongs to a logged in user
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {undefined} returns undefined *
  */
  static fetchAllRequests(req, res) {
    const { userid } = req.locals;

    db.query('select * from requests where userid=$1', [userid], (err, data) => {
      if (err) return errors.serverError(res);
      return res.status(200).json({
        message: 'success',
        data: data.rows
      });
    });
  }
  /**
  * Modify a Request
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {undefined} returns undefined *
  */
  static modifyRequest(req, res) {
    // get status from req.locals
    const { currStatus, userid } = req.locals;
    if (currStatus === 'approve' || currStatus === 'disapprove') return errors.forbidden(res, 'cannot modify approved or disapproved request');

    // get requestid from req.params
    const { requestId } = req.params;
    const { title, details } = req.body;
    const d = new Date();

    // modify request in database
    const text = 'UPDATE requests SET reqtitle=$1, reqdetails=$2, lastupdated=$3 WHERE requestid=$4 and userid=$5 RETURNING *';
    const params = [title, details, d, requestId, userid];
    db.query(text, params, (err, data) => {
      if (err) return errors.serverError(res);
      const returnData = data.rows[0];
      return res.status(200).json({
        message: 'Updated Successfully',
        data: {
          userId: userid,
          requesttId: returnData.requestid,
          title: returnData.reqtitle,
          details: returnData.reqdetails,
          status: returnData.status,
          lastupdate: returnData.lastupdated
        }
      });
    });
  }
}

export default UsersRequestController;
