const passport = require('passport');
const models = require('../models');
const LocalStrategy = require('passport-local').Strategy;

const Joi = require('joi');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findById(id).then(user => {
    if (user) {
      done(null, user);
    } else {
      done(user.errors, null);
    }
  });
});

// Signup Strategy
passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      const { name, phone } = req.body;

      // Use joi check validation for name, email, and password
      const checkValidate = Joi.validate(
        { name, email, password, phone },
        signUpSchema,
        { abortEarly: false }
      );

      if (checkValidate.error) {
        const messages = checkValidate.error.details.map(
          error => error.message
        );
        return done(null, false, req.flash('error', messages));
      }

      // If user enter the same email => send back a message
      // otherwise, create a new account
      models.User.findOne({ where: { email } }).then(user => {
        if (user) {
          return done(null, false, {
            message: 'Email is already in use'
          });
        } else {
          // Create user if not found
          models.User.create({ name: req.body.name, email, password, phone })
            .then(newUser => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            }) // END Then
            .catch(error => {
              return done(error);
            }); // END catch
        } // END ELSE
      }); // END findOne
    } // END (req, email, password, done)
  )
); // END local Signup

const signUpSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(8)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  phone: Joi.string().length(10)
});

// Signin Strategy
passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      const checkValidate = Joi.validate({ email, password }, signInSchema, {
        abortEarly: false
      });

      if (checkValidate.error) {
        const messages = checkValidate.error.details.map(
          error => error.message
        );
        return done(null, false, req.flash('error', messages));
      }

      models.User.findOne({ where: { email } })
        .then(user => {
          // Handle: Invalid email
          if (!user) {
            return done(null, false, { message: 'Invalid email' });
          }

          // Handle: Invalid password
          if (!user.authenticate(password)) {
            return done(null, false, { message: 'Wrong password' });
          }

          // user found
          return done(null, user);
        })
        .catch(error => done(error));
    } // END (req, email, password, done)
  )
); // END passport Signin

const signInSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});
