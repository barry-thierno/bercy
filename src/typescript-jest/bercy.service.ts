import { Tranche, Annee, TranchesParAnnee } from "./bercy.model";

/**
 *  Permet de convertir en pourcentage un float
 * @param n
 */
export const toPercent = (n: number) => Math.trunc(n * 10000) / 100;

/**
 * Cacul le nombre de part en fonction du nombre d'adulte ou d'enfant
 * @param nbAdulte
 * @param nbEnfant
 */
export const calculerNbParts = (nbAdults: number, nbEnfant: number) => {
    let nbPartEnfants = 0;
    if (nbEnfant === 1) {
        nbPartEnfants = 0.5;
    } else if (nbEnfant > 1) {
        nbPartEnfants = nbEnfant - 1;
    }
    return nbAdults + nbPartEnfants;
};

export const CreerTanchesParAnnee = (): TranchesParAnnee => {

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

    return {
        [Annee.ANNEE_2019]: tranche2019,
        [Annee.ANNEE_2020]: tranche2020,
    };
}

export const getTranchesParAnnee = (annee: number): Tranche[] => {
    const tranchesParAnnee = CreerTanchesParAnnee();

    return tranchesParAnnee[annee]
}