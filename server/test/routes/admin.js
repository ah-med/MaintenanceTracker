import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let adminToken;

describe('POST api/v1/admins route', () => {
  it('it should create an admin account', (done) => {
    // create an Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser2', email: 'masterUser2@mail.com', password: '12345678', companyname: 'newCompany2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser2@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'ADMIN' role
            chai.request(app)
              .post('/api/v1/admins')
              .set('Authorization', adminToken)
              .send({
                username: 'newAdmin2', email: 'newAdmin2@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('message');
                expect(res.status).to.equal(201);
                done();
              });
          });
      });
  });
});
