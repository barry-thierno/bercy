## 1.1 Qu'est ce que react

> _**React** est une bibliothèque JavaScript pour la construction d’interfaces utilisateur (UI)_ de reactjs.org

## 1.2 Pourquoi React?

Creation d'un système qui permet d'afficher les tranches d'imposition

**En natif**

```javascript
class TrancheList {
  tranches = [];
  element = null;

  constructor(element) {
    this.element = element;
  }

  addTranche(name) {
    this.tranches.push(name);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = "Supprimer";
    li.appendChild(a);
    a.addEventListener("click", () => this.remove(name));
    this.element.appendChild(li);
  }
}
```

####:warning: Ce qui ne va pas:

- Il est difficile de synchroniser notre état et notre vue.
- La manipulation manuelle du DOM et peu performante.
- Code Spaghetti

**Avec React**

```javascript
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  addItem(name) {
    const todos = [...this.state.todos, name];
    this.setState({ todos: todos });
  }

  render() {
    return (
      <ul>
        {this.states.todos.map((name) => {
          return (
            <li>
              {name}{" "}
              <button onClick={this.removeItem.bind(this, name)}>
                Supprimer
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
```

####:ok_hand: Qu'est ce qui change:

- Pas de manipulation directe du DOM.
- Séparation entre état et vue (Séparation of concern).
- Notre vue est une fonction de l'état.

## 1.3 Difference avec les frameworks du marché

- Une API simple (peu de fonctions)
- Excellent écosystème
- JSX (système de template facile à apprendre)

## 1.4 Configuration du projet

Pour utiliser React sur une page nous avons besoin de récupérer les paquets sur NPM mais il existe un service qui s'appelle unpkg qui nous permet d'ajouter React à nos pages web.
Dans ce chapitre, pour des raisons de simplicité nous allons utiliser unpkg pour ajouter React à notre projet. Cela nous permettra de nous abstraire des outils satellites (CRA, WEBPACK, NPM,...).

[code de base](https://github.com/barry-thierno/bercy/tree/react_part1_code_base/src)
