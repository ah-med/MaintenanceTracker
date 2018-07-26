import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserQuery from '../models/user';
import db from '../db/index';
import errors from './errors';


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
    // extract required informations from req.body
    const {
      username, email, password, role, companyname
    } = req.body;
    const { companyid } = req.locals;

    const pass = bcrypt.hashSync(password, 10);

    const text = 'INSERT INTO users(companyid, username, email, password, role) values ($1, $2, $3, $4, $5) RETURNING userid';
    const param = [companyid, username, email, pass, role];
    db.query(text, param, (err, user) => {
      if (err) return errors.serverError(res);

      return res.status(201).json({
        message: 'Account created successfully',
        data: {
          userid: user.rows[0].userid,
          username,
          email,
          companyid,
          companyname,
          role
        }
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
