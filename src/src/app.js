// cette permet de generer un GUID
const tranches = [
  {
    id: 1,
    tauxImposition: 0.0,
    limiteInf: 0,
    limiteSup: 10064,
  },
  {
    id: 2,
    tauxImposition: 0.11,
    limiteInf: 10064,
    limiteSup: 25659,
  },
  {
    id: 3,
    tauxImposition: 0.3,
    limiteInf: 25659,
    limiteSup: 73369,
  },
  {
    id: 4,
    tauxImposition: 0.41,
    limiteInf: 73369,
    limiteSup: 157806,
  },
  {
    id: 5,
    tauxImposition: 0.45,
    limiteInf: 157806,
  },
];

function affichertranchesImposition() {
  const affichageTrange = ({ id, limiteInf, limiteSup, tauxImposition }) => (
    <li key={id}>
      {limiteInf} - {limiteSup ? limiteSup : "à plus"}: {tauxImposition}%
    </li>
  );
  return <ul>{tranches.map((tranche) => affichageTrange(tranche))}</ul>;
}
ReactDOM.render(affichertranchesImposition(), document.querySelector("#app"));
