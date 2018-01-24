const chai = require('chai');
const { assert, expect } = chai;

const db = require('../models');
const { User } = db;

describe('User', () => {
  it('Should create a new User', done => {
    const newUser = {
      name: 'Thai3',
      email: 'thai3@gmail.com'
    };

    User.create(newUser)
      .then(users => {
        const { name, email } = users.dataValues;
        expect(name).to.equal('Thai3');
        expect(email).to.equal('thai3@gmail.com');
      })
      .then(() => done());
  });

  it('Should not create a new User with invalid email', done => {
    const cat = {
      name: 'Cat',
      email: 'cat.com'
    };

    User.create(cat).catch(promise => {
      const { message } = promise.errors[0];
      expect(message).to.equal('Validation isEmail on email failed');
      done();
    });
  });
});
