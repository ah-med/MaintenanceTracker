// import users from '../data/user';


/**
 * @class RequestsModel
 */
class RequestModel {
  /**
    * Requests constructor
    *@param {*} type The type of request.
    *@param {*} details The details of request.
    *@param {*} id The id of request.
    */
  constructor(type, details, id) {
    this.id = id;
    this.type = type;
    this.details = details;
  }
}

export default RequestModel;
