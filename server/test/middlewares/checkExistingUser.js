import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;
const bearer = 'Bearer ';
let adminToken;

describe('checkExisting user middleware', () => {
  it('should return error when creating account with existing user details', (done) => {
    // create an Master admin account
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'masterUser3', email: 'masterUser3@mail.com', password: '12345678', companyname: 'newCompany3'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        // login the Master admin account and get the token
        chai.request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'masterUser3@mail.com', password: '12345678'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            adminToken = bearer + res.body.data.token;
            // use the token to create an account with 'ADMIN' role
            chai.request(app)
              .post('/api/v1/admins')
              .set('Authorization', adminToken)
              .send({
                username: 'newAdmin3', email: 'newAdmin3@mail.com', password: '12345678'
              })
              .end((err, res) => {
                expect(res.status).to.equal(201);
                // create a new account using existing details
                chai.request(app)
                  .post('/api/v1/admins')
                  .set('Authorization', adminToken)
                  .send({
                    username: 'newAdmin3', email: 'newAdmin3@mail.com', password: '12345678'
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
      });
  });
});
