/* eslint-disable */
const PLAFOND_DEMI_PART = 1567;

/**
 *  Permet de convertir en pourcentage un float
 * @param n
 */
const toPercent = n => Math.trunc(n * 10000) / 100;

/**
 * Cacul le nombre de part en fonction du nombre d'adulte ou d'enfant
 * @param nbAdulte
 * @param nbEnfant
 */
const calculerNbParts = (nbAdults, nbEnfant) => {
  let nbPartEnfants = 0;
  if (nbEnfant === 1) {
    nbPartEnfants = 0.5;
  } else if (nbEnfant > 1) {
    nbPartEnfants = nbEnfant - 1;
  }
  return nbAdults + nbPartEnfants;
};

const CreerTanchesParAnnee = () => {
  const tranche2019 = [
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
  const tranche2020 = [
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

  return {
    [2019]: tranche2019,
    [2020]: tranche2020,
  };
};

const getTranchesParAnnee = annee => {
  const tranchesParAnnee = CreerTanchesParAnnee();

  return tranchesParAnnee[annee];
};

/**
 * Permet de calculer le montant d'impot par tranche en prennant en paramètre le salaire brut
 * @param salaireBrut
 * @param nbPart
 * @param annee
 */
const calculImpotParTranche = (salaireBrut, nbParts, annee) => {
  const salaireImposableParPart = (salaireBrut - salaireBrut * 0.1) / nbParts;
  const tranches = getTranchesParAnnee(annee);
  const impotBrute =
    tranches.reduce((prev, curr) => {
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
};

/**
 *
 * @param nbPart
 */
const calculMajorationQuotienFamilial = nbPart => 2 * (nbPart - 2);

/**
 *
 * @param {numer} salaryAmount
 * @param {number} adultNumber
 * @param {number} numberOfChildren
 * @param {number} year
 */
export const computeTaxeService = (
  salaryAmount,
  adultNumber,
  numberOfChildren,
  year
) => {
  const numberOfShares = calculerNbParts(adultNumber, numberOfChildren);
  const calcul1 = calculImpotParTranche(salaryAmount, numberOfShares, year);
  let taxAmount = calcul1;
  if (adultNumber > 1 && numberOfChildren !== 0) {
    const impotAdultes = calculImpotParTranche(salaryAmount, 2, year);
    const calcul2 =
      impotAdultes -
      PLAFOND_DEMI_PART * calculMajorationQuotienFamilial(numberOfShares);
    if (calcul1 < calcul2) {
      taxAmount = calcul2;
    }
  }
  return {
    taxAmount: Math.trunc(taxAmount),
    taxRate: toPercent(taxAmount / salaryAmount),
    numberOfShares,
  };
};
