import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('checkExistingAccount middleware', () => {
  it('should not register an existing user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'newCompanyAdmin', email: 'newCompany@mail.com', password: '12345678', companyname: 'newCompany'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('status');
        expect(res.body.error).to.have.property('title');
        expect(res.body.error).to.have.property('description');
        expect(res.status).to.equal(409);
        done();
      });
  });
});
