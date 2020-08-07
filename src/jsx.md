# Introduction au JSX

Pour utiliser React sur une page nous avons besoin de le récupérer sur NPM mais il existe un service qui s'appelle unpkg qui nous permet d'ajouter React à nos pages web.
Dans ce chapitre, pour des raisons de simplicité nous allons utilisé unpkg pour ajouter React à notre projet. Cela nous permettra de nous abstraire des outils satellite.

## 1.1 CreateElement API

```javascript
const title = React.createElement("h1", {}, "Bienvenu sur le site Bercy");
ReactDOM.render(title, document.querySelector("#app"));
console.log(title);
```

Quelle est la difference avec

```javascript
document.querySelector("#app").innerHTML =
  "<h1>Bienvenue sur le site Bercy</h1>";
```

Pour conniatre la difference, comparons les deux blocs de code suivant:
###Rendu avec React

```javascript
let compteur = 0;

function renduAvecReact() {
  const title = React.createElement(
    "h1",
    {},
    "Bienvenue sur le site Bercy",
    React.createElement("span", {}, compteur)
  );
  ReactDOM.render(title, document.querySelector("#app"));
}
renduAvecReact();
window.setInterval(() => {
  compteur++;
  renduAvecReact();
}, 1000);
```

###Rendu sans React

```javascript
let compteur = 0;

function renduSansReact() {
  document.querySelector("#app").innerHTML =
    "<h1>Bienvenue sur le site Bercy <span> " + compteur + "</h1>";
}
renduSansReact();
window.setInterval(() => {
  compteur++;
  renduSansReact();
}, 1000);
```

## 1.2 Qu'est ce que le jsx

C'est une syntaxe qui nous permet de decrire du React un peu plus simplement sans utiliser React.createElement. Elle n'est pas comprise par le navigateur.

```jsx
const title = <h1>Bienvenue sur le site Bercy</h1>;
```

Pour utiliser JSX nous avons besoin de Babel. Babel permet de convertir du code moderne vers du code un peu plus ancien supporté par les vieux navigateur. Il supporte le JSX.

####:weight_lifting_man: Testons ce que fait Babel:

Copier le code jsx ci-dessus et le coller dans le traducteur babel pour observer la traduction en javascript [Traducteur Babel](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.11.1&externalPlugins=)

#### Comment ajouter Babel à notre projet?

Modifier le fichier index.html pour ajouter la dependance Babel

```diff
+ <script src="https://unpkg.com/babel-standalone@6/babel.min.js" defer></script>
! <script src="app.js" type="text/babel" defer></script>
```

####:weight_lifting_man: Passons en JSX notre code:

```jsx
let compteur = 0;

function renduAvecReact() {
  const title = (
    <h1>
      Bienvenu sur le site de Bercy <span>0</span>
    </h1>
  );

  ReactDOM.render(title, document.querySelector("#app"));
}
renduAvecReact();
window.setInterval(() => {
  compteur++;
  renduAvecReact();
}, 1000);
```

## 1.3 La syntaxe JSX

### 1.3.1 Interpolation

Pour dynamiser le contenu de notre jsx, nous avons besoin d'injecter des variable dans le code. Le JSX nous permet d'injecter du code javascript à travers les "moustaches"
_**{mon expression javascript}**_

####:weight_lifting_man: Ajoutons le compteur à notre message de bienvenue:

```jsx
let compteur = 0;
function renduAvecReact() {
  const title = (
    <h1>
      Bienvenu sur le site de Bercy <span>{compteur}</span>
    </h1>
  );

  ReactDOM.render(title, document.querySelector("#app"));
}
```

> Tous les elements HTML5 sont utilisable de manière equivalente dans la syntaxe JSX.

### 1.3.2 Les attributs: _id_, _classeName_, _children_

- **id**: permet d'identifier de manière unique un element JSX. Il est l'equivalent de l'attribut id des elements du DOM
- **className**: Il permet d'appliquer du style à notre element. Il correspond à l'attribut class du DOM
- **children**: Il correspond à l'element fils d'un element jsx. Il peut être de type jsx, primitif ou une expression javascript

> Il existe d'autres attribut: checked, value, tabindex .... La valeur des attributs passés au elements JSX sont appellés des Props.

Example

```jsx
// cette permet de generer un GUID
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function renduAvecReact() {
  const message = <span>Bienvenu sur le site de Bercy</span>;
  const className = "bercy-bienvenue-msg";
  const title = <h1 id={uuid()} className={className} children={message}></h1>;

  ReactDOM.render(title, document.querySelector("#app"));
}
renduAvecReact();
```

### 1.3.2 Les basiles auto fermentes

Quand l'element jsx n'a pas de children, la balise peut être auto-fermante

```diff
- const title = <h1 id={uuid()} className={className} children={message}></h1>;
+ const title = <h1 id={uuid()} className={className} children={message} />;
```

## 1.4 Conditions

## 1.5 Boucles

```jsx
const tauxInpositions = tauxInposition.map((taux) => (
  <li key={taux.id}>{taux.value}</li>
));
```

####:weight_lifting_man: Exercice: Afficher les tranches d'imposition avec leur details
Etant données les informations ci-dessous sur les tranches d'imposition

```javascript
const tranches = [
  {
    id: 1,
    tauxImposition: 0.0,
    limiteInf: 0,
    limiteSup: 10064,
  },
  {
    id: 2,
    tauxImposition: 0.11,
    limiteInf: 10064,
    limiteSup: 25659,
  },
  {
    id: 3,
    tauxImposition: 0.3,
    limiteInf: 25659,
    limiteSup: 73369,
  },
  {
    id: 4,
    tauxImposition: 0.41,
    limiteInf: 73369,
    limiteSup: 157806,
  },
  {
    id: 5,
    tauxImposition: 0.45,
    limiteInf: 157806,
  },
];
```

Afficher les tranches d'imposition avec les details comme suit:

![Tranches impot](./images/tranches.jpg)

Pensez à eviter ce message: **Warning: Each child in a list should have a unique "key"**
[Pour aller plus loin](https://fr.reactjs.org/docs/introducing-jsx.html)
