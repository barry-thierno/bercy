# 5. Formulaires

La gestion des formulaires est gérée de manière assez différente en React qu'avec d'autres frameworks. Il y a moins de "magie" qu'en AngularJS par exemple, ce qui signifie qu'il y a plus de code à écrire ou bien qu'on peut ajouter une librairie pour nous aider à gérer les formulaires.

## 5.1 Gestion des événements

Connaitre le fonctionnement des événements est un prérequis à la gestion des formulaires en React.

La gestion des événements pour les éléments React est très similaire à celle des éléments du DOM. Cf le même exemple en HTML et en React:

```html
<button onclick="hello()">Coucou</button>
```

```jsx
<button onClick={hello}>Coucou</button>
```

Pouvez-vous voir les différences ?

HTML: minuscules et string

React: camelCase et fonction

## 5.2 Gestion des inputs

En HTML, les input utilisateurs maintiennent généralement leur propre état et se mettent à jour par rapport aux saisies de l’utilisateur. En React, l’état modifiable est généralement stocké dans le state des composants.

Exemple en React:

```jsx
function Form() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setName(newValue);
  };

  return <input type="text" value={name} onChange={handleChange} />;
}
```

L'event ici est un [événement synthétique](https://fr.reactjs.org/docs/events.html), un évènement avec la même interface que l'événement natif, mais compatible avec tous les navigateurs. Il nous sert ici à récupérer la nouvelle valeur du champ à chaque frappe de l'utilisateur.

La gestion des balises [select](https://fr.reactjs.org/docs/forms.html#the-select-tag) et [textarea](https://fr.reactjs.org/docs/forms.html#the-textarea-tag) est très similaire.

On appelle ces composants des composants contrôlés, car la "source unique de vérité" est l'état local React des composants, il n'y a plus d'état gérer par le DOM.

**Exercice 5.1 : créer un composant contrôlé**

[Lien vers l'exercice](https://codesandbox.io/s/wizardly-chatterjee-bukep?file=/src/DroitAuBut.js)

**Exercice 5.2 : formulaire Bercy**

Objectif: créer un formulaire permettant de calculer le montant de ces impôts. Pour cela on part de l'application obtenue lors de la dernière session, auquelle on a rajouté un formulaire. Attention, ici on utilise comme input des composants du [Toolkit](https://axaguildev.github.io/react-toolkit/latest/storybook/index.html?path=/story/form-input-text--text)!

- Récuperer le code:

```shell
git checkout react-dojo__integration_partie3
git pull
cd src/integration
npm install
```

- Permettre à l'utilisateur de modifier les champs.
- Lorsque l'utilisateur clique sur "Calculer", calculer le taux d'imposition, le montant d'impôt et le nombre de parts grâce à la méthode calculImpot, et afficher les résultats dans la section "Résultat".

# 6. Faire communiquer des composants

Jusqu’à maintenant, nous avons appris à créer des composants à avec un état interne. Cependant les composants ont besoin d’échanger de l’informations entre eux.
Par exemple, dans le cas de notre projet Bercy, le composant qui permet de sélectionner l’année doit échanger de l’information avec le composant qui permet de lister les tranches d’imposition.
Pour faire communiquer des composants, React propose le pattern de _**"communication unidirectionnel"**_ ou _**"unidirectional data flow"**_ ou _**"One way Data flow"**_
L'idée

![Flow React](./images/data-flow.jpg)

Pour mettre en oeuvre ce pattern, il faudrait passer par ces étapes: da hiérarchisation des composants, le passage des props et des callbacks

## 6.1 Hiérarchisation des composants

L’idée est de décomposer l’interface utilisateur en une hiérarchie de composants tout en identifiant les composants père et fils. Dans notre nous allons décomposer le composant qui permet d’afficher les tranches d’imposition comme suit :

![Tranches impot](./images/tranches-filter.jpg)

**:weight_lifting_man: Exercice 6.1 : construire une version statique du composant qui permet d’afficher les tranches :**

Vous trouverez ci-dessous l'intégration qui permet de construire le composant d'affichage des tranches

- Copier et coller ce code et faites les imports necessaire
- En se servant des commentaires laissés dans le code, sortez des composants fonctionnels conformement à la hierachie presentée plus haut

```jsx
// FilterableSliceTable
<aside className="tax-calculation_maximum-ceiling">
  <section className="af-panel">
    <header className="af-panel__header">
      // SliceYearSelect
      <span className="af-panel__title">Taux d'imposition par année</span>
      <SelectBase
        key="key"
        name="name"
        options={[
          { value: "2019", label: "2019" },
          { value: "2020", label: "2020" },
        ]}
        value="2020"
      />
    </header>
    <div className="af-panel__content">
      // SliceTable
      <Table className="af-table">
        // SliceTableHeader
        <Table.Header>
          <Table.Tr>
            <Table.Th>
              <span className="af-table-th-content">Tranches</span>
            </Table.Th>
            <Table.Th>
              <span className="af-table-th-content">Taux d'imposition</span>
            </Table.Th>
          </Table.Tr>
        </Table.Header>
        <Table.Body>
          // SliceTableRow
          <Table.Tr>
            <Table.Td>
              <span className="af-table-body-content">jusqu'à 9 964€</span>
            </Table.Td>
            <Table.Td>
              <b>0%</b>
            </Table.Td>
          </Table.Tr>
          // SliceTableRow
          <Table.Tr>
            <Table.Td>
              <span className="af-table-body-content">de 9964 à 27519</span>
            </Table.Td>
            <Table.Td>
              <b>14%</b>
            </Table.Td>
          </Table.Tr>
        </Table.Body>
      </Table>
    </div>
  </section>
</aside>
```

## 6.2 Flow descendant (props)

## 6.3 Flow ascendant (callback)
