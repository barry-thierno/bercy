import { calculImpot } from "./bercy";

describe("Bercy", () => {
  it("Pour Juliette Celibataire delcarant un salire inferieure ou egal à 10064€, elle doit payer un impot brut de  0€", () => {
    const { impotBrute } = calculImpot(1000, 1, 0, "2019");
    expect(impotBrute).toBe("0");
  });

  it("Pour Juliette Celibataire delcarant 20 000€, elle doit payer un impot brut de  1 111,04€", () => {
    const { impotBrute } = calculImpot(20000.0, 1, 0, "2019");
    expect(impotBrute).toEqual("1111");
  });

  it("Pour Romeo Celibataire delcarant 31 000€, elle doit payer un impot brut de  2 514€", () => {
    const { impotBrute } = calculImpot(31000, 1, 0, "2019");
    expect(impotBrute).toEqual("2514");
  });

  it("Pour Romeo Celibataire delcarant 31 000€, elle doit payer un impot brut de  2 514€", () => {
    const { impotBrute } = calculImpot(41000, 1, 0, "2019");
    expect(impotBrute).toEqual("5214");
  });

  it("Pour Romeo&Juliette marié delcarantion commune 61 000€ net de salaires (20 000 + 41 000), ils doivent payer un impot brut de  4 868,08 €", () => {
    const { impotBrute } = calculImpot(61000, 2, 0, "2019");
    expect(impotBrute).toEqual("4868");
  });

  // Changement de taux et de tranches
  it("Pour Juliette Celibataire delcarant un salire inferieure ou egal à 10064€, elle doit payer un impot brut de  0€", () => {
    const { impotBrute } = calculImpot(1000, 1, 0, "2020");
    expect(impotBrute).toBe("0");
  });

  it("Pour Juliette Celibataire delcarant 20 000€, elle doit payer un impot brut de  1 111,04€", () => {
    const { impotBrute } = calculImpot(20000, 1, 0, "2020");
    expect(impotBrute).toEqual("872");
  });

  it("Pour Romeo Celibataire delcarant 41 000€, elle doit payer un impot brut de  2 514€", () => {
    const { impotBrute } = calculImpot(41000, 1, 0, "2020");
    expect(impotBrute).toEqual("5087");
  });

  it("Pour Romeo&Juliette marié delcarantion commune 61 000€ net de salaires (20 000 + 41 000), ils doivent payer un impot brut de  4 868,08 €", () => {
    const { impotBrute } = calculImpot(61000, 2, 0, "2020");
    expect(impotBrute).toEqual("4504");
  });

  it("Pour Romeo&Juliette marié avec enfant delcaration commune 61 000€ net de salaires (20 000 + 41 000), ils doivent payer un impot brut de  4 868,08 € en 2019", () => {
    const { impotBrute } = calculImpot(61000, 2, 1, "2019");
    expect(impotBrute).toEqual("4163");
  });

  // Calcul le nombre de parts

  it("1 enfant", () => {
    const { nbPart } = calculImpot(20000, 0, 1, "2020");
    expect(nbPart).toEqual(0.5);
  });

  it("2 enfants", () => {
    const { nbPart } = calculImpot(41000, 0, 2, "2020");
    expect(nbPart).toEqual(1);
  });

  it("3 enfants", () => {
    const { nbPart } = calculImpot(61000, 0, 3, "2020");
    expect(nbPart).toEqual(2);
  });

  it("4 enfants", () => {
    const { nbPart } = calculImpot(61000, 0, 4, "2020");
    expect(nbPart).toEqual(3);
  });
});
