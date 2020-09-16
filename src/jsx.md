## 1.1 CreateElement API

```javascript
const title = React.createElement("h1", {}, "Bienvenue sur le site Bercy");
ReactDOM.render(title, document.querySelector("#app"));
console.log(title);
```

Quelle est la difference avec

```javascript
document.querySelector("#app").innerHTML =
  "<h1>Bienvenue sur le site Bercy</h1>";
```

Pour connaitre la difference, comparons les deux blocs de code ci-dessous:

**Rendu avec React**

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

**Rendu sans React**

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
_Le code ci-dessus deviendrait:_

```jsx
const title = <h1>Bienvenue sur le site Bercy</h1>;
```

Pour utiliser JSX nous avons besoin de **Babel**. **Babel** permet de convertir du code moderne vers du code un peu plus ancien supporté par les vieux navigateur. Il supporte le JSX.

:mechanic: **Testons ce que fait Babel**

Copier le code jsx ci-dessus et le coller dans le traducteur babel pour observer la traduction en javascript [Traducteur Babel](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.11.1&externalPlugins=)

#### Comment ajouter Babel à notre projet?

Modifier le fichier _index.html_ pour ajouter la dependance Babel

```diff
+ <script src="https://unpkg.com/babel-standalone@6/babel.min.js" defer></script>
! <script src="app.js" type="text/babel" defer></script>
```

:mechanic: **Passons en JSX notre code de bienvenue**

```jsx
function WelcomeMessage() {
  const title = (
    <h1>
      Bienvenu sur le site de Bercy <span>0</span>
    </h1>
  );

  ReactDOM.render(title, document.querySelector("#app"));
}
WelcomeMessage();
```

[JsFiddle](https://jsfiddle.net/thies05/9nkvzase/24/)

## 1.3 La syntaxe JSX

### 1.3.1 Interpolation

Pour dynamiser le contenu de notre jsx, nous avons besoin d'injecter des variables et des expressions dans le code. Le JSX nous permet d'injecter du code javascript à travers les "moustaches"
_**{mon expression javascript}**_

:mechanic: **Ajoutons le nom du user à notre message de bienvenue**
&

```jsx
const userName = "Yannick";
function renduAvecReact() {
  const title = (
    <h1>
      Bienvenu sur le site de Bercy <span>{userName}</span>
    </h1>
  );

}
ReactDOM.render(renduAvecReact(), document.querySelector("#app"));
```

[Jsfiddle](https://jsfiddle.net/thies05/9nkvzase/18/)

> Tous les elements HTML5 sont utilisables de manière equivalente dans la syntaxe JSX.

### 1.3.2 Les attributs: _id_, _classeName_, _children_

- **id**: permet d'identifier de manière unique un element JSX. Il est l'equivalent de l'attribut id des elements du DOM
- **className**: Il permet d'appliquer du style à notre element. Il correspond à l'attribut class du DOM
- **children**: Il correspond à l'element fils d'un element jsx. Il peut être de type jsx, primitif ou une expression javascript

> - Il existe d'autres attribut: checked, value, tabindex ....
> - La valeur des attributs passés au elements JSX sont appellés des Props.

```jsx
function RenduAvecReact() {
  const message = <span>Bienvenu sur le site de Bercy</span>;
  const className = "bercy-bienvenue-msg";
  const title = (
    <h1 id="unique-id" className={className} children={message}></h1>
  );

  ReactDOM.render(title, document.querySelector("#app"));
}
RenduAvecReact();
```

[Jsfiddle](https://jsfiddle.net/thies05/9nkvzase/25/)

### 1.3.2 Les basiles auto fermentes

Quand l'element jsx n'a pas de children, la balise peut être auto-fermante

```diff
- const title = <h1 id={uuid()} className={className} children={message}></h1>;
+ const title = <h1 id={uuid()} className={className} children={message} />;
```

## 1.3.3 Conditions

> En Jsx, _false_, _null_, _undefined_, et _true_ sont des enfants valides. Ils ne sont simplement pas exploités. Ces expressions JSX produiront toutes la même chose. Ça peut être utile pour afficher des éléments React de façon conditionnelle

```jsx
function DisplayWelcomeMessage({ userName }) {
  const isUserConnected = userName !== "";
  return (
    <div>
      {isUserConnected && (
        <header>Bienvenue sur le simulateur de {userName}</header>
      )}
      <div>Bercy est projet proposé par C.Merlen</div>
    </div>
  );
}

ReactDOM.render(
  DisplayWelcomeMessage({ userName: "titi" }),
  document.querySelector("#app")
);
```

[Jsfiddle](https://jsfiddle.net/thies05/069qLfxr/22/)

On peut aussi utiliser les condtions ternaires

```jsx
function DisplayImpot(montantImpot) {
  return (
    <div>
      <b>
        {montantImpot > 0
          ? `Le montant de vos impots est ${montantImpot}`
          : "vous n’est pas imposable"}
      </b>
    </div>
  );
}

ReactDOM.render(DisplayImpot(150), document.querySelector("#app"));
```

[Jsfiddle](https://jsfiddle.net/thies05/cx93rhLg/15/)

## 1.3.4 React fragment

## 1.3.5 Boucles

```jsx
function DisplayTranchesImpot({ tranches }) {
  const tauxInpositions = tranches.map((tranche) => (
    <div key={tranche.id}>{tranche.tauxImposition}</div>
  ));
  return tauxInpositions;
}
```

[Jsfiddle](https://jsfiddle.net/thies05/9nkvzase/6/)

####:weight_lifting_man: Exercice 1
**Afficher les tranches d'imposition avec leur details**

- Nous possédons une methode qui permet de retourner les tranches d'imposition _**getAllTranches()**_
- Cette methode mets du temps à s'executer (2.5s)
- **Travail à Faire**

  - Recuper la liste des tranches d'imposition
  - Pendant que l'on recupère les tranches d'imposition, afficher le message suivant: _"Récuperation des tranches d'imposition en cours ..."_
  - Une fois les tranches disponibles, afficher les tranches d'imposition avec les details comme ci-dessous:
  - Pensez à eviter ce message: **Warning: Each child in a list should have a unique "key"**

    ![Tranches impot](./images/tranches.jpg)

    **Code de base**

    ```javascript
    var isRendering = true;

    function getAllTranchesAsync() {
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
      return isRendering ? undefined : tranches;
    }

    function AffichertranchesImposition() {
      // Votre code ICI
    }

    function render() {
      setTimeout(() => {
        isRendering = false;
      }, 5000);
      var interval = setInterval(function() {
        ReactDOM.render(
          AffichertranchesImposition(),
          document.querySelector("#app")
        );
        if (!isRendering) {
          clearInterval(interval);
        }
      }, 1000);
    }
    ```

    [Solution boucle](https://jsfiddle.net/thies05/1zgj6s9n/34/)

[Pour aller plus loin](https://fr.reactjs.org/docs/introducing-jsx.html)
