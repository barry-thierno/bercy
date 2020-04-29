export interface Impot {
  salaireBrut: number;
  situation: Situation;
  nombreEnfants: number;
  annee: number;
}

export enum Situation {
  CELIBATAIRE = 'Celibataire',
  MARIE = 'Marie',
}

export interface Tranche {
  limiteInf: number;
  limiteSup?: number;
  tauxImposition: number;
}

export type TranchesParAnnee = { [K in Annee]: Tranche[] };

export enum Annee {
  ANNEE_2019 = 2019,
  ANNEE_2020 = 2020,
}

export interface ImpotResult {
  impotBrute: number;
  tauxImposition: number;
  nbParts: number;
}
