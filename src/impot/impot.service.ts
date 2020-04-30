import { Injectable } from '@nestjs/common';
import {
  Impot,
  Situation,
  ImpotResult,
  TranchesParAnnee,
  Tranche,
} from './impot.interface';
import { ALL_TRANCHES } from './impot.constant';

const PLAFOND_DEMI_PART = 1567;
/**
 *  Permet de convertir en pourcentage un float
 * @param n
 */
const toPercent = (n: number) => Math.trunc(n * 10000) / 100;

@Injectable()
export class ImpotService {
  calculImpot(impotData: Impot): ImpotResult {
    const { salaireBrut, situation, nombreEnfants, annee } = impotData;
    const nbAdults = situation === Situation.CELIBATAIRE ? 1 : 2;
    const nbParts = this.calculerNbParts(nbAdults, nombreEnfants);
    const calcul1 = this.calculImpotParTranche(salaireBrut, nbParts, annee);
    let impotBrute = calcul1;
    if (nbAdults > 1 && nombreEnfants !== 0) {
      const impotAdultes = this.calculImpotParTranche(salaireBrut, 2, annee);
      const calcul2 =
        impotAdultes -
        PLAFOND_DEMI_PART * this.calculMajorationQuotienFamilial(nbParts);
      if (calcul1 < calcul2) {
        impotBrute = calcul2;
      }
    }
    return {
      impotBrute: Math.trunc(impotBrute),
      tauxImposition: toPercent(impotBrute / salaireBrut),
      nbParts,
    };
  }
  /**
   * retourne les tranches d'imposition par année
   * @param annee
   */
  getTranchesByAnnee(annee: number): Tranche[] {
    return ALL_TRANCHES[annee];
  }

  getAllTranches(): TranchesParAnnee {
    return ALL_TRANCHES;
  }

  /**
   * Cacul le nombre de part en fonction du nombre d'adulte ou d'enfant
   * @param nbAdulte
   * @param nbEnfant
   */
  private calculerNbParts(nbAdults: number, nbEnfant: number) {
    let nbPartEnfants = 0;
    if (nbEnfant === 1) {
      nbPartEnfants = 0.5;
    } else if (nbEnfant > 1) {
      nbPartEnfants = nbEnfant - 1;
    }
    return nbAdults + nbPartEnfants;
  }

  /**
   * Permet de calculer le montant d'impot par tranche en prennant en paramètre le salaire brut
   * @param salaireBrut
   * @param nbPart
   * @param annee
   */
  private calculImpotParTranche(
    salaireBrut: number,
    nbParts: number,
    annee: number,
  ) {
    const salaireImposableParPart = (salaireBrut - salaireBrut * 0.1) / nbParts;
    const tranches = ALL_TRANCHES[annee];
    const impotBrute =
      tranches.reduce((prev: number, curr: Tranche) => {
        if (salaireImposableParPart >= curr.limiteSup) {
          // on paye plein impôt par rapport à la tranche
          return prev + (curr.limiteSup - curr.limiteInf) * curr.tauxImposition;
        } else if (salaireImposableParPart >= curr.limiteInf) {
          // on paye un impôt à la marge
          return (
            prev +
            (salaireImposableParPart - curr.limiteInf) * curr.tauxImposition
          );
        } else {
          // On ne paye pas d'impôt pour cette tranche
          return prev;
        }
      }, 0) * nbParts;
    return impotBrute;
  }

  /**
   *
   * @param nbPart
   */
  calculMajorationQuotienFamilial = (nbPart: number) => 2 * (nbPart - 2);
}
