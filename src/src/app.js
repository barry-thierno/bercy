function WelcomeMessage() {
  const title = (
    <h1>
      Bienvenu sur le site de Bercy <span> Yannick</span>
    </h1>
  );
  return title;
}
// rendu dans le DOM
ReactDOM.render(WelcomeMessage(), document.querySelector("#app"));