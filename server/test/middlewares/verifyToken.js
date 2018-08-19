import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('verifyToken', () => {
  it('should return error for undefined header', (done) => {
    chai.request(app)
      .post('/api/v1/admins')
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
  it('should return error wrong or expired token', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .set('Authorization', 'wrongtoken')
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.status).to.equal(403);
        done();
      });
  });
});
