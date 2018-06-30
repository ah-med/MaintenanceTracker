import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Get /requests/', () => {
  it('should fetch all requests in the application', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('Authorization', process.env.adminToken)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should work only for admin', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('Authorization', process.env.newToken)
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
      .put(`/api/v1/requests/${process.env.newId}/approve`)
      .set('Authorization', process.env.adminToken)
      .send(status)
      .end((err, res) => {
        expect(res.body).to.have.property('requests');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should only approve a pending request', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${process.env.newId}/approve`)
      .set('Authorization', process.env.adminToken)
      .send(status)
      .end((err, res) => {
        expect(res.body).to.have.property('error')
          .eql('Action not allowed when status is not pending');
        expect(res.status).to.equal(403);
        done();
      });
  });
});
