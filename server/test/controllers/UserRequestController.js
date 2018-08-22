import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let adminToken;
let userToken;

describe('UsersRequestController.fetchAllRequests', () => {
  it('should fetch all requests belonging to a user', (done) => {
    // create a Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser6', email: 'masterUser6@mail.com', password: '12345678', companyname: 'newCompany6'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser6@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'USER' role
            chai.request(app)
              .post('/api/v1/users')
              .set('Authorization', adminToken)
              .send({
                username: 'newUser3', email: 'newUser3@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // login the new user
                chai.request(app)
                  .post('/api/v1/auth/login')
                  .set('Authorization', adminToken)
                  .send({
                    email: 'newUser3@mail.com', password: '12345678'
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
                        details: 'Details of the new request'
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(201);
                        // get all the request belonging to the user
                        chai.request(app)
                          .get('/api/v1/users/requests')
                          .set('Authorization', userToken)
                          .end((err, res) => {
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

describe('UsersRequestController.createRequest', () => {
  it('should create a new request', (done) => {
    // create a Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser5', email: 'masterUser5@mail.com', password: '12345678', companyname: 'newCompany5'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser5@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'USER' role
            chai.request(app)
              .post('/api/v1/users')
              .set('Authorization', adminToken)
              .send({
                username: 'newUser5', email: 'newUser5@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // login the new user
                chai.request(app)
                  .post('/api/v1/auth/login')
                  .set('Authorization', adminToken)
                  .send({
                    email: 'newUser5@mail.com', password: '12345678'
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
                        details: 'Details of the new request'
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
  });
});

describe('UsersRequestController.modifyRequest', () => {
  it('should update a request', (done) => {
    // create a Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser16', email: 'masterUser16@mail.com', password: '12345678', companyname: 'newCompany16'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser16@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'USER' role
            chai.request(app)
              .post('/api/v1/users')
              .set('Authorization', adminToken)
              .send({
                username: 'newUser16', email: 'newUser16@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // login the new user
                chai.request(app)
                  .post('/api/v1/auth/login')
                  .set('Authorization', adminToken)
                  .send({
                    email: 'newUser16@mail.com', password: '12345678'
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
                        details: 'Details of the new request'
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(201);
                        const { requestId } = res.body.data;
                        // update the request
                        chai.request(app)
                          .put(`/api/v1/users/requests/${requestId}`)
                          .set('Authorization', userToken)
                          .send({
                            title: 'A new request',
                            details: 'Updated details of a new request'
                          })
                          .end((err, res) => {
                            expect(res.body).to.have.property('data');
                            expect(res.body).to.have.property('message');
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

describe('UsersRequestController.fetchRequest', () => {
  it('should fetch a request', (done) => {
    // create a Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser17', email: 'masterUser17@mail.com', password: '12345678', companyname: 'newCompany17'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser17@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'USER' role
            chai.request(app)
              .post('/api/v1/users')
              .set('Authorization', adminToken)
              .send({
                username: 'newUser17', email: 'newUser17@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // login the new user
                chai.request(app)
                  .post('/api/v1/auth/login')
                  .set('Authorization', adminToken)
                  .send({
                    email: 'newUser17@mail.com', password: '12345678'
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
                        details: 'Details of the new request'
                      })
                      .end((err, res) => {
                        expect(res.status).to.equal(201);
                        const { requestId } = res.body.data;
                        // update the request
                        chai.request(app)
                          .get(`/api/v1/users/requests/${requestId}`)
                          .set('Authorization', userToken)
                          .end((err, res) => {
                            expect(res.body).to.have.property('data');
                            expect(res.body).to.have.property('message');
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
