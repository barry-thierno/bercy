# 2. Les Composants

## 2.1. Notion de composant

Les composants vous permettent de diviser l'interface utilisateur en éléments indépendants et réutilisables . L'idée est de séparer une page en plusieurs petits composants réutilisables (Atomic desgin).

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
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Bienvenue sur Bercy!</h1>
        <h2>Il est {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[JsFiddle](https://jsfiddle.net/thies05/9nkvzase/262/)

**:weight_lifting_man: Exercice 2: Creation d'un composant Timer pour Bercy**

- Ce composant devrait afficher le nombre de jours, heure, minute et seconde restant avant clôture de la déclaration des impôts (voir image ci-dessous)

  ![Tranches impot](./images/timer.jpg)

- Ce composant reçoit en paramètre la date de fin en props (dealine)

  ```jsx
  <Timer deadline="2020-12-31" />
  ```

- Quelques fonctions utilitaires

  ```javascript
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

- Pensez à liberer les ressources quand le composant est supprimé du DOM

  [JsFiddle: Solution](https://jsfiddle.net/thies05/9nkvzase/163/)

#### 2.3 Intoduction aux Hooks

Avant la version **_16.8_** on utilisait les classes ou **recompose** pour gerer l'état du composant. Les classes offrent la possibilité d'utiliser les fonctionnalités de React comme par exemple le **lifecycle** ou encore le **state**.

Depuis la version **16.8**, on a la possibilité de créer des composants fonctionnels à etat de manière native.

### 2.3.1 Comment gérer l’état d'un composant fonctionel

> **Qu’est-ce qu’un Hook ?** Un Hook est une fonction qui permet de « se brancher » sur des fonctionnalités React. (source reactjs.org)

### Le hooks useState

Dans une classe, on initialise l’état local childrenCount à 0 en définissant this.state à { childrenCount: 0 } dans le constructeur. Dans une fonction composant, nous ne pouvons pas écrire ou lire **this.state** puisqu’il n’y a pas de **this**. Le Hook **useState** nous permet d'ajouter un etat local à notre composant fonctionnel.

```jsx
const [childrenCount, setChildrenCount] = React.useState(0);
```

- **Que fait le code ci-dessus ?**
  Ça déclare une « variable d’état ». Notre variable est appelée childrenCount mais nous aurions pu l’appeler n’importe comment, par exemple banane. C’est un moyen de « préserver » des valeurs entre différents appels de fonctions.

- **A quoi correspond l'argument ?**
  Le seul argument à passer au Hook useState() est l’état initial. Contrairement à ce qui se passe dans les classes, l’état local n’est pas obligatoirement un objet. Il peut s’agir d’un nombre ou d’une chaîne de caractères si ça nous suffit.
- **Que renvoie useState ?**
  Elle renvoie une paire de valeurs : l’état actuel et une fonction pour le modifier. C’est pourquoi nous écrivons const [count, setCount] = useState(). C’est semblable à this.state.count et this.setState dans une classe, mais ici nous les récupérons en même temps.

Transformons notre composant ChildrenCounter en composant fonctionnel

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

### 2.3.2 Comment gérer le cycle de vie d'un composant fonctionnel

Nous avons vu dans les précédentes parties que les composants React ont un cycle de vie. Nous nous sommes intéressés à la fonction qui est exécutée quand le composant est monté et celle exécutée quand le composant est démonté. Ces fonctions ne sont valables que dans les **Class component**.
Pour gérer le cycle de vie dans un **Functionnal component**, React expose un Hook qui s’appelle **useEffect** qui permet de faire les effets de bord.

```javascript
useEffect(() => {
  document.title = `${date}`;
});
```

- **Que fait useEffect ?** On utilise ce Hook pour indiquer à React que notre composant doit exécuter quelque chose _après chaque affichage_. React enregistre la fonction passée en argument (que nous appellerons **« effect »**), et l’appellera plus tard, après avoir mis à jour le DOM. L’effet ci-dessus met à jour le titre du document.

- **Pourquoi useEffect est-elle invoquée à l’intérieur d’un composant ?** Le fait d’appeler useEffect à l’intérieur de notre composant nous permet d’accéder à la variable d’état **date** (ou à n’importe quelle prop) directement depuis l’effet.

- **Quand est-ce que useEffect est appelée ?** Elle est exécutée par défaut après le premier affichage et après chaque mise à jour. (Nous verrons comment personnaliser et optimiser ça ultérieurement.) Au lieu de penser en termes de _montage_ et de _démontage_, pensez plutôt que les effets arrivent tout simplement « après l’affichage ». React garantit que le DOM a été mis à jour avant chaque exécution des effets.

> [JsFiddle: Exemples](https://jsfiddle.net/thies05/9nkvzase/289/)

- **Comment libérer les ressources quand le composant est démonté ?** L’API met à disposition un mécanisme optionnel qui permet de libérer les ressources. La fonction **useEffecct** peut retourner une fonction. Le code de cette fonction est exécuté quand le composant est démonté du DOM.

  ```javascript
  useEffect(() => {
    // code executé pour le useEffect
    // Indique comment nettoyer l'effet :
    return function cleanup() {
      // Liberez les ressources
    };
  });
  ```

  **:weight_lifting_man: Exercice 3: Refactorer le composant Timer pour le transformer en functionnal component**
