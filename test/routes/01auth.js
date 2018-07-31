/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';
import db from '../../server/db/index';
import admin from '../../server/admin';

chai.use(chaiHttp);
const { expect } = chai;

// clear database before running all test
db.query('DELETE FROM users');
db.query('DELETE FROM requests');

// register a master admin
admin.register();

// dummy user for test
const user = {
  username: 'ajani',
  email: 'ajani@gmail.com',
  password: 'abcd456ef'
};

let newToken = 'Bearer ';
let adminToken = 'Bearer ';

describe('POST /auth/signup', () => {
  it('Should register a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('User Registered. Login with your credentials');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('Should not register a user twice', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.have.property('err');
        expect(res.body.err).to.have.property('code');
        expect(res.body.err).to.have.property('message');
        expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('POST /auth/login', () => {
  it('should login a user', (done) => {
    const credentials = {
      email: 'ajani@gmail.com',
      password: 'abcd456ef'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(credentials)
      .end((err, res) => {
        const { token } = res.body;
        newToken += token;
        process.env.newToken = newToken;
        expect(res.body).to.have.property('message')
          .eql('User logged in successfully');
        expect(res.body).to.have.property('token');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should login an admin', (done) => {
    const adminCred = {
      email: 'admin@mail.com',
      password: 'iamadmin'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(adminCred)
      .end((err, res) => {
        const { token } = res.body;
        adminToken += token;
        process.env.adminToken = adminToken;
        expect(res.body).to.have.property('message')
          .eql('User logged in successfully');
        expect(res.body).to.have.property('token');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should not login a user', (done) => {
    const fake = {
      email: 'dd@dfk.ddf',
      password: 'dfdjkd'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(fake)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Username/Password Incorrect');
        expect(res.status).to.equal(400);
        done();
      });
  });
});
*/
