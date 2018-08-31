import bcrypt from 'bcryptjs';
import db from '../models/index';
import errors from './errors';

/**
 * @class AuthController
 */
class AuthController {
  /**
    * Register a company and master admin
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {undefined} returns undefined *
    */
  static signUp(req, res) {
    // extract required informations from req.body
    const {
      username, email, password, companyname, role
    } = req.body;
    const pass = bcrypt.hashSync(password, 10);

    // Insert into companies database and users database
    let text = 'INSERT INTO companies(companyname) values($1) RETURNING companyid';
    let param = [companyname];
    db.query(text, param, (err, result) => {
      if (err) return errors.serverError(res);
      text = 'INSERT INTO users(companyid, username, email, password, role) values ($1, $2, $3, $4, $5) RETURNING userid';
      param = [result.rows[0].companyid, username, email, pass, role];
      db.query(text, param, (err, user) => {
        if (err) return errors.serverError(res);
        return res.status(201).json({
          message: 'Account created successfully',
          data: {
            userid: user.rows[0].userid,
            username,
            email,
            companyname,
            role
          }
        });
      });
    });
  }
  /**
    * Login a user
    *@param {*} req The request *.
    *@param {*} res The response *.
    *@returns {undefined} The return *
    */
  static login(req, res) {
    // extract token from req.locals
    const { token, role } = req.locals;
    const d = new Date();
    return res.status(200).json({
      message: 'Log in successfull',
      data: {
        token,
        role,
        createdAt: d,
        expiresIn: '6hrs'
      }
    });
  }
}

export default AuthController;
