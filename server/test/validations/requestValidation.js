import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let adminToken;
let userToken;


describe('validateRequestId validation function', () => {
  it('should rerturn error for non existing valid requestId', (done) => {
    // create a master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser12', email: 'masterUser12@mail.com', password: '12345678', companyname: 'newCompany12'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the master admin account
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser12@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // create an admin account
            chai.request(app)
              .post('/api/v1/admins')
              .set('Authorization', adminToken)
              .send({
                username: 'adminUser12', email: 'adminUser12@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // create a user account with role 'USER'
                chai.request(app)
                  .post('/api/v1/users')
                  .set('Authorization', adminToken)
                  .send({
                    username: 'newUser12', email: 'newUser12@mail.com', password: '12345678'
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(201);
                    // login a user account and get userToken
                    chai.request(app)
                      .post('/api/v1/auth/login')
                      .send({
                        email: 'newUser12@mail.com', password: '12345678'
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(200);
                        userToken = bearer + res.body.data.token;
                        // use userToken to create a request and get the requestId
                        chai.request(app)
                          .post('/api/v1/users/requests')
                          .set('Authorization', userToken)
                          .send({
                            title: 'A new request',
                            details: 'Details of the new request'
                          })
                          .end((err, res) => {
                            expect(res.status).to.equal(201);
                            // login an admin account
                            chai.request(app)
                              .post('/api/v1/auth/login')
                              .send({
                                email: 'masterUser12@mail.com', password: '12345678'
                              })
                              .end((err, res) => {
                                expect(res.status).to.equal(200);
                                adminToken = bearer + res.body.data.token;
                                // use adminToken and requestId to approve a request
                                chai.request(app)
                                  .put(`/api/v1/requests/${'invalid'}/approve`)
                                  .set('Authorization', adminToken)
                                  .end((err, res) => {
                                    expect(res.body).to.have.property('error');
                                    expect(res.body.error).to.have.property('title');
                                    expect(res.body.error).to.have.property('description');
                                    expect(res.status).to.equal(422);
                                    done();
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
});

describe('validateRequest validation funciton', () => {
  it('should return error for invalid request field', (done) => {
    // create a Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser15', email: 'masterUser15@mail.com', password: '12345678', companyname: 'newCompany15'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser15@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'USER' role
            chai.request(app)
              .post('/api/v1/users')
              .set('Authorization', adminToken)
              .send({
                username: 'newUser15', email: 'newUser15@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // login the new user
                chai.request(app)
                  .post('/api/v1/auth/login')
                  .set('Authorization', adminToken)
                  .send({
                    email: 'newUser15@mail.com', password: '12345678'
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(200);
                    userToken = bearer + res.body.data.token;
                    // create a new request
                    chai.request(app)
                      .post('/api/v1/users/requests')
                      .set('Authorization', userToken)
                      .send({
                        title: 'A new request',
                        details: ''
                      })
                      .end((err, res) => {
                        expect(res.body).to.have.property('error');
                        expect(res.body.error).to.have.property('title');
                        expect(res.body.error).to.have.property('description');
                        expect(res.status).to.equal(422);
                        done();
                      });
                  });
              });
          });
      });
  });
});
