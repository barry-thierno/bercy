const { great } = require('./bercy');

describe('Bercy', () => {
  it('should return hello word', () => {
    const resp = great('test');
    expect(resp).toBe('Hi, test !');
  });
});
