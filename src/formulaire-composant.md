# 5. Formulaires

## 5.1 Events

## 5.2 Validation de saisies

# 6. Faire communiquer des composants

Jusqu’à maintenant, nous avons appris à créer des composants à avec un état interne. Cependant les composants ont besoin d’échanger de l’informations entre eux.
Par exemple, dans le cas de notre projet Bercy, le composant qui permet de sélectionner l’année doit échanger de l’information avec le composant qui permet de lister les tranches d’imposition.
Pour faire communiquer des composants, React propose le pattern de _**"communication unidirectionnel"**_ ou _**"unidirectional data flow"**_ ou _**"One way Data flow"**_
L'idée

> La communication unidirectionnelle, les données circulent dans une direction, du parent à l'enfant.

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
