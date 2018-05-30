import bcrypt from 'bcryptjs';
import userModel from './models/user';


const { createUser } = userModel;

const pass = bcrypt.hashSync('iamadmin', 10);

const admin = {
  register: () => {
    createUser('admin', 'admin@mail.com', pass, () => {});
  }
};

export default admin;
