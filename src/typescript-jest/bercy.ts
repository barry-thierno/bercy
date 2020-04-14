type Tranche = {
  limiteInf: number;
  limiteSup?: number;
  tauxImposition: number;
};

const tranche2019: Tranche[] = [
  {
    tauxImposition: 0.0,
    limiteInf: 0,
    limiteSup: 10064,
  },
  {
    tauxImposition: 0.14,
    limiteInf: 10064,
    limiteSup: 27794,
  },
  {
    tauxImposition: 0.3,
    limiteInf: 27794,
    limiteSup: 74517,
  },
  {
    tauxImposition: 0.41,
    limiteInf: 74517,
    limiteSup: 157806,
  },
  {
    tauxImposition: 0.45,
    limiteInf: 157806,
  },
];
const tranche2020: Tranche[] = [
  {
    tauxImposition: 0.0,
    limiteInf: 0,
    limiteSup: 10064,
  },
  {
    tauxImposition: 0.11,
    limiteInf: 10064,
    limiteSup: 25659,
  },
  {
    tauxImposition: 0.3,
    limiteInf: 25659,
    limiteSup: 73369,
  },
  {
    tauxImposition: 0.41,
    limiteInf: 73369,
    limiteSup: 157806,
  },
  {
    tauxImposition: 0.45,
    limiteInf: 157806,
  },
];
export enum Annee {
  ANNEE_2019 = "2019",
  ANNEE_2020 = "2020",
}
type TranchesParAnnee = { [K in Annee]: Tranche[] };

const anneesParTranche: TranchesParAnnee = {
  [Annee.ANNEE_2019]: tranche2019,
  [Annee.ANNEE_2020]: tranche2020,
};

/**
 * Cacul le nombre de part en fonction du nombre d'adulte ou d'enfant
 * @param nbAdulte
 * @param nbEnfant
 */
const cauclerNbPart = (nbAdulte: number, nbEnfant: number) => {
  let valeurPartEnfant = 0;
  for (let index = 1; index <= nbEnfant; index++) {
    if (index >= 3) {
      valeurPartEnfant += 1;
    } else {
      valeurPartEnfant += 0.5;
    }
  }
  return valeurPartEnfant + nbAdulte;
};

/**
 * Permet de calculer le montant d'impot en prennant en paramètre le salaire brut
 * @param salaireBrut
 */
export const calculImpot = (
  salaireBrut: number,
  nbAdult: number,
  nbEnf: number,
  annee: string
) => {
  const nbPart = cauclerNbPart(nbAdult, nbEnf);
  const salaireImposableParPart = (salaireBrut - salaireBrut * 0.1) / nbPart;
  const tranches = anneesParTranche[annee];
  const impotBrute =
    tranches.reduce((prev: number, curr: Tranche) => {
      if (salaireImposableParPart >= curr.limiteSup) {
        // on paye plein impôt par rapport à la tranche
        return prev + (curr.limiteSup - curr.limiteInf) * curr.tauxImposition;
      } else if (salaireImposableParPart >= curr.limiteInf) {
        // on paye un impôt à la marge
        return Math.trunc(
          prev +
            (salaireImposableParPart - curr.limiteInf) * curr.tauxImposition
        );
      } else {
        // On ne paye pas d'impôt pour cette tranche
        return prev;
      }
    }, 0) * nbPart;
  return {
    impotBrute: `${Math.round(impotBrute)}`,
    tauxImposition: `${toPercent(impotBrute / salaireBrut)}`,
    nbPart,
  };
};

/**
 *  Permet de convertir en pourcentage un float
 * @param n
 */
const toPercent = (n: number) => Math.trunc(n * 10000) / 100;
