import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../server/db/index';

chai.use(chaiHttp);
const { expect } = chai;

// clear database before running all test
db.query('DELETE FROM users');

// dummy user for test
const user = {
  username: 'ajani',
  email: 'ajani@gmail,com',
  password: 'abcd456ef'
};

describe('Test default route', () => {
  // Test for default route
  it('Should return 200 for the default route', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Maintenance Tracker API. Listening on port 8000');
        done();
      });
  });
});

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
  it('Should login a user', (done) => {
    const credentials = {
      email: 'ajani@gmail,com',
      password: 'abcd456ef'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(credentials)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('User logged in successfully');
        expect(res.body).to.have.property('token');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Should not login a user', (done) => {
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

describe('POST /users/requests', () => {
  it('create a new request', (done) => {
    const request = {
      type: 'maintenance',
      details: 'I need to format my PC'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .send(request)
      .end((err, res) => {
        expect(res.body).to.have.property('request')
          .eql({
            id: 100,
            type: 'maintenance',
            details: 'I need to format my PC',
            status: 'Unmarked'
          });
        expect(res.body).to.have.property('location')
          .eql('localhost:8000/api/v1/users/requests/100');
        expect(res.status).to.equal(201);
        done();
      });
  });
});

describe('PUT /users/requests/<requestId>', () => {
  it('Modify request', (done) => {
    const request = {
      type: 'maintenance',
      details: 'I need a PC upgrade'
    };
    chai.request(app)
      .put('/api/v1/users/requests/100')
      .send(request)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Modified successfully');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('GET /users/requests/<requestId>', () => {
  it('Fetch a request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/100')
      .end((err, res) => {
        expect(res.body).to.have.property('request');
        expect(res.body.request).to.have.property('id');
        expect(res.body.request).to.have.property('type');
        expect(res.body.request).to.have.property('details');
        expect(res.body.request).to.have.property('status');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('GET /users/requests', () => {
  it('Fetch all request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
