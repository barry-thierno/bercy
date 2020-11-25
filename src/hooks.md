

# 8 Les Hooks

## 8.1 Introduction

L’arrivé des hooks renverse ce qu'on a vu précédemment avec les classes et apporte une vision nouvelle à React.
Les Hooks sont arrivés avec React **16.8** avec la transition d'une classe en functional components, Ils vous permettent de bénéficier d’un état local et d’autres fonctionnalités de React sans avoir à écrire une classe.

<div align="center"><img align="center" src=./images/strong-baby.jpg alt="strong "></div>

## 8.2 Quelques Hooks de base: useRef, useCallback, useMemo, useReducer

### 8.2.1 useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, lazyInitializerFn);
```
<code>useReducer</code> renvoie un pair <code>state</code> l’état local actuel accompagné d’une méthode <code>dispatch</code>. (Si vous avez l’habitude de Redux, vous savez déjà comment ça fonctionne.)

c'est un Alternative à <code>useState</code>. Elle accepte 3 paramètres:
- reducer: une fonction de type <code>(actualState, action) => newState</code>. 
- initialArg: représente l'état initial du state.

- lazyInitializerFn: une fonction qu'on utilise pour faire du Lazy initialization de ***la valeur initiale du state***, si vous voulez initier votre state par le résultat d'une méthode qui fait un calcul coûteux.
 

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

Nous allons utiliser <code>useReducer(reducer, initialArg, lazyInitializerFn);</code> pour extraite la logique et la complexité dans une fonction nommée par convention <code>reducer</code>.

```jsx
import React, { useReducer } from "react";

// la valeur initil de notre state
const initialValue = {firstName: "", lastName: "", age: 0, address: "", isMajor: false};

// Actions
const UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME";
const UPDATE_LASTNAME = "UPDATE_LASTNAME";
const UPDATE_AGE = "UPDATE_AGE";
const UPDATE_ADRESS = "UPDATE_ADRESS";

// Nous pouvons mettre cette fonction dans un fichier qu'on peut ruétiliser par exemple.
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FIRSTNAME:
      return { ...state, firstName: action.value };
    case UPDATE_LASTNAME:
      return { ...state, lastName: action.value };
    case UPDATE_AGE:
      return { ...state, age: action.value >= 0 ? action.value : 0, isMajor: action.value >= 18 };
    case UPDATE_ADRESS:
      return { ...state, address: action.value };
    default:
      return state;
  }
};

// Un composant plus leger. 
export default function Form() {
  
  // pas de complexité, un seul Hook pour tous les champs
  const [{ firstName, lastName, age, address, isMajor }, dispatch] = useReducer(reducer, initialValue);

  const updateFieldValue = (type, value) => dispatch({ type, value });

  return (
    <>
      <p>Bonour {firstName} {lastName}, vous étes {isMajor ? "majeur(e)" : "mineur(e)"}</p>
      <label>Nom: </label>
      <input type="text" value={firstName} onChange={({ target }) => updateFieldValue(UPDATE_FIRSTNAME, target.value)}/>
      <label> Prénom: </label>
      <input type="text" value={lastName} onChange={({ target }) => updateFieldValue(UPDATE_LASTNAME, target.value)}/>
      <label> age: </label>
      <input type="number" value={age} onChange={({ target }) => updateFieldValue(UPDATE_AGE, target.value) } />
      <label> Adresse: </label>
      <input type="text" value={address} onChange={({ target }) => updateFieldValue(UPDATE_ADRESS, target.value)}/>
    </>
  );
}

 ```
<blockquote>
  Grâce au hook <code>useReducer</code>, nous avons rendu le composant Form leger et compacte, parce que nous avons extrait la logic et sa complexité dans une fonction externe <code>reducer</code>

  Nous pouvons aussi déplacer la fonction <code>useReducer</code> dans un fichier si nous voulons réutiliser la même logique dans d'autre composants
</blockquote>
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

