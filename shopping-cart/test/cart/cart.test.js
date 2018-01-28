const chai = require('chai');
const request = require('supertest');
const bodyParser = require('body-parser');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
var jQuery = require('jquery')(window);

const expect = chai.expect;
chai.config.includeStack = true;

const { app } = require('../../app');
const models = require('../../models');
const { Session } = models.sequelize.models;

app.use(bodyParser.json());
const authenticatedUser = request.agent(app);

describe('Routes : cart', () => {
  const homepage = '/';
  const addToCartUrl = '/add-to-cart/';

  describe('Anonymous or no login', () => {
    describe('GET /add-to-cart/:id', () => {
      it('should create a new cart and add to session', done => {
        authenticatedUser
          .get(homepage)
          .expect(res => {
            console.log(res.body);
          })
          .end(done);
      }); // END it('should create a new cart and add to session', done => {
    }); // END describe('GET /add-to-cart/:id', () => {
  }); // END describe('Anonymous or no login', () => {
}); // END describe('Routes : cart', () => {
