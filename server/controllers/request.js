import RequestModel from '../models/request';

// destructure RequestModel
const { createRequest } = RequestModel;

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
}

export default RequestController;
