import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);
const { expect } = chai;

let newLocation = '';
let newId;

// user.js
describe('POST /users/requests', () => {
  it('should create a new request', (done) => {
    const request = {
      details: 'I need to format my PC'
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('Authorization', process.env.newToken)
      .send(request)
      .end((err, res) => {
        const { requestId, location } = res.body;
        newLocation = location;
        process.env.newLocation = newLocation;
        newId = requestId;
        process.env.newId = newId;
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
      .set('Authorization', process.env.newToken)
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
      .set('Authorization', process.env.newToken)
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
      .set('Authorization', process.env.newToken)
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
      .set('Authorization', process.env.newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('request');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not fetch a request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/100')
      .set('Authorization', process.env.newToken)
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
      .set('Authorization', process.env.newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should fetch all requests', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', process.env.newToken)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
