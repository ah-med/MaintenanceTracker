import RequestModel from '../models/request';
import requests from '../dataStructure/index';

/**
 * @class RequestController
 */
class RequestController {
  /**
    * Create a Request
    *@param {*} req The request *.
    *@param {*} res The response *.
    *@returns {undefined} The return *
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
    *@param {*} req The request *.
    *@param {*} res The response *.
    *@returns {undefined} The return *
    */
  static getRequest(req, res) {
    res.status(501).json({
      message: 'NOT IMPLEMENTED: Fetch a request that belongs to a logged in user GET'
    });
  }

  /**
    * Fetch all requests that belongs to a logged in user
    *@param {*} req The request *.
    *@param {*} res The response *.
    *@returns {undefined} The return *
    */
  static getAllRequests(req, res) {
    res.status(501).json({
      message: 'NOT IMPLEMENTED: Fetch all requests that belongs to a logged in user GET'
    });
  }

  /**
    * Modify a Request
    *@param {*} req The request *.
    *@param {*} res The response *.
    *@returns {undefined} The return *
    */
  static modifyRequest(req, res) {
    res.status(501).json({
      message: 'NOT IMPLEMENTED: Modify a Request PUT'
    });
  }
}

export default RequestController;
