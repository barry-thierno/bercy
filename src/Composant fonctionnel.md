# Les bases

## 1. Notion de composant

Les composants vous permettent de diviser l'interface utilisateur en éléments indépendants et réutilisables . l'idée est de séparer une page en plusieurs petits composants réutilisables.

> Nous pouvons définir technique la notion de composant de deux manières différentes.

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

> _React considère les composants commençant par des lettres minuscules comme des balises DOM. Par exemple, **\<div />** représente une balise HTML div, mais **\<WelcomeMessage />** représente un composant, et exige que l’identifiant WelcomeMessage existe dans la portée courante._

### 2.1 Composant avec état

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

#### 2.1.1 intoduction des Hooks

Depuis la version **_16.8_**, on a la possibilité de créer des composants fonctionnels statefull qui peuvent gérer leurs propres états avec l'arrivé de la nouvelle feature qui renverse toutes nos connaissance sur ce qu'on a acquis avant la version **_16.8_**
Avant la version **_16.8_** nous utilisant les calsses pour gerer l'état du composant car l'avantage des **_classes_** est la possibilité d'utiliser les fonctionnalités de React comme par exemple le **lifecycle** ou encore le **state**.

C'est très précisement à ce niveau qu'interviennent les hooks. Il est dorénavant possible d'avoir accès à ces deux concepts en utilisant que des fonctions simples.

### 2.2 comment gérer l’état d'un composant fonctionel (statefull)

pour comprendre le concept d'un état de composant

prenons l'exemple suivant

```javascript
function Example() {
  // Déclare une nouvelle variable d'état, que l'on va appeler « count »
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
    </div>
  );
}
```
