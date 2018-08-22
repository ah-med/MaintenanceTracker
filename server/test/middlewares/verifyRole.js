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

describe('verifyRole.admin', () => {
  it('should return error for non admin token', (done) => {
    // create an Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser7', email: 'masterUser7@mail.com', password: '12345678', companyname: 'newCompany7'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser7@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'USER' role
            chai.request(app)
              .post('/api/v1/users')
              .set('Authorization', adminToken)
              .send({
                username: 'newUser7', email: 'newUser7@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // login the new user
                chai.request(app)
                  .post('/api/v1/auth/login')
                  .set('Authorization', adminToken)
                  .send({
                    email: 'newUser7@mail.com', password: '12345678'
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(200);
                    userToken = bearer + res.body.data.token;
                    // use the token to get all the request in the application
                    chai.request(app)
                      .get('/api/v1/requests')
                      .set('Authorization', userToken)
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

describe('verifyRole.user', () => {
  it('should return error for non user token', (done) => {
    // create a Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser8', email: 'masterUser8@mail.com', password: '12345678', companyname: 'newCompany8'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser8@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create a new request
            chai.request(app)
              .post('/api/v1/users/requests')
              .set('Authorization', adminToken)
              .send({
                title: 'A new request',
                details: 'Details of the new request'
              })
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
