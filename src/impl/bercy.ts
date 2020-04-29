import {
  calculerNbParts,
  toPercent,
  calculMajorationQuotienFamilial,
  calculImpotParTranche,
} from "./bercy.service";

const PLAFOND_DEMI_PART = 1567;

export const calculImpot = (
  salaireBrut: number,
  nbAdults: number,
  nbEnfants: number,
  annee: number
) => {
  const nbParts = calculerNbParts(nbAdults, nbEnfants);
  const calcul1 = calculImpotParTranche(salaireBrut, nbParts, annee);
  let impotBrute = calcul1;
  if (nbAdults > 1 && nbEnfants !== 0) {
    const impotAdultes = calculImpotParTranche(salaireBrut, 2, annee);
    const calcul2 =
      impotAdultes -
      PLAFOND_DEMI_PART * calculMajorationQuotienFamilial(nbParts);
    if (calcul1 < calcul2) {
      impotBrute = calcul2;
    }
  }
  return {
    impotBrute: Math.trunc(impotBrute),
    tauxImposition: toPercent(impotBrute / salaireBrut),
    nbParts,
  };
};
