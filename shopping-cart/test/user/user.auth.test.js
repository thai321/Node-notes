/*
we use authenticatedUser to call the GET route.
The authenticatedUser allows us to access the /profile page successfully.

We use request(app) to call the GET route.
This user is not authenticated,
therefore we expect to be redirected to the /login page.
*/

const chai = require('chai');
const request = require('supertest');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
var jQuery = require('jquery')(window);

const expect = chai.expect;
chai.config.includeStack = true;

const { app } = require('../../app');
const models = require('../../models');
const { Session } = models.sequelize.models;

// console.log(models.sequelize.models.Session);

const user1 = {
  email: 'thai2@gmail.com',
  password: '12331'
};

const signUpUser = {
  name: 'Mary',
  email: 'mary@gmail.com',
  password: '12331'
};

const signinUser = {
  name: 'Mary2',
  email: 'mary2@gmail.com',
  password: '123321'
};

const authenticatedUser = request.agent(app);

describe('Routes : user authentication', () => {
  const signupUrl = '/user/signup';
  const signinUrl = '/user/signin';
  const logoutUrl = '/user/logout';
  const userProfile = '/user/profile';

  describe('GET /user/signup', () => {
    // Should render '/user/signup' Sign Up with status code 200
    it('should render the signup page', done => {
      request(app)
        .get(signupUrl)
        .expect(200, done);
    }); // END it('should render the signup page', done => {
  }); // END describe('GET /user/signup', () => {

  describe('POST /user/signup', () => {
    // Clear out the User table
    beforeEach(() => {
      models.User.destroy({
        where: {}
      });

      Session.destroy({
        where: {}
      });
    });

    // Able to signup for new User
    it('should able to singup --> profile', done => {
      authenticatedUser.get(signupUrl).end((err, res1) => {
        const $html = jQuery(res1.text);
        const csrf = $html.find('input[name=_csrf]').val();
        console.log(csrf);
        const cookie = res1.headers['set-cookie'];
        authenticatedUser
          .post(signupUrl)
          .set('cookie', cookie)
          .send({
            _csrf: csrf,
            ...signUpUser
          })
          .end((err, res2) => {
            authenticatedUser.get(userProfile).expect(200, done);
          }); // END .end((err, res2) => {
      }); // END .end((err, res1) => {
    }); // END it('should able to singup --> profile', done => {

    // Able to signup for new User, try go to /user/signup, redirect back to /
    it('should able to signup --> profile, try /user/signup ---> /', done => {
      authenticatedUser
        .get(signupUrl)
        .expect(200, done)
        .end((err, res1) => {
          const $html = jQuery(res1.text);
          const csrf = $html.find('input[name=_csrf]').val();

          authenticatedUser
            .post(signupUrl)
            .set('cookie', res1.headers['set-cookie'])
            .send({
              _csrf: csrf,
              ...signUpUser
            })
            .expect('Location', '/user/profile')
            .end((err, res2) => {
              authenticatedUser
                .get(signupUrl)
                .set('cookie', res2.headers['set-cookie'])
                .send({
                  _csrf: csrf
                })
                .end((err, res3) => {
                  expect('Location', '/');
                  expect(res3.statusCode, 302);
                  done();
                });
            }); // END .end((err, res2) => {
        }); // END .end((err, res1) => {
    }); // it('should able to signup --> profile, try /user/signup ---> /', done => {

    // Can't signup with and existing account
    it('should not able to signup if already a member', done => {
      authenticatedUser
        .get(signupUrl)
        .expect(200, done)
        .end((err, res1) => {
          const $html = jQuery(res1.text);
          const csrf = $html.find('input[name=_csrf]').val();

          authenticatedUser
            .post(signupUrl)
            .set('cookie', res1.headers['set-cookie'])
            .send({
              _csrf: csrf,
              ...signUpUser
            })
            .expect('Location', '/user/profile')
            .end((err, res2) => {
              authenticatedUser
                .get(logoutUrl)
                .set('cookie', res2.headers['set-cookie'])
                .send({
                  _csrf: csrf
                })
                .expect('Location', '/')
                .end((err, res3) => {
                  authenticatedUser
                    .post(signupUrl)
                    .set('cookie', res3.headers['set-cookie'])
                    .send({
                      _csrf: csrf,
                      ...signUpUser
                    })
                    .expect('Location', '/user/signup')
                    .expect(302, done);
                }); // END .end((err, res3) => {
            }); // END .end((err, res2) => {
        }); // END .end((err, res1) => {
    }); // END it('should not able to signup if already a member', done => {
  }); // END describe('POST /user/signup', () => {

  describe('GET /user/signin', () => {
    // Should render '/user/signin' Sign in with status code 200
    it('should render the signin page', done => {
      request(app)
        .get(signinUrl)
        .expect(200, done);
    }); // END it('should render the signin page', done => {

    // Able to signin for a existing user, try go to /user/signin, redirect back to /
    // signup --> logout --> / --> signin --> / since last url is /
  }); // END describe('GET /user/signin', () => {

  describe('POST /user/signin', () => {
    beforeEach(() => {
      models.User.destroy({
        where: {}
      });

      Session.destroy({
        where: {}
      });
    });

    // Sign in with an existing account
    it('should able to signin --> profile, try /user/signup ---> /', done => {
      authenticatedUser
        .get(signupUrl)
        .expect(200, done)
        .end((err, res1) => {
          let $html = jQuery(res1.text);
          let csrf = $html.find('input[name=_csrf]').val();

          authenticatedUser
            .post(signupUrl)
            .set('cookie', res1.headers['set-cookie'])
            .send({
              _csrf: csrf,
              ...signinUser
            })
            .expect('Location', '/user/profile')
            .end((err, res2) => {
              authenticatedUser
                .get(logoutUrl)
                .set('cookie', res2.headers['set-cookie'])
                .send({
                  _csrf: csrf
                })
                .expect('Location', '/')
                .end((err, res3) => {
                  authenticatedUser
                    .get(signinUrl)
                    .expect(200, done)
                    .end((err, res4) => {
                      $html = jQuery(res4.text);
                      csrf = $html.find('input[name=_csrf]').val();

                      authenticatedUser
                        .post(signinUrl)
                        .set('cookie', res2.headers['set-cookie'])
                        .send({
                          _csrf: csrf,
                          ...signinUser
                        })
                        .expect('Location', userProfile)
                        .end((err, res5) => {
                          authenticatedUser.get(userProfile).expect(200, done);
                        }); // END .end((err, res5) => {
                    }); // END .end((err, res4) => {
                }); // END .end((err, res3) => {
            }); // END .end((err, res2) => {
        }); // END .end((err, res1) => {
    }); // it('should able to signin --> profile, try /user/signup ---> /', done => {

    // Can't sign with a wrong email
    it('should NOT able to signin with wrong email', done => {
      authenticatedUser
        .get(signupUrl)
        .expect(200, done)
        .end((err, res1) => {
          let $html = jQuery(res1.text);
          let csrf = $html.find('input[name=_csrf]').val();

          authenticatedUser
            .post(signupUrl)
            .set('cookie', res1.headers['set-cookie'])
            .send({
              _csrf: csrf,
              ...signinUser
            })
            .expect('Location', '/user/profile')
            .end((err, res2) => {
              authenticatedUser
                .get(logoutUrl)
                .set('cookie', res2.headers['set-cookie'])
                .send({
                  _csrf: csrf
                })
                .expect('Location', '/')
                .end((err, res3) => {
                  authenticatedUser
                    .get(signinUrl)
                    .expect(200, done)
                    .end((err, res4) => {
                      $html = jQuery(res4.text);
                      csrf = $html.find('input[name=_csrf]').val();

                      authenticatedUser
                        .post(signinUrl)
                        .set('cookie', res2.headers['set-cookie'])
                        .send({
                          _csrf: csrf,
                          email: 'wrong@gmail.com',
                          password: signinUser.password
                        })
                        .expect('Location', signinUrl)
                        .expect(302, done);
                    }); // END .end((err, res4) => {
                }); // END .end((err, res3) => {
            }); // END .end((err, res2) => {
        }); // END .end((err, res1) => {
    }); // END it('should NOT able to signin with wrong email', done => {

    // Can't sign with a wrong password
    it('should NOT able to signin with wrong email', done => {
      authenticatedUser
        .get(signupUrl)
        .expect(200, done)
        .end((err, res1) => {
          let $html = jQuery(res1.text);
          let csrf = $html.find('input[name=_csrf]').val();

          authenticatedUser
            .post(signupUrl)
            .set('cookie', res1.headers['set-cookie'])
            .send({
              _csrf: csrf,
              ...signinUser
            })
            .expect('Location', '/user/profile')
            .end((err, res2) => {
              authenticatedUser
                .get(logoutUrl)
                .set('cookie', res2.headers['set-cookie'])
                .send({
                  _csrf: csrf
                })
                .expect('Location', '/')
                .end((err, res3) => {
                  authenticatedUser
                    .get(signinUrl)
                    .expect(200, done)
                    .end((err, res4) => {
                      $html = jQuery(res4.text);
                      csrf = $html.find('input[name=_csrf]').val();

                      authenticatedUser
                        .post(signinUrl)
                        .set('cookie', res2.headers['set-cookie'])
                        .send({
                          _csrf: csrf,
                          email: 'wrong@gmail.com',
                          password: signinUser.password
                        })
                        .expect('Location', signinUrl)
                        .expect(302, done);
                    }); // END .end((err, res4) => {
                }); // END .end((err, res3) => {
            }); // END .end((err, res2) => {
        }); // END .end((err, res1) => {
    }); // END it('should NOT able to signin with wrong email', done => {
  }); // END describe('POST /user/signin', () => {
}); // END describe('Routes : user ', () => {
