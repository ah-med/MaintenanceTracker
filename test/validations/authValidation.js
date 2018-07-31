import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication fields validation', () => {
  it('should validate signup fields: email, username, password and companyname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'J', email: 'jjjddd', password: 'ab', companyname: ''
      })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('status');
        expect(res.body.error).to.have.property('title');
        expect(res.body.error).to.have.property('description');
        expect(res.body.error).to.have.property('fields');
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('should validate login fields: email and password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jjjddd', password: 'ab'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('status');
        expect(res.body.error).to.have.property('title');
        expect(res.body.error).to.have.property('description');
        expect(res.body.error).to.have.property('fields');
        expect(res.status).to.equal(422);
        done();
      });
  });
  it('should validate create users fields: email, username, password', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send({
        username: 'J', email: 'jjjddd', password: 'ab'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('status');
        expect(res.body.error).to.have.property('title');
        expect(res.body.error).to.have.property('description');
        expect(res.body.error).to.have.property('fields');
        expect(res.status).to.equal(422);
        done();
      });
  });
});
