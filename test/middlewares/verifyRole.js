import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);
const { expect } = chai;

const bearer = 'Bearer ';
let adminToken;
let userToken;

describe('verifyRole.masterAdmin middleware', () => {
  before(() => {
    // create an Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser1', email: 'masterUser1@mail.com', password: '12345678', companyname: 'newCompany1'
      })
      .end((err) => {
        if (err) throw err;
        console.log('create a master admin PASSED');
      });
    // login the Master admin account and get the token set to process.env
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'masterUser1@mail.com', password: '12345678'
      })
      .end((err, res) => {
        if (err) throw err;
        adminToken = bearer + res.body.data.token;
        process.env.adminToken = adminToken;
      });
    // use the token to create an account with 'USER' role
    chai.request(app)
      .post('/api/v1/users')
      .set('Authorization', process.env.adminToken)
      .send({
        username: 'newUser1', email: 'newUser1@mail.com', password: '12345678'
      })
      .end((err) => {
        if (err) throw err;
        console.log('create account with USER role passed');
      });
    // login the account of the user and set token to process.env
    chai.request(app)
      .post('/api/v1/users')
      .send({
        email: 'newUser1@mail.com', password: '123456'
      })
      .end((err, res) => {
        if (err) throw err;
        const { token } = res.body.data;
        userToken = bearer + token;
        console.log('set userToken successful');
      });
  });

  it('should return error for token belonging to USER role', (done) => {
    chai.request(app)
      .post('/api/v1/admins')
      .set('Authorization', process.env.userToken)
      .send({ username: 'newCompanyAdmin', email: 'newCompany@mail.com', password: '12345678' })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('status');
        expect(res.body.error).to.have.property('title');
        expect(res.body.error).to.have.property('description');
        expect(res.status).to.equal(401);
        done();
      });
  });
});
