# OXO

Application web pour comprendre les prix, l’inflation et les mécanismes économiques au Maroc,
à partir de sources officielles et de simulations dont les hypothèses restent visibles.

Le produit est aujourd’hui un **pilote avancé** : le parcours observer → manipuler → interpréter
→ synthèse est fonctionnel, avec progression enregistrée uniquement dans le navigateur ; le
tuteur répond par règles locales, sans modèle externe.

## Démarrer

Node 22.12 ou plus récent.

```bash
npm install
npm run dev
```

## Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Types puis bundle de production dans `dist/` |
| `npm run preview` | Sert `dist/` localement |
| `npm run verify` | Types, lint et tests — ce que la CI exige |
| `npm test` | Tests seuls (Vitest) |
| `npm run lint` | Oxlint |

## Structure

```
src/
  app/            coquille, étape, thème, routage d’URL, ErrorBoundary
  components/     barre supérieure, navigation, panneau, dialogues
  content/        manifeste, locale française et glossaire compilé depuis le Markdown
  shared/         formatage, étapes, thème (primitives sans dépendance UI)
  features/
    prices/       scène « panier face à l’IPC »
    simulation/   modèle du panier, hook d’état, scène « manipuler »
    lesson/       quiz, synthèse, auto-évaluation et progression locale
    tutor/        règles locales et interface du tuteur
  styles/         tokens, mise en page, thèmes, responsive
content/
  morocco/concepts/   fiches Markdown du glossaire
```

Le détail des flux et des décisions est dans [docs/architecture.md](docs/architecture.md).

## Contenu éditorial

- Les chaînes d’interface vivent dans `src/content/locales/fr.ts`; la leçon dans son manifeste typé.
- Les fiches du glossaire vivent dans `content/morocco/concepts/*.md`, avec les champs
  `**Définition simple**`, `**Source**` et `**Date de revue**` obligatoires.
- Une fiche incomplète fait échouer le build et la CI.
- Toute correction de contenu met à jour la date de revue affichée.

## Documentation

- [Architecture](docs/architecture.md) — composants, état, pipeline de contenu, livraison.
- [Mise en production](docs/production.md) — hébergement, CSP, cache, CI, supervision,
  accessibilité, runbook, décisions ouvertes.
- Diagrammes interactifs : [architecture](docs/diagrams/architecture.html),
  [pipeline de contenu](docs/diagrams/content-pipeline.html),
  [livraison](docs/diagrams/delivery-workflow.html).

## Validation

```bash
npm run verify
npm run build
```

La CI GitHub Actions rejoue ces contrôles sur chaque pull request et sur `main`, avec Node 22.

## Décisions ouvertes

- Fournisseur du tuteur et politique de confidentialité (`T020`) : aucune réponse générative
  avant cette décision.
- Mesure d’audience et collecte d’erreurs : aucune télémétrie aujourd’hui.
- Protection de la branche `main` : à activer côté GitHub pour qu’un push rouge ne soit pas
  déployé.

Voir [docs/production.md](docs/production.md#décisions-ouvertes).
