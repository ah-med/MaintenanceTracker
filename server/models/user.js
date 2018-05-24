import db from '../db/index';

const UserModel = {

  createUser: (username, email, password, callback) => {
    const text = 'INSERT INTO users(username, email, password) values($1, $2, $3)';
    const params = [username, email, password];
    db.query(text, params, (err, result) => {
      callback(err, result);
    });
  }

};

export default UserModel;

