import bcrypt from 'bcryptjs';
import UserModel from '../models/user';


/**
 * @class UserController
 */
class UserController {
  /**
    * Register a user
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static createUser(req, res) {
    const { username, email, password } = req.body;
    const pass = bcrypt.hashSync(password, 10);
    UserModel.createUser(username, email, pass, (err) => {
      if (err) {
        return res.status(400).json({
          err: {
            err,
            code: err.code,
            message: 'user already exist'
          }
        });
      }
      return res.status(201).json({
        message: 'User Registered. Login with your credentials'
      });
    });
  }
}

export default UserController;
