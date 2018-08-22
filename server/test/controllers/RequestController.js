import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let adminToken;
let userToken;

describe('GET api/v1/requests route', () => {
  it('should fetch all requests in the application', (done) => {
    // create an Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser9', email: 'masterUser9@mail.com', password: '12345678', companyname: 'newCompany4'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser9@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to get all the request in the application
            chai.request(app)
              .get('/api/v1/requests')
              .set('Authorization', adminToken)
              .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
              });
          });
      });
  });
});


describe('PUT /api/v1/requests/:requestId/approve route', () => {
  it('should approve a request', (done) => {
    // create a master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser10', email: 'masterUser10@mail.com', password: '12345678', companyname: 'newCompany10'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the master admin account
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser10@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // create an admin account
            chai.request(app)
              .post('/api/v1/admins')
              .set('Authorization', adminToken)
              .send({
                username: 'adminUser10', email: 'adminUser10@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // create a user account with role 'USER'
                chai.request(app)
                  .post('/api/v1/users')
                  .set('Authorization', adminToken)
                  .send({
                    username: 'newUser10', email: 'newUser10@mail.com', password: '12345678'
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(201);
                    // login a user account and get userToken
                    chai.request(app)
                      .post('/api/v1/auth/login')
                      .send({
                        email: 'newUser10@mail.com', password: '12345678'
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
                            const { requestId } = res.body.data;
                            // login an admin account
                            chai.request(app)
                              .post('/api/v1/auth/login')
                              .send({
                                email: 'masterUser10@mail.com', password: '12345678'
                              })
                              .end((err, res) => {
                                expect(res.status).to.equal(200);
                                adminToken = bearer + res.body.data.token;
                                // use adminToken and requestId to approve a request
                                chai.request(app)
                                  .put(`/api/v1/requests/${requestId}/approve`)
                                  .set('Authorization', adminToken)
                                  .end((err, res) => {
                                    expect(res.body).to.have.property('message');
                                    expect(res.body).to.have.property('data');
                                    expect(res.status).to.equal(200);
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

describe('PUT /api/v1/requests/:requestId/disapprove route', () => {
  it('should disapprove a request', (done) => {
    // create a master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser13', email: 'masterUser13@mail.com', password: '12345678', companyname: 'newCompany13'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the master admin account
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser13@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // create an admin account
            chai.request(app)
              .post('/api/v1/admins')
              .set('Authorization', adminToken)
              .send({
                username: 'adminUser13', email: 'adminUser13@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // create a user account with role 'USER'
                chai.request(app)
                  .post('/api/v1/users')
                  .set('Authorization', adminToken)
                  .send({
                    username: 'newUser13', email: 'newUser13@mail.com', password: '12345678'
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(201);
                    // login a user account and get userToken
                    chai.request(app)
                      .post('/api/v1/auth/login')
                      .send({
                        email: 'newUser13@mail.com', password: '12345678'
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
                            const { requestId } = res.body.data;
                            // login an admin account
                            chai.request(app)
                              .post('/api/v1/auth/login')
                              .send({
                                email: 'masterUser13@mail.com', password: '12345678'
                              })
                              .end((err, res) => {
                                expect(res.status).to.equal(200);
                                adminToken = bearer + res.body.data.token;
                                // use adminToken and requestId to approve a request
                                chai.request(app)
                                  .put(`/api/v1/requests/${requestId}/disapprove`)
                                  .set('Authorization', adminToken)
                                  .end((err, res) => {
                                    expect(res.body).to.have.property('message');
                                    expect(res.body).to.have.property('data');
                                    expect(res.status).to.equal(200);
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

describe('PUT /api/v1/requests/:requestId/disapprove route', () => {
  it('should resolve a request', (done) => {
    // create a master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser14', email: 'masterUser14@mail.com', password: '12345678', companyname: 'newCompany14'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the master admin account
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser14@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // create an admin account
            chai.request(app)
              .post('/api/v1/admins')
              .set('Authorization', adminToken)
              .send({
                username: 'adminUser14', email: 'adminUser14@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // create a user account with role 'USER'
                chai.request(app)
                  .post('/api/v1/users')
                  .set('Authorization', adminToken)
                  .send({
                    username: 'newUser14', email: 'newUser14@mail.com', password: '12345678'
                  })
                  .end((err, res) => {
                    expect(res.status).to.equal(201);
                    // login a user account and get userToken
                    chai.request(app)
                      .post('/api/v1/auth/login')
                      .send({
                        email: 'newUser14@mail.com', password: '12345678'
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
                            const { requestId } = res.body.data;
                            // login an admin account
                            chai.request(app)
                              .post('/api/v1/auth/login')
                              .send({
                                email: 'masterUser14@mail.com', password: '12345678'
                              })
                              .end((err, res) => {
                                expect(res.status).to.equal(200);
                                adminToken = bearer + res.body.data.token;
                                // use adminToken and requestId to approve a request
                                chai.request(app)
                                  .put(`/api/v1/requests/${requestId}/resolve`)
                                  .set('Authorization', adminToken)
                                  .end((err, res) => {
                                    expect(res.body).to.have.property('message');
                                    expect(res.body).to.have.property('data');
                                    expect(res.status).to.equal(200);
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