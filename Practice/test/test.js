const app = require('../app');
const expect = require('chai').expect;

describe('App', function() {
  it('Test document', function() {
    const result = app.add(2, 4);

    expect(result).to.be.a('array');
    // expect(result).to.be.([6]);
    expect(result).to.have.lengthOf(1);
    // expect(result).to.have.property('tea').with.lengthOf(1);

    expect(true).to.be.true;
    expect(undefined).to.be.undefined;

    expect({ a: 1 }).to.eql({ a: 1 });
    expect('foobar').to.include('foo');
    expect([1, 2, 3])
      .to.include.ordered.members([1, 2])
      .but.not.include.ordered.members([2, 3]);
    expect({ a: 1, b: 2 }).to.have.all.keys('a', 'b');
  });
});
