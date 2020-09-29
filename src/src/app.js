function ChildrenCounter() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « count »
  const [childrenCount, setChildrenCount] = React.useState(0);

  React.useEffect(() => {
    document.title = `${childrenCount}`;
  });

  return (
    <div>
      <p>Vous avez {childrenCount} enfant(s)</p>
      <button onClick={() => setChildrenCount(childrenCount + 1)}>
        Ajouter un enfant
      </button>
    </div>
  );
}

function App() {
  return (
    //Appel du composant
    <ChildrenCounter />
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
