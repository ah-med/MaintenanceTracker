import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);
const { expect } = chai;

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
