import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let adminToken;
let userToken;

describe('verifyRole.masterAdmin middleware', () => {
  it('it should return error for non masterAdmin token', (done) => {
    // create an Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser1', email: 'masterUser1@mail.com', password: '12345678', companyname: 'newCompany1'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser1@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'USER' role
            chai.request(app)
              .post('/api/v1/users')
              .set('Authorization', adminToken)
              .send({
                username: 'newUser1', email: 'newUser1@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // login the account with 'USER' role
                chai.request(app)
                  .post('/api/v1/auth/login')
                  .send({
                    email: 'newUser1@mail.com', password: '12345678'
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(200);
                    userToken = bearer + res.body.data.token;
                    // create an admin account with user token
                    chai.request(app)
                      .post('/api/v1/admins')
                      .set('Authorization', userToken)
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
              });
          });
      });
  });
});
