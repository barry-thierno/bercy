# 5. Formulaires

## 5.1 Events

# 6. Faire communiquer des composants

Nous avons appris à créer des composants avec un état interne. Cependant les composants ont besoin d’échanger de l’informations entre eux.
Par exemple, dans le cas de notre projet Bercy, le composant qui permet de sélectionner l’année doit échanger de l’information avec le composant qui permet de lister les tranches d’imposition.
Pour faire communiquer des composants, React propose le pattern de _**"communication unidirectionnel"**_ ou _**"unidirectional data flow"**_ ou _**"One way Data flow"**_

> _La communication unidirectionnelle suggère que les données circulent dans une direction, du parent à l'enfant._

![Flow React](./images/data-flow.jpg)

Pour mettre en oeuvre ce pattern, il faudrait passer par ces étapes: la hiérarchisation des composants, le passage des props et la rétropropagation  via les callbacks

## 6.1 Hiérarchisation des composants

L’idée est de décomposer l’interface utilisateur en une hiérarchie de composants tout en identifiant les composants père et fils. Dans notre nous allons décomposer le composant qui permet d’afficher les tranches d’imposition comme suit :

![Tranches impot](./images/tranches-filter.JPG)

**:weight_lifting_man: Exercice 6.1 : construire une version statique du composant qui permet d’afficher les tranches**

Vous trouverez ci-dessous l'intégration qui permet de construire le composant d'affichage des tranches

- Créez un fichier **FilterableSliceTable.jsx**
- Créez un composant fonctionnel qui va s'appeller **FilterableSliceTable** (Pensez aux imports necessaires et à l'export du composant)
- Appéllez le composant **FilterableSliceTable** dans le composant **Home**
- En se servant des commentaires laissés dans le code, sortez des composants fonctionnels conformement à la hierachie presentée plus haut (Dans le même fichier)
  > Pour le composant SliceTableRow pensez à passer la bornes inférieures(lowBorn), supérieure(highBorn) et le taux(rate) en Props

```jsx
// FilterableSliceTable
<section className="af-panel">
  <header className="af-panel__header">
    {/* SliceYearSelect */}
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
    {/* SliceTable */}
    <Table className="af-table">
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
        {/* SliceTableRow */}
        <Table.Tr>
          <Table.Td>
            <span className="af-table-body-content">jusqu'à 9 964€</span>
          </Table.Td>
          <Table.Td>
            <b>0%</b>
          </Table.Td>
        </Table.Tr>
        {/* SliceTableRow */}
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
```

## 6.2 Flow descendant (props)

Selon le _pattern unidirectionnel_, les composants parents peuvent passer de l'informations à leurs fils. L'idée est que le composant parent crée et passe son état au composant fils via les props.

**:weight_lifting_man: Exercice 6.2 : Afficher les tranches d'imposition pour 2020**

- Déclarez le state qui permet de selectionner l'année et nommé le **selectedYear**: _inspirez vous du pattern unidirectionnel et du decoupage fait precedement pour choisir le bon endroit_
- Votre état doit avoir comme valeur par defaut **"2020"**.
- Afficher les tranches et le taux dans le composant **SliceTableRow** _(Rappel: boucle et passage de props)_
- Vous disposez ci-dessous d'une fonction qui retourne les tranches pour les années 2019 et 2020

> Pour récupèrer les tranches d’une année, vous pouvez utiliser la fonction find donc voici la [doc find](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/find)

```javascript
const getAllTranches = () => [
  {
    year: "2019",
    tranches: [
      {
        id: 1,
        rate: 0,
        lowBorn: 0,
        highBorn: 10064,
      },
      {
        id: 2,
        rate: 14,
        lowBorn: 10064,
        highBorn: 27794,
      },
      {
        id: 3,
        rate: 30,
        lowBorn: 27794,
        highBorn: 74517,
      },
      {
        id: 4,
        rate: 41,
        lowBorn: 74517,
        highBorn: 157806,
      },
      {
        id: 5,
        rate: 45,
        lowBorn: 157806,
      },
    ],
  },
  {
    year: "2020",
    tranches: [
      {
        id: 1,
        rate: 0,
        lowBorn: 0,
        highBorn: 10064,
      },
      {
        id: 2,
        rate: 11,
        lowBorn: 10064,
        highBorn: 25659,
      },
      {
        id: 3,
        rate: 30,
        lowBorn: 25659,
        highBorn: 73369,
      },
      {
        id: 4,
        rate: 41,
        lowBorn: 73369,
        highBorn: 157806,
      },
      {
        id: 5,
        rate: 45,
        lowBorn: 157806,
      },
    ],
  },
];
```

## 6.3 Flow ascendant (callback)

Nous avons vu comment les composants père peuvent impacter ses fils via les props. Les props étant immutables, le composant père peut passer à ses fils une callbacks qui permet de mettre à jour ces derniers ce qui à pour effet de propager ces modifications et de déclencher une réactualisation de toute l’arborescence des composants.

![flow react complet](https://cdn-images-1.medium.com/max/1600/1*PBgAz9U9SrkINPo-n5glgw.gif)

**:weight_lifting_man: Exercice 6.3 : Dynamiser le tableau qui permet d'afficher les tranches d'imposition**
Le composant père (_FilterableSliceTable_) garde l'état qui contient l'année selectionnée, nous allons dans ce exercice passer cet état au composant **SliceYearSelect** ainsi que sa fonction de mise à jour.

- Ajoutez au composant **SliceYearSelect** les props **selectedYear** et **setSelectedYear** qui correspondent respectivement à l'année selection et de sa fonction de mise à jour
- Interceptez les changements du composant **SelectBase** via l'évènement **onChange** declenché.
  > La fonction **onChange** déclenche un évènement qui contient les propriété suivantes:
  >
  > ```javascript
  > id: "id unique de l'élement du DOM";
  > name: "l'attribut name passé au composant";
  > value: "valeur selectioinnée"; // dans notre cas 2019 ou 2020
  > ```
