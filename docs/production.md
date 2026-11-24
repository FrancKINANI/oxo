# Mise en production

Ce document décrit l’état réel de la chaîne de livraison et les décisions qui restent à
prendre avant d’ouvrir le produit à des clients. Il ne remplace pas la
[feuille de route](../ROADMAP.md) : il décrit ce qui est en place aujourd’hui.

## Cible d’hébergement

Le produit est un ensemble de fichiers statiques. La configuration actuelle vise **Vercel**,
mais aucune API propriétaire n’est utilisée : un autre hébergeur statique peut reprendre le
`dist/` en réécrivant les en-têtes.

| Réglage | Valeur | Fichier |
| --- | --- | --- |
| Framework | Vite | `vercel.json` |
| Commande de build | `npm run build` (`tsc -b && vite build`) | `vercel.json`, `package.json` |
| Dossier publié | `dist/` | `vercel.json` |
| URLs propres | `cleanUrls: true` | `vercel.json` |
| Node | `>=22.12.0` | `package.json` (`engines`) |

Pour un autre hébergeur (Netlify, Cloudflare Pages, S3 + CDN), il faut reproduire trois
choses : le build, les en-têtes de sécurité et les règles de cache ci-dessous.

## En-têtes et CSP

Toutes les routes reçoivent la politique suivante :

```
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;
font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none';
frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests
```

| Directive | Raison |
| --- | --- |
| `script-src 'self'` | Le seul script est le bundle ; l’amorçage du thème est dans `public/theme-init.js`, pas inline. |
| `style-src 'self'` | La feuille est produite par Vite ; les variables des curseurs passent par le CSSOM, pas par un attribut `style`. Vérifié sur les quatre étapes. |
| `connect-src 'self'` | Aucun appel réseau aujourd’hui. **À élargir** le jour où un tuteur distant ou une mesure d’audience arrive. |
| `img-src 'self' data:` | Favicon et images locales ; `data:` couvre les icônes inline. |
| `frame-ancestors 'none'` | Interdit l’intégration en iframe (anti-clickjacking). |
| `base-uri`, `form-action`, `object-src` | Fermés : aucun formulaire ni plugin n’est nécessaire. |
| `upgrade-insecure-requests` | Force HTTPS sur les sous-ressources. |

En complément : `X-Content-Type-Options: nosniff`, `Referrer-Policy:
strict-origin-when-cross-origin`, `Permissions-Policy` (caméra, micro, géolocalisation,
paiement et USB désactivés), `Cross-Origin-Opener-Policy: same-origin` et HSTS deux ans.

Vérifier après déploiement :

```bash
curl -sI https://<domaine>/ | grep -i -E 'content-security|strict-transport|x-content'
```

## Cache

| Ressource | Politique | Motif |
| --- | --- | --- |
| `/assets/*` | `max-age=31536000, immutable` | Noms hachés par Vite : le contenu ne change jamais sous la même URL. |
| `/theme-init.js` | `max-age=0, must-revalidate` | Doit suivre une correction de thème immédiatement. |
| `index.html` | cache par défaut de l’hébergeur | Ne jamais le rendre immuable : il référence les assets hachés. |

## Sécurité applicative

État mesuré le 24 novembre 2026, à revoir à chaque montée de version :

| Contrôle | Résultat | Portée |
| --- | --- | --- |
| `npm audit` (toutes dépendances) | 0 vulnérabilité connue | Met à jour la base dès qu’une alerte sort |
| `npm audit --omit=dev` | 0 vulnérabilité | Le runtime ne dépend que de `react`, `react-dom`, `scheduler` |
| `npm audit signatures` | 100 paquets signés, 45 attestations | Provenance vérifiée contre le registre npm |
| Scripts d’installation | 1 seul (`fsevents`, optionnel et macOS) | Aucun paquet npm n’exécute de code arbitraire à l’installation |
| Sinks XSS | Aucun `innerHTML`, `dangerouslySetInnerHTML`, `eval`, `new Function` | Le contenu Markdown est découpé en texte React, jamais injecté en HTML |
| Liens sortants | `target="_blank"` toujours avec `rel="noopener noreferrer"` | Pas de prise de contrôle de l’onglet d’origine |
| Secrets | Aucun fichier `.env`, aucune clé dans le dépôt ou le bundle | Rien à faire fuiter : le produit n’a pas de backend |
| Entrées non fiables | `?etape=` validé contre une liste fermée, thème validé en `light`/`dark` | Une valeur inconnue retombe sur le comportement par défaut |

Les seules entrées lues au démarrage sont le paramètre d’URL et les clés locales du thème et de
la progression. L’étape est validée contre les identifiants connus; les événements locaux sont
validés par version et schéma avant lecture. Un stockage malformé est supprimé et remplacé par
une progression vide. La restitution libre et les questions au tuteur ne sont pas enregistrées.

La CI refuse désormais un `npm audit` qui remonte une vulnérabilité haute ou critique
(`--audit-level=high`). C’est un cliquet : une dépendance introduite avec une faille connue casse
la construction avant d’atteindre la production.

Dependabot reste le mécanisme de correction : PR hebdomadaires pour npm, mensuelles pour les
actions GitHub. Une alerte critique non corrigeable doit être traitée comme un incident, pas
contournée en désactivant le contrôle.

## Intégration continue

`.github/workflows/ci.yml` s’exécute sur chaque pull request et sur chaque push vers `main` :
`npm ci`, audit des dépendances, types, lint, tests, validation du contenu et build, puis dépôt de `dist` en artefact
sept jours. Une exécution en cours est annulée par la suivante sur la même référence.

Le job tourne avec `permissions: contents: read` et `persist-credentials: false` : le jeton
GitHub n’est pas inscriptible et reste hors du dépôt cloné, donc un paquet compromis exécuté
pendant `npm ci` ne peut ni pousser ni modifier la CI.

Dependabot ouvre chaque semaine les mises à jour npm (dev regroupées) et chaque mois celles des
actions GitHub.

### Budget du bundle

La base JavaScript mesurée avant les lots d’apprentissage était de 76,9 kB gzip. Le build du lot D
mesure 85,68 kB gzip (+11,4 %, soit 1,09 kB au-dessus du seuil de +10 %). Cette hausse couvre
les deux étapes ajoutées et leur progression locale, les feedbacks pédagogiques, le tuteur
déterministe élargi, les liens du glossaire et le piège de focus partagé. Aucune dépendance
runtime n’a été ajoutée; la PR du lot D documente cette hausse liée aux critères fonctionnels
et d’accessibilité de cette itération.

### Point de vigilance : CI et Vercel sont indépendants

La CI ne déploie rien et Vercel ne lit pas l’artefact de la CI : les deux reconstruisent depuis
le dépôt. Sans protection de branche, un push dont les tests échouent peut donc être publié.
Avant le pilote :

1. activer la protection de `main` (pull request obligatoire, CI verte requise) ;
2. vérifier que Vercel ne déploie que depuis `main` ;
3. tester un déploiement de préproduction sur une branche.

## Supervision

Aujourd’hui, aucune télémétrie ne quitte le navigateur : pas de cookies, pas de script
d’audience, pas de collecte d’erreurs distante. `ErrorBoundary` journalise dans la console et
affiche un écran de secours ; le point d’ancrage de collecte est prévu dans
`componentDidCatch`.

C’est un choix défendable pour un pilote (aucune bannière de consentement, aucune donnée
personnelle), mais il laisse deux angles morts : on ne sait pas combien de visiteurs échouent
sur l’écran de secours, ni quelles étapes sont abandonnées.

Options, à trancher avant l’ouverture commerciale :

| Option | Ce qu’elle apporte | Ce qu’elle coûte |
| --- | --- | --- |
| Umami ou Plausible auto-hébergé | Pages vues, parcours, sans cookie | Un service à héberger, `connect-src` à élargir, mention de confidentialité |
| Plausible/Umami hébergé | Même mesure sans exploitation | Abonnement, sous-traitant à documenter |
| Sentry (erreurs seules) | Taux d’erreur et traces | `connect-src` vers Sentry, données techniques à filtrer, plan gratuit limité |
| Rien | Zéro donnée | Aucune visibilité sur les incidents |

Tant que la décision n’est pas prise, ne pas ajouter de script d’audience : la CSP et l’absence
de bannière sont des promesses visibles dans le produit.

## Frontière du tuteur

L’interface annonce « Réponses limitées au contenu vérifié. Assistant local, sans modèle
externe. » C’est exact : `tutorAnswer.ts` applique des règles déterministes et refuse les
données financières personnelles.

La tâche `T020` (comparer les options de confidentialité et consigner le fournisseur) n’est pas
faite. Aucun appel réseau ne doit être ajouté avant elle. Le jour où un fournisseur est
retenu, la liste minimale est :

- une fonction serveur qui détient la clé (jamais dans le bundle) ;
- `connect-src` limité à l’origine réellement appelée ;
- limitation de débit et taille de requête ;
- filtre de données personnelles côté serveur, pas seulement côté interface ;
- citations obligatoires vers le corpus approuvé et abstention si le corpus ne couvre pas ;
- mention de confidentialité et base légale ;
- tests de non-régression sur les abstentions.

La progression locale utilise la clé `oxo-learning-events-v1` et les événements
`step_completed`, `quiz_answered`, `hypothesis_changed`, `tutor_abstention`. Aucun événement
ne quitte le navigateur.

## Accessibilité

En place : `lang="fr"`, lien d’évitement, repères sémantiques, focus visible, cibles de 44 px
minimum, dialogues fermables avec `Échap`, dock du tuteur `inert` quand il est fermé, curseurs
avec `aria-valuetext`, respect de `prefers-reduced-motion`, contrastes des deux thèmes.

Écarts connus avant de revendiquer WCAG 2.2 AA :

- aucun test automatisé d’accessibilité (axe) ni parcours lecteur d’écran ;
- les dialogues et le tuteur piègent le focus et le restituent à leur déclencheur; les curseurs
  annoncent la catégorie, la variation et le poids pédagogique dans `aria-valuetext`.

## Données pédagogiques observées

Les chiffres HCP sont compilés dans `src/content/dataSnapshots.ts`, avec l’identifiant du
snapshot, la période de référence et de comparaison, l’unité, la géographie, l’éditeur, l’URL,
la date de publication, la date de collecte et le statut de vérification. Le navigateur ne
récupère aucune donnée à l’ouverture. Les valeurs observées d’octobre 2026 sont distinguées des
hypothèses de simulation. Le poids officiel alimentaire de 37,28 % concerne le panier HCP base
2017; les poids 40/25/35 du panier pédagogique ne sont pas des pondérations officielles.

Ces trois points sont de petite taille et devraient précéder une communication « accessible ».

## SEO et partage

`index.html` porte titre, description, Open Graph et Twitter Card. `robots.txt` autorise
l’indexation. En revanche, le contenu est rendu côté client et l’étape vit dans un paramètre de
requête : les robots d’aperçu social ne verront qu’une carte générique, et chaque étape n’a pas
d’URL indexable distincte.

Si le référencement devient un objectif, deux voies : prérendu statique des quatre étapes, ou
pages HTML distinctes générées au build. Tant que l’acquisition passe par un lien direct, le
coût ne se justifie pas.

## Runbook

**Déployer.** Pousser sur `main` ; Vercel reconstruit. Vérifier ensuite la page d’accueil, les
liens `/?etape=manipuler`, `/?etape=interpreter` et `/?etape=synthese`, l’ouverture du glossaire et les en-têtes avec la commande `curl`
ci-dessus.

**Revenir en arrière.** Utiliser le retour arrière instantané de Vercel vers le déploiement
précédent, puis corriger sur une branche. Ne pas réécrire `main`.

**Corriger un texte.** Modifier `src/content/lesson.ts` ou une fiche
`content/morocco/concepts/*.md`, mettre à jour `Date de revue`, lancer `npm run verify` et
`npm run build`, puis déployer. Le build valide les fiches Markdown, le manifeste typé, le graphe
de concepts, les références de snapshots et les métadonnées de revue éditoriale avant compilation.

**Mettre à jour une dépendance.** Laisser Dependabot ouvrir la PR, lire le diff, vérifier que
la CI passe. Pour React ou Vite, contrôler aussi le poids du bundle (`npm run build`).

**Incident.** Vérifier d’abord les en-têtes et le déploiement courant, puis l’écran de secours.
Sans collecte d’erreurs, demander au visiteur l’heure, la page et le navigateur ; reproduire en
local avec `npm run preview`.

## Décisions ouvertes

| Décision | Bloque | Prochaine action |
| --- | --- | --- |
| Fournisseur du tuteur (`T020`) | Toute réponse générative | Rédiger `ai/provider-decision.md` avec les options de confidentialité |
| Mesure d’audience et collecte d’erreurs | Vision de l’usage réel | Choisir une option du tableau ci-dessus |
| Protection de branche | Garantie qu’un push rouge ne part pas en ligne | Activer côté GitHub |
| Nom de domaine et environnement de préproduction | Partage contrôlé | Réserver le domaine, créer un projet Vercel de *preview* |
| Prérendu SEO | Indexation par étape | Décider après le pilote |

## Budget de performance actuel

Mesuré le 24 novembre 2026 sur le build de la branche Lot B : 42 modules, JavaScript 80,91 kB
gzip et CSS 5,78 kB gzip. La baseline du MVP était de 76,9 kB JavaScript et 5,6 kB CSS gzip;
la hausse JavaScript est de 5,2 %, sous le seuil de 10 %.
