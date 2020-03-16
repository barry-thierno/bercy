import { calculImpot } from "./bercy";

describe("Bercy", () => {
  it("Pour Juliette Celibataire delcarant un salire inferieure ou egal à 10064€, elle doit payer un impot brut de  0€", () => {
    const { impotBrute } = calculImpot(1000, 1);
    expect(impotBrute).toBe(0);
  });

  it("Pour Juliette Celibataire delcarant 20 000€, elle doit payer un impot brut de  1 111,04€", () => {
    const { impotBrute } = calculImpot(20000.0, 1);
    expect(impotBrute).toEqual(1111.04);
  });

  it("Pour Romeo Celibataire delcarant 31 000€, elle doit payer un impot brut de  2 514€", () => {
    const { impotBrute } = calculImpot(31000, 1);
    expect(impotBrute).toEqual(2514);
  });

  it("Pour Romeo Celibataire delcarant 31 000€, elle doit payer un impot brut de  2 514€", () => {
    const { impotBrute } = calculImpot(41000, 1);
    expect(impotBrute).toEqual(5214);
  });

  it("Pour Romeo&Juliette marié delcarantion commune 61 000€ net de salaires (20 000 + 41 000), ils doivent payer un impot brut de  4 868,08 €", () => {
    const { impotBrute } = calculImpot(61000, 2);
    expect(impotBrute).toEqual(4868.08);
  });
});
