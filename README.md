# OXO

Prototype MVP web pour comprendre les prix, l’inflation et les mécanismes économiques au Maroc.

## Stack

- React 19
- TypeScript
- Vite
- Vitest
- Oxlint

## Structure

- `src/app` : assemblage de l’application
- `src/components/layout` : navigation et structure globale
- `src/features/prices` : parcours sur les prix et l’IPC
- `src/features/simulation` : modèle et interface du panier
- `src/features/tutor` : interface et règles locales du tuteur
- `src/styles` : thèmes et styles globaux

## Développement

```bash
npm install
npm run dev
```

## Validation

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
