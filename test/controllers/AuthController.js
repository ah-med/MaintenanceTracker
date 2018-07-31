import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication controller methods', () => {
  it('should register a new company and admin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'newCompanyAdmin', email: 'newCompany@mail.com', password: '12345678', companyname: 'newCompany'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('userid');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('companyname');
        expect(res.body.data).to.have.property('role');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('should log in a registerd user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'newCompany@mail.com', password: '12345678'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('createdAt');
        expect(res.body.data).to.have.property('expiresIn');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
