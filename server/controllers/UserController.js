import bcrypt from 'bcryptjs';
import db from '../models/index';
import errors from './errors';


/**
 * @class UserController
 */
class UserController {
  /**
    * Create a new user
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
}

export default UserController;
