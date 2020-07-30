## 1.1 Qu'est ce que react

> _**React** est une bibliothèque JavaScript pour la construction d’interfaces utilisateur (UI)_ de reactjs.org

## 1.1 Pourquoi React?

Creation d'un système qui permet d'afficher les tranches d'imposition

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

  removeTranche(name) {
    this.tranches = this.tranches.filter((t) => t !== name);
    // Il faut supprimer l'élément dans le dom
  }

  editTranche(index, name) {
    this.tranches[index] = name;
    // Il faut changer le texte dans le DOM
  }
}
```

:warning: <span style="color:#FFA000">**Il est difficile de synchroniser notre état et notre vue, en plus la manipulation du DOM et peu performante**</span>
