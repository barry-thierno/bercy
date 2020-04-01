const tranches = [
  {
    tauxImposition: 0.0,
    limiteInf: 0,
    limiteSup: 10064
  },
  {
    tauxImposition: 0.14,
    limiteInf: 10064,
    limiteSup: 27794
  },
  {
    tauxImposition: 0.3,
    limiteInf: 27794,
    limiteSup: 74517
  },
  {
    tauxImposition: 0.41,
    limiteInf: 74517,
    limiteSup: 157806
  },
  {
    tauxImposition: 0.45,
    limiteInf: 157806
  }
];

/**
 * Permet de calculer le montant d'impot en prennant en paramètre le salaire brut
 * @param salaireBrut
 */
var calculImpot = (salaireBrut, nbPart) => {
  const salaireImposableParPart = (salaireBrut - salaireBrut * 0.1) / nbPart;
  const impotBrut =
    tranches.reduce((prev, curr) => {
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
    impotBrut: `${impotBrut}`,
    tauxImposition: `${toPercent(impotBrut / salaireBrut)}`
  };
};

/**
 *  Permet de convertir en pourcentage un float
 * @param n
 */
const toPercent = n => Math.trunc(n * 10000) / 100;

module.exports = {
  calculImpot
};
