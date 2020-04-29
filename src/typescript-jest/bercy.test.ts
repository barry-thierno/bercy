import { calculImpot } from "./bercy";
import { calculerNbParts } from "./bercy.service";

describe("Bercy", () => {
  it.each`
    annee   | impotAPayer
    ${2019} | ${0}
    ${2020} | ${0}
  `(
    "en $annee pour Juliette Célibataire déclarant un salaire inferieure ou égal à 10064€, elle doit payer un impôt brut de $impotAPayer€",
    ({ annee, impotAPayer }) => {
      const { impotBrute } = calculImpot(1000, 1, 0, annee);
      expect(impotBrute).toBe(impotAPayer);
    }
  );

  it.each`
    annee   | impotAPayer
    ${2019} | ${1111}
    ${2020} | ${872}
  `(
    "en $annee pour Juliette Célibataire déclarant 20 000€, elle doit payer un impôt brut de  $impotAPayer€",
    ({ annee, impotAPayer }) => {
      const { impotBrute } = calculImpot(20000.0, 1, 0, annee);
      expect(impotBrute).toBe(impotAPayer);
    }
  );

  it.each`
    annee   | impotAPayer
    ${2019} | ${2514}
    ${2020} | ${2387}
  `(
    "En $annee pour Romeo Célibataire déclarant 31 000€, elle doit payer un impôt brut de  $impotAPayer€",
    ({ annee, impotAPayer }) => {
      const { impotBrute } = calculImpot(31000, 1, 0, annee);
      expect(impotBrute).toBe(impotAPayer);
    }
  );

  it.each`
    annee   | impotAPayer
    ${2019} | ${5214}
    ${2020} | ${5087}
  `(
    "en $annee pour Romeo Célibataire déclarant 31 000€, elle doit payer un impôt brut de  $impotAPayer€",
    ({ annee, impotAPayer }) => {
      const { impotBrute } = calculImpot(41000, 1, 0, annee);
      expect(impotBrute).toBe(impotAPayer);
    }
  );

  it.each`
    annee   | nombreEnfant | expectedNombrePart | impotAPayer
    ${2019} | ${0}         | ${2}               | ${4868}
    ${2019} | ${1}         | ${2.5}             | ${4163}
    ${2020} | ${0}         | ${2}               | ${4505}
    ${2020} | ${3}         | ${4}               | ${1610}
    ${2020} | ${4}         | ${5}               | ${503}
  `(
    "en $annee pour Romeo&Juliette marié et ils ont $nombreEnfant enfant(s) déclaration commune 61 000€ net de salaires (20 000 + 41 000), ils doivent payer un impôt brut de  $impotAPayer€",
    ({ annee, nombreEnfant, expectedNombrePart, impotAPayer }) => {
      const { impotBrute, nbParts } = calculImpot(
        61000,
        2,
        nombreEnfant,
        annee
      );
      expect(impotBrute).toEqual(impotAPayer);
      expect(nbParts).toEqual(expectedNombrePart);
    }
  );
});

describe("calcul de nombre de parts", () => {
  // Calcul le nombre de parts

  it.each`
    nombreAdult | nombreEnfant | expectedNombrePart
    ${2}        | ${0}         | ${2}
    ${2}        | ${1}         | ${2.5}
    ${2}        | ${2}         | ${3}
    ${2}        | ${3}         | ${4}
    ${2}        | ${4}         | ${5}
  `(
    "$nombreAdult adult(s) avec $nombreEnfant enfant(s) ils auront $expectedNombrePart parts",
    ({ nombreAdult, nombreEnfant, expectedNombrePart }) => {
      const nbParts = calculerNbParts(nombreAdult, nombreEnfant);
      expect(nbParts).toEqual(expectedNombrePart);
    }
  );
});

describe("CalculImpot avec prise en compte des plafond", () => {
  it.each`
    annee   | nombreEnfant | impotAPayer
    ${2020} | ${1}         | ${11038}
    ${2020} | ${2}         | ${9471}
    ${2020} | ${3}         | ${6337}
  `(
    "en $annee pour Romeo&Juliette marié et ils ont $nombreEnfant enfant(s) déclaration commune 61 000€ net de salaires (20 000 + 41 000), ils doivent payer un impôt brut de  $impotAPayer€",
    ({ annee, nombreEnfant, impotAPayer }) => {
      const { impotBrute } = calculImpot(91000, 2, nombreEnfant, annee);
      expect(impotBrute).toEqual(impotAPayer);
    }
  );
});
