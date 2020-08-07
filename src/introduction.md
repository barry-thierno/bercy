## 1.1 Qu'est ce que react

> _**React** est une bibliothèque JavaScript pour la construction d’interfaces utilisateur (UI)_ de reactjs.org

## 1.2 Pourquoi React?

Creation d'un système qui permet d'afficher les tranches d'imposition

####<span style="color:#FFA000">En natif </span>

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

- _Il est difficile de synchroniser notre état et notre vue._
- _La manipulation du DOM et peu performante._
- _Code Spaghetti_

####<span style="color:#009688">Avec React </span>

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

- _Pas de manupulation directe du DOM._
- _Sépration entre etat et vue (Séparation of concern)._
- _Notre vue est une fonction de l'etat._

## 1.3 Difference avec les frameworks du marché

- Une API simple (peu de fonctions)
- Excellent ecosystème
- JSX (système de template facile à apprendre)
