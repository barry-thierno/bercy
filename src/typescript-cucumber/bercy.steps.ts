import { defineFeature, loadFeature } from "jest-cucumber";
import { calculImpot } from "./bercy";

const feature = loadFeature("bercy.feature");

defineFeature(feature, test => {
  let salaire: number,
    nbPart: number,
    impotAPayer: string,
    tauxMarginalImpo: string;
  test("Juliette", ({ given, when, then, and }) => {
    given(/^Mon salaire annuel est de (.*) €$/, (salaireEntre: number) => {
      salaire = salaireEntre;
    });

    when("Je veux connaitre ma TMI et mon imposition", () => {
      const { impotBrute, tauxImposition } = calculImpot(salaire, 1);
      impotAPayer = impotBrute;
      tauxMarginalImpo = tauxImposition;
    });

    then(/^Ma TMI est de (.*) %$/, (tmiAttendu: string) => {
      expect(tauxMarginalImpo).toBe(tmiAttendu);
    });

    and(/^Mon imposition est de (.*) €$/, (montantInpotAttendu: string) => {
      expect(impotAPayer).toBe(montantInpotAttendu);
    });
  });

  test("Romeo", ({ given, when, then, and }) => {
    given(/^Mon salaire annuel est de (.*) €$/, (salaireEntre: number) => {
      salaire = salaireEntre;
    });

    when("Je veux connaitre ma TMI et mon imposition", () => {
      const { impotBrute, tauxImposition } = calculImpot(salaire, 1);
      impotAPayer = impotBrute;
      tauxMarginalImpo = tauxImposition;
    });

    then(/^Ma TMI est de (.*) %$/, (tmiAttendu: string) => {
      expect(tauxMarginalImpo).toBe(tmiAttendu);
    });

    and(/^Mon imposition est de (.*) €$/, (montantInpotAttendu: string) => {
      expect(impotAPayer).toBe(montantInpotAttendu);
    });
  });

  test("Romeo prime", ({ given, when, then, and }) => {
    given(/^Mon salaire annuel est de (.*) €$/, (salaireEntre: number) => {
      salaire = salaireEntre;
    });

    when("Je veux connaitre ma TMI et mon imposition", () => {
      const { impotBrute, tauxImposition } = calculImpot(salaire, 1);
      impotAPayer = impotBrute;
      tauxMarginalImpo = tauxImposition;
    });

    then(/^Ma TMI est de (.*) %$/, (tmiAttendu: string) => {
      expect(tauxMarginalImpo).toBe(tmiAttendu);
    });

    and(/^Mon imposition est de (.*) €$/, (montantInpotAttendu: string) => {
      expect(impotAPayer).toBe(montantInpotAttendu);
    });
  });

  test("Romeo et Juliette", ({ given, and, when, then }) => {
    given(/^Mon salaire annuel est de (.*) €$/, (salaireEntre: number) => {
      salaire = salaireEntre;
    });

    and(/^J'ai (.*) parts$/, (nbPartEntres: number) => {
      nbPart = nbPartEntres;
    });

    when("Je veux connaitre ma TMI et mon imposition", () => {
      const { impotBrute, tauxImposition } = calculImpot(salaire, nbPart);
      impotAPayer = impotBrute;
      tauxMarginalImpo = tauxImposition;
    });

    then(/^Ma TMI est de (.*) %$/, (tmiAttendu: string) => {
      expect(tauxMarginalImpo).toBe(tmiAttendu);
    });

    and(/^Mon imposition est de (.*) €$/, (montantInpotAttendu: string) => {
      expect(impotAPayer).toBe(montantInpotAttendu);
    });
  });
});
