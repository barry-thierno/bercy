export interface Tranche {
    limiteInf: number;
    limiteSup?: number;
    tauxImposition: number;
};

export type TranchesParAnnee = { [K in Annee]: Tranche[] };

export enum Annee {
    ANNEE_2019 = 2019,
    ANNEE_2020 = 2020,
}