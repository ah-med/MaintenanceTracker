import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let adminToken;

describe('GET api/v1/requests route', () => {
  it('it should get all requests in the application', (done) => {
    // create an Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser4', email: 'masterUser4@mail.com', password: '12345678', companyname: 'newCompany4'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser4@mail.com', password: '12345678'
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
