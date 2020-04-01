const { calculImpot } = require('./bercy');

describe('Bercy', () => {
  it('Pour Juliette Célibataire déclarant un salaire inferieure ou égal à 10064€, elle doit payer un impôt brut de  0€', () => {
    const { impotBrut } = calculImpot(1000, 1);
    expect(impotBrut).toBe('0');
  });

  it('Pour Juliette Célibataire déclarant 20 000€, elle doit payer un impôt brut de  1 111,04€', () => {
    const { impotBrut } = calculImpot(20000.0, 1);
    expect(impotBrut).toEqual('1111');
  });

  it('Pour Romeo Célibataire déclarant 31 000€, elle doit payer un impôt brut de  2 514€', () => {
    const { impotBrut } = calculImpot(31000, 1);
    expect(impotBrut).toEqual('2514');
  });

  it('Pour Romeo Célibataire déclarant 31 000€, elle doit payer un impôt brut de  2 514€', () => {
    const { impotBrut } = calculImpot(41000, 1);
    expect(impotBrut).toEqual('5214');
  });

  it('Pour Romeo&Juliette marié déclaration commune 61 000€ net de salaires (20 000 + 41 000), ils doivent payer un impôt brut de  4 868,08 €', () => {
    const { impotBrut } = calculImpot(61000, 2);
    expect(impotBrut).toEqual('4868');
  });
});
