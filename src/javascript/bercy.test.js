import { great } from './bercy';

describe('Bercy', () => {
  it('should return hello word', () => {
    const resp = great('test');
    expect(resp).toBe('Hi, test !');
  });
});
