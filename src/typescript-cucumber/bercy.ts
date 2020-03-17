/**
 * Permet d'arrondir un nombre flottant, avec deux chiffres après la virgule
 * @param n
 */
const round = (n: number) => +n.toFixed(2);

export const gretting = (name: string) => `Hello word from ${name}!`;
