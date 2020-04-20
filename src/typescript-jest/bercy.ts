import { Tranche } from "./bercy.model";
import { calculerNbParts, toPercent, getTranchesParAnnee } from "./bercy.service";


/**
 * Permet de calculer le montant d'impot en prennant en paramètre le salaire brut
 * @param salaireBrut
 */
export const calculImpot = (
  salaireBrut: number,
  nbAdults: number,
  nbEnfants: number,
  annee: number
) => {
  const nbParts = calculerNbParts(nbAdults, nbEnfants);
  const salaireImposableParPart = (salaireBrut - salaireBrut * 0.1) / nbParts;
  const tranches = getTranchesParAnnee(annee);
  const impotBrute = tranches.reduce((prev: number, curr: Tranche) => {
    if (salaireImposableParPart >= curr.limiteSup) {
      // on paye plein impôt par rapport à la tranche
      return prev + (curr.limiteSup - curr.limiteInf) * curr.tauxImposition;
    } else if (salaireImposableParPart >= curr.limiteInf) {
      // on paye un impôt à la marge
      return prev + (salaireImposableParPart - curr.limiteInf) * curr.tauxImposition;
    } else {
      // On ne paye pas d'impôt pour cette tranche
      return prev;
    }
  }, 0) * nbParts;
  return {
    impotBrute: Math.trunc(impotBrute),
    tauxImposition: toPercent(impotBrute / salaireBrut),
    nbParts,
  };
};
