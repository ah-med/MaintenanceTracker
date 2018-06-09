import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../server/db/index';
import admin from '../server/admin';


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
let newLocation = '';
let newId;

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

describe('POST /users/requests', () => {
  it('should create a new request', (done) => {
    const request = {
      details: 'I need to format my PC'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', newToken)
      .send(request)
      .end((err, res) => {
        const { requestId, location } = res.body;
        newLocation = location;
        newId = requestId;
        expect(res.body).to.have.property('message')
          .eql('Request Successfully Created');
        expect(res.body).to.have.property('location');
        expect(res.body).to.have.property('requestId');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('should not duplicate request detials', (done) => {
    const request = {
      details: 'I need to format my PC'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', newToken)
      .send(request)
      .end((err, res) => {
        expect(res.body).to.have.property('error')
          .eql('request content aready exist');
        expect(res.status).to.equal(403);
        done();
      });
  });
});

describe('PUT /users/requests/<requestId>', () => {
  it('Modify request', (done) => {
    const request = {
      details: 'I need a PC upgrade'
    };
    chai.request(app)
      .put(newLocation)
      .set('Authorization', newToken)
      .send(request)
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Modified successfully');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should not modify a non-existing request', (done) => {
    const request = {
      details: 'I need a PC upgrade'
    };
    chai.request(app)
      .put('/api/v1/users/requests/100')
      .set('Authorization', newToken)
      .send(request)
      .end((err, res) => {
        expect(res.body).to.have.property('error')
          .eql('request not found');
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('GET /users/requests/<requestId>', () => {
  it('should fetch a request', (done) => {
    chai.request(app)
      .get(newLocation)
      .set('Authorization', newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('request');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not fetch a request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/100')
      .set('Authorization', newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('GET /users/requests', () => {
  it('it should fetch all requests', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should fetch all requests', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Get /requests/', () => {
  it('should fetch all requests in the application', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should work only for admin', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('Authorization', newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('error')
          .eql('forbidden');
        expect(res.status).to.equal(403);
        done();
      });
  });
});

describe('PUT /requests/<requestId>/approve', () => {
  const status = {
    status: 'approved'
  };
  it('should approve a request', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${newId}/approve`)
      .set('Authorization', adminToken)
      .send(status)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should only approve a pending request', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${newId}/approve`)
      .set('Authorization', adminToken)
      .send(status)
      .end((err, res) => {
        expect(res.body).to.have.property('error')
          .eql('Action not allowed when status is not pending');
        expect(res.status).to.equal(403);
        done();
      });
  });
});

describe('verifyToken', () => {
  it('should return 403 error for undefined header', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('Kindly sign in');
        expect(res.body).to.have.property('error')
          .eql(true);
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('should return 403 error wrong token', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', 'wrongtoken')
      .end((err, res) => {
        expect(res.body).to.have.property('error')
          .eql('Something is not right. Kindly sign in');
        expect(res.status).to.equal(403);
        done();
      });
  });
});
