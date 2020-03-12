import { calculImpot } from "./bercy";

describe("Bercy", () => {
  it("Pour Juliette Celibataire delcarant un salire inferieure ou egal à 10064€, elle doit payer un impot brut de  0€", () => {
    const impotBrut = calculImpot(1000);
    expect(impotBrut).toBe(0);
  });

  it("Pour Juliette Celibataire delcarant 20 000€, elle doit payer un impot brut de  1 111,04€", () => {
    const impotBrut = calculImpot(20000.0);
    expect(impotBrut).toEqual(1111.04);
  });

  it("Pour Romeo Celibataire delcarant 31 000€, elle doit payer un impot brut de  2 514€", () => {
    const impotBrut = calculImpot(31000);
    expect(impotBrut).toEqual(2514);
  });

  it("Pour Romeo Celibataire delcarant 31 000€, elle doit payer un impot brut de  2 514€", () => {
    const impotBrut = calculImpot(41000);
    expect(impotBrut).toEqual(5214);
  });
});
