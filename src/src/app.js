function Compteur() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « count »
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
    </div>
  );
}

function App() {
  return (
    //Appel du composant
    <Compteur />
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
