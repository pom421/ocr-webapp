# OCR-DSFR

OCR-DSFR est un outil qui analyse des fichiers au format pdf ou des images et retrouve le contenu texte à l'intérieur.

## Run

```shell
npm install
npm run dev
```

See the result on http://127.0.0.1:3000.

## Test

Les tests e2e tournent avec Playwright.
Ils permettent de vérifier que les images ou pdf sont bien reconnus avec un certain pourcentage de réussite.
De cette manière, on peut modifier la configuration et s'assurer que les choses s'améliorent sans régression sur d'autres cas.

```shell
npm run test # lance les tests en mode CLI
npm run test:ui # lance l'UI pour lancer les tests
npm run test:report # lance le serveur Playwright qui affiche le résultats des tests
```
