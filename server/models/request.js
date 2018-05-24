/**
 * @class RequestsModel
 */
class RequestModel {
  /**
    * Requests constructor
    *@param {string} type The type of request.
    *@param {string} details The details of request.
    *@param {int} id The id of request.
    */
  constructor(type, details, id) {
    this.id = id;
    this.type = type;
    this.details = details;
    this.status = 'Unmarked';
  }
}

export default RequestModel;
