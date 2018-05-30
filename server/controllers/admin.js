import adminModel from '../models/admin';

// destructure RequestModel
const { getRequests } = adminModel;
const { updateStatus } = adminModel;


/**
 * @class RequestController
 */
class adminController {
  /**
    * Get all requests
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static getRequests(req, res) {
    getRequests((err, result) => {
      res.status(200).json({
        requests: result
      });
    });
  }
  /**
    * Update status
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static updateStatus(req, res) {
    const { requestId } = req.params;
    const { status } = req.body;
    updateStatus(requestId, status, (err, result) => {
      res.status(200).json({
        requests: result.rows[0]
      });
    });
  }
}

export default adminController;
