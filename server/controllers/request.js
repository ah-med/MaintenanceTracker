import RequestModel from '../models/request';

// destructure RequestModel
const { createRequest } = RequestModel;
const { getRequest } = RequestModel;
const { getAllRequests } = RequestModel;
const { modifyRequest } = RequestModel;

/**
 * @class RequestController
 */
class RequestController {
  /**
    * Create a Request
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static createRequest(req, res) {
    const { userData } = req;
    const { details } = req.body;
    createRequest(userData.id, details, (err, result) => {
      if (result) {
        return res.status(201).json({
          message: 'Request Successfully Created',
          location: `/api/v1/users/requests/${result.rows[0].req_id}`
        });
      }
      return res.status(403).json({
        error: 'request content aready exist'
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
      return res.status(404).json({
        error: 'request not found'
      });
    });
  }
}

export default RequestController;
