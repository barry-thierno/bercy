# 2. Les Composants

## 2.1. Notion de composant

Les composants vous permettent de diviser l'interface utilisateur en éléments indépendants et réutilisables . L'idée est de séparer une page en plusieurs petits composants réutilisables.

> Nous pouvons définir techniquement la notion de composant de deux manières différentes.

- **Le composant comme une fonction:** Un composant peut être une fonction qui reçoit en entrée des paramètres (Props) et converti ces paramètres en éléments UI (JSX)

  ```jsx
  function WelcomeMessage({ userName }) {
    return (
      <h1>
        Bienvenu sur le site de Bercy <em>{userName}</em>
      </h1>
    );
  }
  // Appel du composant
  <WelcomeMessage userName="Christophe" />;
  ```

  [JsFiddle](https://jsfiddle.net/thies05/9nkvzase/43/)

- **Le composant comme une classe:** Un composant peut être une class qui étends **React.Component** et qui définit la methode **render()**. Cette methode retourne du JSX et peut acceder au paramètre (props) du composant via **this.props**.

  ```jsx
  class WelcomeMessage extends React.Component {
    render() {
      return (
        <h1>
          Bienvenu sur le site de Bercy <span>{this.props.userName}</span>
        </h1>
      );
    }
  }
  // Appel du composant
  <WelcomeMessage userName="Christophe" />;
  ```

  [JsFiddle](https://jsfiddle.net/thies05/9nkvzase/45/)

> - React considère les composants commençant par des lettres minuscules comme des balises DOM. Par exemple, **\<div />** représente une balise HTML div, mais **\<WelcomeMessage />** représente un composant, et exige que l’identifiant WelcomeMessage existe dans la portée courante.
> - Les Props d'un composant sont immutables
>
>   ```javascript
>   // Ce code plante
>   this.props.userName = "Titi";
>   ```

### 2.2 Composant avec état

La notion d'état en React Répond à deux besoins qui sont :

- **Isolé du comportement**: L'idée est de vous permet de découper votre interface en des composants independants et réutilisables ce qui vous permet de concevoir chaque composant de manière isolée.
- **Répondre au changement**: Les applications sont dynamiques, elles changent en fonction des actions utilisateur. Pour mettre en place ces changements, React mets à disposition la notion d'etat.

> _**setState()** est une methode de l'API React qui permet de definir et manipuler l'etat d'un composant_.

```jsx
class ChildrenCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { childrenCount: 0 };
  }

  addChildren() {
    this.setState({
      childrenCount: this.state.childrenCount + 1,
    });
  }

  render() {
    return (
      <div>
        <p>Vous avez {this.state.childrenCount} enfant(s)</p>
        <button onClick={() => this.addChildren()}>Ajouter un enfant</button>
      </div>
    );
  }
}
```

[JsFiddle](https://jsfiddle.net/thies05/9nkvzase/212/)

#### Les 3 règles du state

Le state doit obeir aux trois règles suivantes:

> - On ne peut pas modifier l’état directement
> - Les mises à jour de l’état peuvent être asynchrones
> - Les mises à jour de l’état sont fusionnées

[JsFiddle](https://jsfiddle.net/thies05/9nkvzase/249/)

### 2.3 Cycle de vie d'un composant

React met à disposition une API qui permet de gérer le cycle de vie des composants. Cette API est notamment utile quand il faut allouer ou libérer les ressources utilisées par les composants quand ils sont détruits.

- **Quand le composant est monté :** la méthode **componentDidMount()** permet d’exécuter du code quand le composant est monté _i.e quand le composant apparait dans l’arbre DOM_.
- **Quand le composant est démonté :** la méthode **componentWillUnmount()** permet d’exécuter du code quand le composant est démonté _i.e quand le composant est supprimé dans l’arbre DOM._

```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: computeDurationFrom(this.props.deadline) };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: computeDurationFrom(this.props.deadline),
    });
  }

  render() {
    return (
      <div>
        <h1>Bienvenue sur le simulateur Bercy</h1>
        <h2>
          Il vous reste {format(this.state.date)} pour declarer vos impots 2020
        </h2>
      </div>
    );
  }
}

/**
 * Permet de formater une durée en string
 */
const format = (duration) =>
  `${duration.months()} mois ${duration.days()} jours ${duration.hours()}h:${duration.minutes()}mn:${duration.seconds()}`;

/**
 * Permet de calculer temps restant à partir d'une dealine
 */
const computeDurationFrom = (deadline) =>
  moment.duration(moment(deadline).diff(moment()));
```

[JsFiddle](https://jsfiddle.net/thies05/9nkvzase/163/)

#### 2.3 Intoduction aux Hooks

Avant la version **_16.8_** on utilisait les classes ou **recompose** pour gerer l'état du composant. Les classes offrent la possibilité d'utiliser les fonctionnalités de React comme par exemple le **lifecycle** ou encore le **state**.

Depuis la version **16.8**, on a la possibilité de créer des composants fonctionnels à etat de manière native.

### 2.2 Comment gérer l’état d'un composant fonctionel

pour comprendre le concept d'un état de composant

prenons l'exemple suivant

```jsx
function ChildrenCounter() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « count »
  const [childrenCount, setChildrenCount] = React.useState(0);
  return (
    <div>
      <p>Vous avez {childrenCount} enfant(s)</p>
      <button onClick={() => setChildrenCount(childrenCount + 1)}>
        Ajouter un enfant
      </button>
    </div>
  );
}
```

[JsFiddle](https://jsfiddle.net/thies05/9nkvzase/186/)
