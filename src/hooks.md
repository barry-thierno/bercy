

# 8 Les Hooks

## 8.1 Introduction

L’arrivé des hooks renverse ce qu'on a vu précédemment avec les classes et apporte une vision nouvelle à React.
Les Hooks sont arrivés avec React **16.8** avec la transition d'une classe en functional components, Ils vous permettent de bénéficier d’un état local et d’autres fonctionnalités de React sans avoir à écrire une classe.

<div align="center"><img align="center" src=./images/strong-baby.jpg alt="strong "></div>

## 8.2 Quelques Hooks de base: useRef, useCallback, useMemo, useReducer

### 8.2.1 useRef

```jsx
const refContainer = useRef(initialValue);
```

<code>useRef</code> renvoie un objet ref <code>{current: initialValue}</code> modifiable dont la propriété current est initialisée avec l’argument fourni (initialValue). L’objet renvoyé persistera pendant toute la durée de vie composant.

La déffirence entre <code>useRef</code> et un objet <code>const myObject = {current: initialValue}</code> déclaré manuellement dans le composant, est que l'object <code>refContainer</code> retourné par le hook<code>useRef</code> garde la même valeur pendant toute la durée de vie du composant après des re-render. Par contre les objects déclarés manuellement dans le composant reviennt à leur état initial après chaque re-render.

Un cas d’usage courant consiste à accéder aau DOM  d'un enfant de manière impérative :

```jsx
function TextInputWithFocusButton() {
  const inputRef = useRef(null);
  //inputRef sera toujours {current: value} aprés tous les re-renders. 

  const onButtonClick = () => {
    // `current` fait référence au champ textuel monté dans le DOM
    inputEl.current.focus();
    inputEl.current.value = "le champs de text est valorisé";
  };
  
  return (
    <>
      // ça ressemble à const myInputTextNode = document.querySelector("#myInputText")
      <input id="myInputText" ref={inputRef} type="text" />
      <button onClick={onButtonClick}>Donner le focus au champ</button>
    </>
  );
}
```
[Code sourse](https://codesandbox.io/s/useref-dom-node-9iksy).
Dans cette exemple React alimente la propriété .curent de notre inptRef avec le nœud(DOM) du champ de text, qui nous permet d'accéder à toutes les propriétés de l'input et les manipuler ou cas besoin.

useRef returns a plain JavaScript object, so it can be used for holding more than just DOM nodes — it can hold whatever value you want. This makes it the perfect choice for simulating instance-like variables in functional components:

useRef renvoie un objet JavaScript simple, il peut donc être utilisé pour contenir autres valeurs qu'un simple nœuds DOM, il peut contenir la valeur de votre choix.


<blockquote>Gardez à l’esprit:

- que useRef ne vous notifie pas quand le contenu change. 
- Modifier la propriété .current n’entraîne pas un rafraîchissement. 
- Si vous voulez exécuter du code quand React attache ou détache une ref sur un nœud DOM, vous voudrez sans doute utiliser plutôt une [ref à base de fonction de rappel](https://fr.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node).
</blockquote>

### 8.2.2 useCallback

```jsx
const memoizedCallback = useCallback(callbackFn, arrayDependency)
```
<blockquote>
  useCallback Returns a memoized callback.
</blockquote>

Avant de plonger dans l'utilisation de useCallback(), distinguons le problème résolu par l'arrivé du hook <code>useCallback()</code> 

ReactJs nous fourni le hook <code>useCallback</code> pour le contrôle d'égalité des fonctions.

prenons cet exemple

```js
function factory() {
  return (a, b) => a + b;
}

const sum1 = factory();
const sum2 = factory();

sum1(1, 2); // => 3
sum2(1, 2); // => 3

sum1 === sum2; // => false
sum1 === sum1; // => true

```
Il faut savoir que les fonctions sont des objets réguliers.
alors la comparaison des deux methodes donne **false** car les deux fonctions ont deux références différentes sachant qu'elles retourne la même chose.

```jsx
import React from 'react';

function ParentComponent() {
  // handleClick is re-created on each render
  const handleClick = () => {
    console.log('Clicked!');
  };

  return (
    ......
    ......
    <ChildComponent handleClick={handleClick} />
  )
}

```
Il faut noté que à chaque re-render Reactjs réécrit la fonction handleClick après chaque render.

Alors l'interêt du hook <code>useCallback</code> est d'empécher de réecrire une méthode si elle fait la même traitement.

<code>useCallback</code> prend deux paramètres:

- callbackFn: est la fonction qui concernée, cette méthode se réécrit lorsqu'une des dépendances change (cette fonction est exécutée de manière asynchrone et ne bloquera pas le rendu du composant).

- arrayDependency: est un tableau qui permet de définir les dépendances de ce hook dans un but d’optimisation (La fonction(callbackFn) sera exécutée uniquement si une des valeurs du tableau a été modifiée depuis l’appel précédent).

Utiliser React.memo pour dire à React de ne pas faire le re-rendering non nécessaires lorsque les props ne changent pas leur valeurs.

```jsx
port default function ParentComponent() {
  const [company, setCompany] = useState("");
  const [count, setCount] = useState(0);

  const onItemClick = useCallback((event) => console.log("You clicked ", event.target.innerHTML), [company]);
  console.log("App counter", count);
  return (
    <>
      <input type="text" onChange={({ target }) => setCompany(target.value)} />
      <button onClick={() => setCount(count + 1)}> Incrémenter </button>
      <MyBigList company={company} onItemClick={onItemClick} />
    </>
  );
}

```

```jsx
// Grace à useCallback ce composant ne fait pas le re-render si les props name et onItemClick ne changent pas de valeur.
function MyBigList({ company, onItemClick }) {
  const names = getItems(company);
  console.log("MyBigList");
  
  return (
    <>
      {
        names.map((name, index) => (<ListItem key={index} onItemClick={onItemClick} name={name} />))
      }
    </>
  );
}

export default React.memo(MyBigList);
```

``jsx
// Ce composant ne fait pas le re-render avec les même valeures name et onItemClick
function ListItem({ name, onItemClick }) {
  console.log("ListItem", name);
  return (
    <div onClick={onItemClick}>
      {name.first} {name.last}
    </div>
  );
}

export default ListItem;

````

[Code source](https://codesandbox.io/s/usecallback-bix7q)
### 8.2.3 useMemo

Le hook <code>useMemo</code> vous permet de mémoriser e résultat des fonctions coûteuses afin d'éviter de les appeler à chaque rendu.
Vous passez simplement une fonction et un tableau d'entrées et useMemo ne recalculera la valeur mémorisée que lorsque l'une des entrées a changé.
Dans notre exemple ci-dessous, nous avons une fonction coûteuse appelée getItems. Nous avons également un compteur séparé qui est incrémenté chaque fois que vous cliquez sur le bouton d'incrémentation. Lorsque ce compteur est incrémenté, vous remarquerez qu'il n'y a aucun appel à la méthode getItems. La dépendance d'entrée <code>[company]</code> n'a pas changé et donc la valeur mise en cache est renvoyée.
```jsx
export default function ParentComponent() {
  const [company, setCompany] = useState("");
  const [count, setCount] = useState(0);
  // Une liste pré-calculée et couteuse
  // la méthode getItems est appelée seulement si company change sa valeur.
  const names = useMemo(() => getItems(company), [company]);

..............
 
  return (
    <>
      <input type="text" onChange={({ target }) => setCompany(target.value)} />
      <button onClick={() => setCount(count + 1)}> + </button>
      <MyBigList names={names} onItemClick={onItemClick} />
    </>
  );
}

```
[Code source](https://codesandbox.io/s/usecallback-bix7q)

### 8.2.4 useReducer

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
import React, { useState } from 'react';
import { Text, SelectBase, Button } from '@axa-fr/react-toolkit-all';
import { computeTaxeService } from '../../../shared/taxComputer.helper';
  
const options = [
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
 ];
 
export const TaxComputationForm = ({taxRateSetter, taxAmountSetter, numberOfSharesSetter}) => {
  const [numberOfAdult, setNumberOfAdult] = useState(1);
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [year, setYear] = useState(2020);

  const updateNumberOfAdult = ({ value }) => setNumberOfAdult(parseInt(value, 10) || 0);
  const updateSalaryAmount = ({ value }) => setSalaryAmount(parseInt(value, 10) || 0);
  const updateNumberOfChildren = ({ value }) => setNumberOfChildren(parseInt(value, 10) || 0);
  const updateYear = ({ value }) => setYear(parseInt(value, 10) || 0);

  const computeTaxeHandler = () => {
   .........
   .........
  };

  return (
    <>
      <form className="af-form tax-form">
        <h1 className="af-title--content">Formulaire</h1>
        <div className="af-form__group">
          <dl>
            <dt>Nombre adulte(s) :</dt>
            <dd>
              <Text value={numberOfAdult} onChange={updateNumberOfAdult}/>
            </dd>
          </dl>
          <dl>
            <dt>Montant salaire :</dt>
            <dd>
              <Text value={salaryAmount} onChange={updateSalaryAmount}/>
            </dd>
          </dl>
          <dl>
            <dt>Nombre enfant(s) :</dt>
            <dd>
              <Text value={numberOfChildren} onChange={updateNumberOfChildren}/>
            </dd>
          </dl>
          <dl>
            <dt>Année :</dt>
            <dd>
              <SelectBase key="key" options={options} value={year} onChange={updateYear}/>
            </dd>
          </dl>
        </div>
        <div className="af-form__group af-form__btn">
          <Button classModifier="hasiconLeft" id="validation-button" onClick={computeTaxeHandler}>
            <span className="af-btn__text">Calculer</span><i className="glyphicon glyphicon-stats" />
          </Button>
        </div>
      </form>
    </>
  );
};

```

Nous allons utiliser <code>useReducer(reducer, initialArg, lazyInitializerFn)</code> pour extraite la logique et la complexité dans une fonction nommée par convention <code>reducer</code>.

```jsx
import React, { useReducer } from 'react';
import { Text, SelectBase, Button } from '@axa-fr/react-toolkit-all';
import { computeTaxeService } from '../../../shared/taxComputer.helper';

import { initialValues, reducer, UPDATE_NUMBER_OF_ADULT, UPDATE_NUMBER_OF_CHILDREN, UPDATE_SALARY_AMOUNT, UPDATE_YEAR} from './TaxComputationForm.reducer';

const options = [
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
 ];
 
 // Un composant plus leger. 
export const TaxComputationForm = ({taxRateSetter, taxAmountSetter, numberOfSharesSetter}) => {
  // pas de complexité, un seul Hook pour tous les champs
  const [{ numberOfAdult, numberOfChildren, salaryAmount, year }, dispatch] = useReducer(reducer, initialValues);

  const updateFieldValue = (type, value) => dispatch({ type, value });

  const computeTaxeHandler = () => {
   .........
   .........
  };

  return (
    <>
      <form className="af-form tax-form">
        <h1 className="af-title--content">Formulaire</h1>
        <div className="af-form__group">
          <dl>
            <dt>Nombre adulte(s) :</dt>
            <dd>
              <Text value={numberOfAdult} onChange={({ value }) => updateFieldValue(UPDATE_NUMBER_OF_ADULT, parseInt(value) || 0)}/>
            </dd>
          </dl>
          <dl>
            <dt>Montant salaire :</dt>
            <dd>
              <Text value={salaryAmount} onChange={({ value }) => updateFieldValue(UPDATE_SALARY_AMOUNT, parseInt(value) || 0)}/>
            </dd>
          </dl>
          <dl>
            <dt>Nombre enfant(s) :</dt>
            <dd>
              <Text value={numberOfChildren} onChange={({ value }) => updateFieldValue(UPDATE_NUMBER_OF_CHILDREN, parseInt(value) || 0)}/>
            </dd>
          </dl>
          <dl>
            <dt>Année :</dt>
            <dd>
              <SelectBase key="key" options={options} value={year} onChange={({ value }) => updateFieldValue(UPDATE_YEAR, parseInt(value) || 0)}/>
            </dd>
          </dl>
        </div>
        <div className="af-form__group af-form__btn">
          <Button classModifier="hasiconLeft" id="validation-button" onClick={computeTaxeHandler}>
            <span className="af-btn__text">Calculer</span><i className="glyphicon glyphicon-stats" />
          </Button>
        </div>
      </form>
    </>
  );
};

 ```
 
```js
TaxComputationForm.reducer.js

// la valeur initil de notre state
const initialValues = {numberOfAdult: 1, numberOfChildren: 0, salaryAmount: 0, year: 2020};

// Actions qui déclenchent la mise à jour des valeurs
const UPDATE_NUMBER_OF_ADULT = 'UPDATE_NUMBER_OF_ADULT';
const UPDATE_NUMBER_OF_CHILDREN = 'UPDATE_NUMBER_OF_CHILDREN';
const UPDATE_SALARY_AMOUNT = 'UPDATE_SALARY_AMOUNT';
const UPDATE_YEAR = 'UPDATE_YEAR';

// Nous pouvons mettre cette fonction dans un fichier qu'on peut ruétiliser par exemple.
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NUMBER_OF_ADULT:
      return { ...state, numberOfAdult: action.value };
    case UPDATE_NUMBER_OF_CHILDREN:
      return { ...state, numberOfChildren: action.value };
    case UPDATE_SALARY_AMOUNT:
      return { ...state, salaryAmount: action.value };
    case UPDATE_YEAR:
      return { ...state, year: action.value };
    default:
      return state;
  }
};
```

<blockquote>
  Grâce au hook <code>useReducer</code>, nous avons rendu le composant Form leger et compacte, parce que nous avons extrait la logic et sa complexité dans une fonction externe <code>reducer</code>

  Nous pouvons aussi déplacer la fonction <code>useReducer</code> dans un fichier si nous voulons réutiliser la même logique dans d'autre composants
</blockquote>

## 8.3 Custom hooks

