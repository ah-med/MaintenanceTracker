import RequestModel from '../models/request';
import requests from '../dataStructure/index';

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
    const {
      type, details
    } = req.body;
    const id = requests.length + 100;
    const request = new RequestModel(type, details, id);
    requests.push(request);
    res.status(201).json({
      request,
      location: `localhost:8000/api/v1/users/requests/${id}`
    });
  }

  /**
    * Fetch a requests that belongs to a logged in user
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static getRequest(req, res) {
    let { requestId } = req.params;
    requestId = parseInt(requestId, 10);
    const request = requests[requestId - 100];
    res.status(200).json({
      request
    });
  }

  /**
    * Fetch all requests that belongs to a logged in user
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static getAllRequests(req, res) {
    res.status(200).json({
      requests
    });
  }

  /**
    * Modify a Request
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static modifyRequest(req, res) {
    const { requestId } = req.params;
    const { type, details } = req.body;
    const index = parseInt(requestId, 10) - 100;
    requests[index].type = type;
    requests[index].details = details;
    res.status(200).json({
      message: 'Modified successfully'
    });
  }
}

export default RequestController;
