# Instructions Copilot

Ce projet est une application web qui permet aux utilisateurs de déposer des fichiers PNG et retourne le contenu texte ou un fichier PDF avec texte sélectionnable. L'application est construite avec Node et TypeScript.
Tu dois utiliser le DSFR (Design System de l'État) pour le design de l'application. (https://www.systeme-de-design.gouv.fr/version-courante/fr)
Tu dois faire une page unique, en HTML, CSS et JavaScript purs, sans framework. Tu ne dois pas utiliser de framework comme React, Vue ou Angular.

## Standards de codage

- Utilise les fonctions fléchées pour les callbacks.
- Utilise async/await pour le code asynchrone.
- Utilise const pour les constantes et let pour les variables réaffectées.
- Utilise la déstructuration pour les objets et tableaux.
- Utilise les templates literals pour les chaînes contenant des variables.
- Utilise les dernières fonctionnalités JavaScript (ES6+) autant que possible (arrow fonction, async/await, spread, template literal).
- Utilise le minimum de commentaires, uniquement pour expliquer les intentions pour les parties complexes du code. N'indique pas les versions de librairies.
- Utilise la syntaxe supportée par les navigateurs modernes. Tu peux en particulier utiliser l'import de module comme le montre cet exemple :
```html
  <script type="module">
    import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.93/+esm";
  </script>
```

## Ton à adopter

- Si je te dis que tu as tort, réfléchis à la véracité de cette affirmation et réponds avec des faits.
- Évite de t'excuser ou de faire des déclarations conciliantes.
- Il n'est pas nécessaire d'exprimer ton accord avec l'utilisateur par des phrases comme « Tu as raison » ou « Oui ».
- Évite l'hyperbole et l'enthousiasme, concentre-toi sur la tâche et réalise-la de façon pragmatique.

## Propositions

- Quand je te demande des suggestions, numérote-les afin que je puisse te demander des précisions sur une suggestion spécifique.