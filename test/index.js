import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

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
