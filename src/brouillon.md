### 2.3.2 Comment gérer le cycle de vie d'un composant fonctionnel

Nous avons vu dans les précédentes parties que les composants React ont un cycle de vie. Nous nous sommes intéressés à la fonction qui est exécutée quand le composant est monté et celle exécutée quand le composant est démonté. Ces fonctions ne sont valables que dans les **Class component**.
Pour gérer le cycle de vie dans un **Functionnal component**, React expose un Hook qui s’appelle **useEffect** qui permet de faire les effets de bord.

```javascript
useEffect(() => {
  document.title = `${date}`;
});
```

- **Que fait useEffect ?** On utilise ce Hook pour indiquer à React que notre composant doit exécuter quelque chose _après chaque affichage_. React enregistre la fonction passée en argument (que nous appellerons **« effect »**), et l’appellera plus tard, après avoir mis à jour le DOM. L’effet ci-dessus met à jour le titre du document.

- **Pourquoi useEffect est-elle invoquée à l’intérieur d’un composant ?** Le fait d’appeler useEffect à l’intérieur de notre composant nous permet d’accéder à la variable d’état **date** (ou à n’importe quelle prop) directement depuis l’effet.

- **Quand est-ce que useEffect est appelée ?** Elle est exécutée par défaut après le premier affichage et après chaque mise à jour. (Nous verrons comment personnaliser et optimiser ça ultérieurement.) Au lieu de penser en termes de _montage_ et de _démontage_, pensez plutôt que les effets arrivent tout simplement « après l’affichage ». React garantit que le DOM a été mis à jour avant chaque exécution des effets.

> [JsFiddle: Exemples](https://jsfiddle.net/thies05/9nkvzase/289/)

- **Comment libérer les ressources quand le composant est démonté ?** L’API met à disposition un mécanisme optionnel qui permet de libérer les ressources. La fonction **useEffecct** peut retourner une fonction. Le code de cette fonction est exécuté quand le composant est démonté du DOM.

  ```javascript
  useEffect(() => {
    // code executé pour le useEffect
    // Indique comment nettoyer l'effet :
    return function cleanup() {
      // Liberez les ressources
    };
  });
  ```

  **:weight_lifting_man: Exercice 3: Refactorer le composant Timer pour le transformer en functionnal component**
