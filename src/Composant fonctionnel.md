# Les bases

## 1. Composant Fonctionnel

<dl>
<dd>

Les composants vous permettent de diviser l'interface utilisateur en éléments indépendants et réutilisables . C'est la beauté de React; nous pouvons séparer une page en plusieurs petits composants réutilisables.

Avant React v14, nous pouvions créer un composant React avec l'aide de `React.Component` (dans ES6) ou `React.createClass` (dans ES5), qu'il nécessite ou non un état pour gérer les données du composant.

React v14 a introduit un moyen plus simple de définir des composants, généralement appelés composants fonctionnels sans/état état .
Ces composants utilisent des fonctions JavaScript simples.

```javascript
function maFonction() {
  return "ReactJs";
}
```

Ou sous forme d'une fonction fléchée

```javascript
const maFonction = () => "ReactJs";
```

</dd>

## 2. Composant sans état (Stateless)

<dd>

Maintenant on va créer un composant React **_Welcome_** qui nous affiche un message.

En utilisant une classe de **_ES6_**(Statefull)

```JSX
class Welcome extends React.Component {
    render() {
        return <h1>Hello, Je suis votre Composant React</h1>;
    }
}
```

pour créer un **_Composant Fonctionel_** il nous faut une fonction javascript simple qui nous retourne un code JSX.

**ES5(ancienne version de js)**

```javascript
function Welcome() {
  return <h1>Hello, Je suis votre Composant React</h1>;
}
```

ou sous forme d'une fonction fléchée

```javascript
const Welcome = () => <h1>Hello, Je suis votre Composant React</h1>;
```

Par fois notre composant peut recevoire des données du composant **_appelant(Conteneur ou Père)_** afin de dynamiser notre composant.
Dans ce cas il faut passer un parametre à notre fonction par convention nommé props, ce dernier contiendra toutes les données envoyées par le **_Composant Appelant_**


```javascript
function Welcome(props) {
  return <h1>Hello {props.name}, Je suis votre Composant React</h1>;
}
```

Ou

```javascript
const Welcome = (props) => (
  <h1>Hello {props.name}, Je suis votre Composant React</h1>
);
```

**_Récapitulatif_**

Un **_composant fonctionnel_** est une fonction javascript qui accepte un seul argument d'objet nommé props et renvoie un élément React.

Les **_composant fonctionnel_** sans état se concentrent généralement sur **_l'interface utilisateur_**.

L'état doit être géré par des **_composants appelants (Conteneur ou Père) de niveau supérieur_**.

Les **_composant fonctionnel_** sans état ne prennent pas en charge les méthodes d'état ou de cycle de vie.

</dd>
</dl>

### 2.1 Composant avec état
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
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}
```
