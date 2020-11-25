# 7 La gestion des effets de bord en ReactJs

## 7.1 introduction des effets de bord

Un effet de bord «side effect» est tout ce qui affecte quelque chose en dehors de la portée(scope) de la fonction en cours d'exécution.
Celles-ci peuvent être, par exemple :

- Une requête réseau.
- Faire l'authentification Oauth.
- Manipulation du dom directe.
- Mise à jour du cache.
- faire du logging.

<blockquote>Nous Allons voir comment Reactjs nous facilite la gestion des effets de bord.</blockquote>

## 7.2 Cycle de vie + Schéma du workflow

<div style="text-align:center"><img src="./images/ReacJs-tlife-cycle.jpg" /></div>

Nous avons déjà vue en détail les méthodes du cycle de vie d'un composant React basé sur une classe dans le [deuxième Dojo](https://github.com/barry-thierno/bercy/blob/react_dojo_instructions/src/composant.md).

Prenons les exemples suivants

- <blockquote>Faire un appel réseau</blockquote>

```jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  componentDidMount() {
    // Appel vers une API qui nous renvoie les tranches d'impôts au chargement du composant.
    fetchData("/getTranches").then((data) => this.setState({ data }));
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
```

- <blockquote>Inscriptions/désinscription à des événements</blockquote>

```jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dans cette méthode de cycle de vie nous faisons l'inscription
    ChatAPI.subscribeToFriendStatus(this.props.friend.id);
  }
  componentWillUnmount() {
    // dans cette méthode de cycle de vie nous faisons la désinscription
    ChatAPI.unsubscribeFromFriendStatus(this.props.friend.id);
  }

  render() {
    return this.friend.isOnline ? "Online" : "Offline";
  }
}
```

```jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
    state = {width: 0}
    this.handleResize =  this.handleResize.bind(this)
  }
  function handleResize() {
    this.setState({width: window.innerWidth});
  }
  componentDidMount() {
    // dans cette méthode de cycle de vie nous faisons l'inscription à l'événement du resize
    window.addEventListener("resize", handleResize);
  }
  componentWillUnmount() {
    // dans cette méthode de cycle de vie nous faisons la désinscription de l'événement du resize.
    window.removeEventListener("resize", handleResize);
  }

  render() {
    return  return <p>{this.state.width}</p>;
  }
}
```
- <blockquote>Manipuler directement le Dom</blockquote>

```jsx
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    //Lors du chargement du composant
    document.title = `Vous avez cliqué ${count} fois`;
  }

  componentDidUpdate() {
    //Lors de la mise à jour du composant
    document.title = `Vous avez cliqué ${count} fois`;
  }

  //Notez la duplication de code entre ces deux méthodes de cycle de vie du composant.

  handleChange(event) {
    this.setState({ count: event.target.value });
  }

  render() {
    return (
      <div>
        <input value={this.state.count} onChange={this.handleChange} />
      </div>
    );
  }
}
```

<blockquote>A partir des exemples au-dessus nous déduisons que nous pouvons gérer les effets de bords avec les 3 méthodes du cycles de vie suivants:  <i><b>componentDidMount, componentDidUpdate et componentWillUnmount</b></i>,</blockquote>

#### Pouvons-nous faire la même chose avec un composant fonctionnel?
#### Le réponse est **OUI** :D

<p align="center">
  <img src=./images/but-how.gif alt="functional component">
</p>

## 7.3 Le hook useEffect

### 7.3.1 introduction du hook useEffect

```jsx 
useEffect(callbackFn, dependencies[optionl])
```
Le hook <code>useEffect</code> est un hook qui va nous permettre de déclencher une fonction(effet de bord) de manière asynchrone lors du changement de l'état d'un composant.
Nous pouvons dire que le hook <code>useEffect</code> est un alternatif aux méthodes du cycle de vie : <code>componentDidMount, componentDidUpdate et componentWillUnmount</code>.

<table>
  <tr>
    <td><img src="./images/useEffectHook.png" width=400 height=350></td>
    <td><img src="./images/I-smell-bacon.jpg" width=400 height=350></td>
  </tr>
 </table>

<blockquote>
Le hook <code>useEffect</code> est une  méthode qui prend deux paramètres <code>useEffect(callbackFn, dependencies[optionl])</code>;

- <code>callbackFn</code> : est la fonction qui sera exécutée lorsqu'une des dépendances change (cette fonction est exécutée de manière asynchrone et ne bloquera pas le rendu du composant).
- <code>dependencies</code> : est un tableau qui permet de définir les dépendances de ce hook dans un but d’optimisation (La fonction(callbackFn) sera exécutée uniquement si une des valeurs du tableau a été modifiée depuis l’appel précédent).
</blockquote>

Nous allons essayer de convertir quelques exemples vus précédemment.

Commençons par la manipulation du dom(<code>document</code>) dans un composant fonctionnel

```jsx
import { useState, useEffect } from "react";

function Component() {
  const [count, setCount] = useState(0);

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Vous avez cliqué ${count} fois`;
  });

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
    </div>
  );
}
```

Nous allons prendre un exemple qui nous permet d'illustrer l'importance du deuxième paramètre<<code>dependencies</code>> du hook <code>useEffect</code>.

```jsx
import { useState, useEffect } from "react";

function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `You clicked ${count} times`;

    // Afficher un pop-in
    alert(`Vous avez cliqué ${count} fois`);
  });

  return (
    <div>
      <div>
        <p>Bonjour {name}</p>
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div>
        <p>Vous avez cliqué {count} fois</p>
        <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
      </div>
    </div>
  );
}
```

<blockquote> Problème constaté: Chaque modification de la valeur du champ text:

- Met à jour le state text du composant.
- provoque re-render du composant.
- Force l'exécution de fonction passée en paramètre à useEffect ce que nous ne souhatons pas lors du chargement du text.

Alors pour remédier à ce problème il faut utiliser le deuxième paramètre <code>tableau de dépendances</code> qui nous permet d'exécuter la fonction uniquement si une des valeurs du tableau a été modifiée depuis l’appel précédent </blockquote>

### 7.3.1 Les types du hook useEffect

Il existe deux grands types d’effets de bord dans les composants React : ceux qui ne nécessitent pas de nettoyage, et ceux qui en ont besoin. 
Examinons cette distinction en détail.

## Effets sans nettoyage

Parfois, nous souhaitons exécuter du code supplémentaire après que React a mis à jour le DOM. Les requêtes réseau, les modifications manuelles du DOM, et la journalisation sont des exemples courants d’effets qui ne nécessitent aucun nettoyage. Cela s’explique par le fait qu’ils peuvent être oubliés immédiatement après leur exécution. Comparons donc la manière dont les classes et les Hooks nous permettent d’exprimer ce genre d’effets de bord.

```jsx
function Component() {
  const [name, setName] = useState("John");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  useEffect(() => {
    document.title = `Welcome ${name}`;
    alert(`Bonjour ${name}`);
  });

  return <input type="text" value={name} onChange={handleChangeName} />;
}
```

## Effets avec nettoyage

Nous avons vu précédemment comment écrire des effets de bord ne nécessitant aucun nettoyage. Toutefois, quelques effets peuvent en avoir besoin. Par exemple, nous pourrions souhaiter nous abonner à une source de données externe. Dans ce cas-là, il est impératif de nettoyer par la suite pour éviter les fuites de mémoire ! Comparons les approches à base de classe et de Hooks pour y arriver.

```jsx
import React, { useState, useEffect } from "react";

function Component({ friend }) {
  useEffect(() => {
    // ici nous faisons l'inscription
    ChatAPI.subscribeToFriendStatus(friend.id);

    return function cleanup() {
      // ici nous faisons la désinscription
      ChatAPI.unsubscribeFromFriendStatus(friend.id);
    };
  });

  return friend.isOnline ? "Online" : "Offline";
}
```

```jsx
import React, { useState, useEffect } from "react";

function Component() {
  // Gestion de la taille de l'écran
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return <p>{width}</p>;
}
```

## 7.4 Appels asynchrones Yannick

Nous allons voir ici comment faire un appel asynchrone et utiliser le résultat

```jsx
import { useState, useEffect } from "react";

function Component() {
  const [id, setId] = useState(0);
  const [title, settitle] = useState("");

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setTitle(json.title));
  });

  return (
    <div>
      <p>le title de l'id est : {title}</p>
      <button onClick={() => setId(id + 1)}>Cliquez ici</button>
    </div>
  );
}
```

<div style="text-align:center"><figure>
    <img src=./images/request.png
         alt="functional component">
    <figcaption text-aligh="center" >Pouvons-nous faire la même chose avec un composant fonctionnel</figcaption>
</figure></div>
<blockquote> Problème constaté: Chaque clique sur le bouton

- Met à jour le state du composant
- provoque re-render du composant
- force l'exécution de fonction passée en paramètre à useEffect
- alors ça fait le même appel réseau n fois,

Alors pour Remédier à ce problème il faut utiliser le deuxieme parametre <code>tableu de dépendences</code> qui nous permet d'exécuter la fonction uniquement si une des valeurs du tableau a été modifiée depuis l’appel précédent </blockquote>

```jsx
import { useState, useEffect } from "react";

function Component() {
  const [id, setId] = useState(0);
  const [title, settitle] = useState("");

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    // Faire un appel réseau et mettre à jour le state local
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json())
      .then((json) => setTitle(json.title));
  }, [id]);

  return (
    <div>
      <p>le title de l'id est : {title}</p>
      <button onClick={() => setId(id + 1)}>Cliquez ici</button>
    </div>
  );
}
```


# 8 Les Hooks

## 8.1 Introduction

L’arrivé des hooks renverse ce qu'on a vu précédemment avec les classes et apporte une vision nouvelle à React.
Les Hooks sont arrivés avec React **16.8** avec la transition d'une classe en functional components, Ils vous permettent de bénéficier d’un état local et d’autres fonctionnalités de React sans avoir à écrire une classe.

<div align="center"><img align="center" src=./images/strong-baby.jpg alt="strong "></div>

## 8.2 Quelques Hooks de base: useRef, useCallback, useMemo, useReducer

### 8.2.1 useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

c'est un Alternative à <code>useState</code>. Accepte un une fonction nommée **_reducer_** de type <code>(state, action) => newState</code>, et renvoie l’état local actuel accompagné d’une méthode dispatch. (Si vous avez l’habitude de Redux, vous savez déjà comment ça fonctionne.)

<blockquote>cas d'usage de <code>useReducer</code>?</blockquote>


<code>useReducer</code> est souvent préférable à useState quand vous avez une logique d’état local complexe qui comprend plusieurs sous-valeurs, ou quand l’état suivant dépend de l’état précédent.
<code>useReducer</code> vous permet aussi d’optimiser les performances pour des composants qui déclenchent des mises à jours profondes puisque vous pouvez fournir <code>dispatch</code> à la place de fonctions callback.

<blockquote>Exemple</blockquote>
Prenons par exemple ce composant qui représente une un formulaire avec 5 champs qui appartient à la même entité fonctionnelle(personne). Nous remarquons que nous utilisons <code>useState</code> pour intercepter la valeur de chaque champs. le faite d'utiliser beaucoup de useState rend le composant verbeux, complexe.

<blockquote>
PS: Nous pouvons utiliser qu'un seul hook <code>useState</code> pour gérer ce formulaire mais pour des raisons pédagogiques nous utilisons un hook useState pour chaque champ.
</blockquote>

```jsx
import React, { useState } from "react";

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [adress, setAdress] = useState("");
  const [isMajor, setIsMajor] = useState(false);

  const addAge = ({ target }) => {
    const newAge = target.value;
    setAge(newAge >= 0 ? newAge : age);
    setIsMajor(newAge >= 18);
  }
  
  return (
    <>
      <p>
        Bonour {firstName} {lastName}, vous étes {isMajor ? "majeur" : "mineur"}
      </p>
      <label>Nom: </label>
      <input type="text" value={firstName} onChange={({ target }) => setFirstName(target.value)}/>
      <label> Prénom: </label>
      <input type="text" value={lastName} onChange={({ target }) => setLastName(target.value)}/>
      <label> age: </label>
      <input type="number" value={age} onChange={addAge}/>
      <label> Adresse: </label>
      <input type="text" value={adress} onChange={({ target }) => setAdress(target.value)}/>
    </>
  );
}

```

### 8.2.2 useRef

```jsx
const refContainer = useRef(initialValue);
```

<code>useRef</code> renvoie un objet ref modifiable dont la propriété current est initialisée avec l’argument fourni (initialValue). L’objet renvoyé persistera pendant toute la durée de vie composant.

Un cas d’usage courant consiste à accéder à un enfant de manière impérative :

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const [text, setText] = useState(false);

  const onButtonClick = () => {
    // `current` fait référence au champ textuel monté dans le DOM
    inputEl.current.focus();
  };
  useEffect(() => {
    console.log(text);
  }, [text]);
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Donner le focus au champ</button>
    </>
  );
}
```

<blockquote>Gardez à l’esprit:

- que useRef ne vous notifie pas quand le contenu change. Modifier la propriété
- .current n’entraîne pas un rafraîchissement. Si vous voulez exécuter du code quand React attache ou détache une ref sur un nœud DOM, vous voudrez sans doute utiliser plutôt
</blockquote>

### 8.2.3 useCallback

### 8.2.4 useMemo

## 8.3 Custom hooks

