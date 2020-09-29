# 4 Industrialisation

## 4.1 Initialisation d'un projet React

Nous avons vu dans le chapitre précèdent qu’il y a plusieurs manières de faire du React. Une des manières que nous avons jusqu’ici consiste à ajouter les dépendances de **React**, **React Dom** et **Babel** via le service **unpkg**. Cette méthode est très peu performante et même déconseillé quand il s’agira de réaliser un projet de grande envergure qui implique un travail en équipe et des mécaniques d’industrialisation (intégration continue, …).

React mets à disposition un environnement qui permet de démarrer confortablement un projet. C’est le **Create React App** ou **CRA**.

> Le **CRA** configure votre environnement de développement de façon à vous permettre d’utiliser les dernières fonctionnalités de JavaScript, propose une expérience développeur agréable et optimise votre application pour la production.

[Aller plus loin sur le CRA](https://create-react-app.dev/docs/getting-started/)

## 4.2 Initialisé un projet AXA

La Cop Frontend met à disposition un starter qui est un projet basé sur le CRA et qui mets à disposition le les librairies de base qu’elle recommande. En plus des librairies de base, le starter intègre une architecture de projet telle que préconisée par la COP.

## 4.3 Le Toolkit AXA

Le toolkit est un design système c’est-à-dire un ensemble de composants web qui respecte suivant la charte graphique AXA. C’est un projet Open source. Les principaux contributeurs viennent de la Coop frontend. Les composants sont exposés via un **Storybook**. la dernière version en date est la **3.2.0**

> **Storybook** est un outil open source qui permet de développer des composants UI manière isolée pour React, Vue, Angular…

[Design System AXA](https://axaguildev.github.io/fr/react-toolkit)

**:weight_lifting_man: Exercice 4: Header et Footer de Bercy**
En se servant du toolkit AXA, construire le header et footer de Bercy _( voir maquette ci-dessous)_
