import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserQuery from '../models/user';
import AdminModel from '../models/admin';

const { setAdmin } = AdminModel;

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
    const { userData } = req;
    const pass = bcrypt.hashSync(password, 10);
    UserQuery.createUser(username, email, pass, (err) => {
      if (err) {
        return res.status(400).json({
          err: {
            code: err,
            message: 'user already exist'
          }
        });
      }
      if (userData && userData.admin === true) {
        console.log(userData);
        setAdmin(email);
      }
      return res.status(201).json({
        message: 'User Registered. Login with your credentials'
      });
    });
  }
  /**
    * Login a user
    *@param {*} req The request *.
    *@param {*} res The response *.
    *@returns {undefined} The return *
    */
  static loginUser(req, res) {
    const { email, password } = req.body;
    // select user in the database
    UserQuery.loginUser(email, password, (err, result) => {
      if (result.rowCount === 1) {
        const id = result.rows[0].user_id;
        const { admin } = result.rows[0];
        const userData = {
          id,
          admin
        };
        // Assign token to user for six hours
        const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '6h' });
        // Success message
        return res.status(200).json({
          message: 'User logged in successfully',
          token
        });
      }
      // Details mismatch
      return res.status(400).json({ message: 'Username/Password Incorrect' });
    });
  }
}

export default UserController;
