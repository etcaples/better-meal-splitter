// make sure to test that array thing:
// when you select on friend, the array length should be 1,
// when you select again, array length should be 2 etc

const assert = require('assert');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('single call', () => {
  it('double done', (done) => {
    // Calling `done()` twice is an error
    setImmediate(done);
    setImmediate(done);
  });
});
