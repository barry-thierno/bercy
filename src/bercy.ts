type Tranche = {
  limite: number;
  tauxImposition: number;
};
const tranches: Tranche[] = [
  {
    tauxImposition: 0.14,
    limite: 10064
  },
  {
    tauxImposition: 0.3,
    limite: 27794
  },
  {
    tauxImposition: 0.41,
    limite: 74517
  }
];
export const calculImpot = (salaireBrut: number) => {
  const salaireImposable = salaireBrut - salaireBrut * 0.1;
  return tranches.reduce((prev: number, curr) => {
    // console.log(curr.limite);
    if (salaireImposable >= curr.limite) {
      const cal = round(
        prev + (salaireImposable - curr.limite) * curr.tauxImposition
      );
      console.log(salaireBrut + " ", curr.limite, " r:", cal - prev);
      return cal;
    } else {
      return prev;
    }
  }, 0);
};

const round = (n: number) => +n.toFixed(2);
