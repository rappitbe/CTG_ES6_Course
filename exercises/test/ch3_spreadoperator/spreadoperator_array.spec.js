 import { assert } from 'chai';

// To do: make all tests pass, leave the assert lines unchanged!
describe('rest with destructuring', () => {

  it('rest parameter must be last', () => {
    const [...all, testValue] = [1, 2, 3, 4];
    assert.deepEqual(all, [1, 2, 3, 4]);
  });

  it('extracts each array item', function() {
    const [b, a] = [...[1, 2]];
    assert.equal(a, 1);
    assert.equal(b, 2);
  });

  it('in combination with rest', function() {
    const [a, b, ...rest] = [...[0, 1, 2, 3, 4, 5]];
    assert.equal(a, 1);
    assert.equal(b, 2);
    assert.deepEqual(rest, [3, 4, 5]);
  });

  it('assign rest of an array to a variable', () => {
    const [...all] = [1, 2, 3, 4];
    assert.deepEqual(all, [2, 3, 4]);
  });

  // the following are actually using `spread` ... oops, to be fixed
  it('concat differently', () => {
    const theEnd = [3, 4];
    const allInOne = [1, 2, ...[theEnd]];
    assert.deepEqual(allInOne, [1, 2, 3, 4]);
  });

  it('concat two arrays', () => {
    const theStart = [1, 3];
    const theEnd = [3, 4];
    const allInOne = [...theStart, ...theEnd];
    assert.deepEqual(allInOne, [1, 2, 3, 4]);
  });

  it('`apply` made simple, even for constructors', () => {
    const theDate = [2015, 1, 1];
    const date = new Date(theDate);
    assert.deepEqual(new Date(2015, 1, 1), date);
  });

});
