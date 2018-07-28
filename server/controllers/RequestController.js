import errors from './errors';
import db from '../db/index';
/**
 * @class RequestController
 */
class RequestController {
  /**
  * Fetch all requests
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {undefined} returns undefined *
  */
  static fetchAll(req, res) {
    db.query('select * from requests', (err, data) => {
      if (err) return errors.serverError(res);
      return res.status(200).json({
        message: 'success',
        data: data.rows
      });
    });
  }

  /**
  * Update a request
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {undefined} returns undefined *
  */
  static updateStatus(req, res) {
    // get status from request.locals
    const { status, currStatus } = req.locals;
    const { requestId } = req.params;
    console.log(currStatus, status);
    // case: current status is pending and new status is approve
    if (currStatus === 'new' && status === 'approve') {
      db.query('UPDATE requests SET status=$1 WHERE requestid=$2 RETURNING *', [status, requestId], (err, data) => {
        if (err) return errors.serverError(res);
        const returnData = data.rows[0];
        return res.status(200).json({
          message: 'success',
          data: {
            userId: returnData.userid,
            requesttId: returnData.requestid,
            title: returnData.reqtitle,
            details: returnData.reqdetails,
            status: returnData.status,
            lastupdate: returnData.lastupdated
          }
        });
      }); // case: status is approve or disapprove
    } else if (status === 'disapprove' || status === 'resolve') {
      db.query('UPDATE requests SET status=$1 WHERE requestid=$2 RETURNING *', [status, requestId], (err, data) => {
        if (err) return errors.serverError(res);
        const returnData = data.rows[0];
        return res.status(200).json({
          message: 'success',
          data: {
            userId: returnData.userid,
            requesttId: returnData.requestid,
            title: returnData.reqtitle,
            details: returnData.reqdetails,
            status: returnData.status,
            lastupdate: returnData.lastupdated
          }
        });
      }); // case: approving a request that is not new
    } else errors.forbidden(res, 'you can only approve a new request');
  }
}

export default RequestController;
