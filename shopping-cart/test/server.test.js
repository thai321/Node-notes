const expect = require('expect');
const request = require('supertest');

describe('Server', () => {
  it('should pass this test', done => {
    const foo = [1, 2, 3];
    expect(foo.length).toBe(3);
    done();
  });
  it('should 2 pass this test', done => {
    const foo = [1, 2, 3];
    expect(foo.length).toBe(3);
    done();
  });
});
