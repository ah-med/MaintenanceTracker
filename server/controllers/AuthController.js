import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserQuery from '../models/user';
import db from '../db/index';

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
      username, email, password, companyname
    } = req.body;
    const pass = bcrypt.hashSync(password, 10);

    // Insert into companies database and users database
    let text = 'INSERT INTO companies(companyname) values($1) RETURNING companyid';
    let param = [companyname];
    db.query(text, param, (err, result) => {
      if (err) {
        throw err;
      }
      text = 'INSERT INTO users(companyid, username, email, password, role) values ($1, $2, $3, $4, $5) RETURNING userid';
      param = [result.rows[0].companyid, username, email, pass, 'MASTER_ADMIN'];
      db.query(text, param, (err, user) => {
        if (err) {
          return res.status(500).json({
            error: {
              err,
              status: 500,
              title: 'INTERNAL_SERVER_ERROR',
              description: 'something unexpected occured. try again later'
            }
          });
        }
        return res.status(201).json({
          message: 'Acccount created successfully',
          data: {
            userid: user.rows[0].userid,
            username,
            email,
            companyname,
            role: 'MASTER_ADMIN'
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
   const { token } = req.locals;
   const d = new Date();
   return res.status(200).json({
     message: 'Log in successfull',
     data: {
       token,
       createdAt: d,
       expiresIn: '6hrs'
     }
   })
 }
}

export default AuthController;
