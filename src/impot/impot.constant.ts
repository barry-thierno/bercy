import { Tranche, Annee } from './impot.interface';

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
export const ALL_TRANCHES = {
  [Annee.ANNEE_2019]: tranche2019,
  [Annee.ANNEE_2020]: tranche2020,
};
