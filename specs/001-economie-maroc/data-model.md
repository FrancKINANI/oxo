# Modèle de données conceptuel

Ce modèle décrit le domaine pédagogique sans imposer une base de données ou un fournisseur.

## Parcours d’apprentissage

Séquence guidée autour d’un objectif de compréhension.

- Identifiant stable, titre et description en langage clair
- Public ou prérequis
- Étapes ordonnées et concepts couverts
- Version éditoriale, date de revue et langues disponibles

Un parcours publié référence les versions des concepts et scénarios qu’il utilise.

## Étape d’apprentissage

Explication, question, comparaison ou activité d’un parcours.

- Identifiant et ordre
- Type d’étape
- Texte et consigne
- Concept associé et résultat pédagogique attendu
- Références associées

## Concept

Notion économique ou financière expliquée par OXO.

- Identifiant et terme
- Définition simplifiée et exemple marocain
- Prérequis et concepts liés
- Variantes de formulation ou glossaire
- Sources soutenant l’explication
- Niveau de complexité et date de revue

## Scénario de simulation

Situation pédagogique modélisée pour explorer des hypothèses.

- Identifiant, version et situation initiale
- Objectif pédagogique
- Période ou population si applicable
- Type : hypothétique ou inspiré de données publiées
- Hypothèses, règles de calcul et limites
- Sources et date de revue
- Variables d’entrée et résultats affichés

Un scénario indique qu’il illustre une relation simplifiée et qu’il ne constitue pas une prévision.

## Variable de scénario

Entrée modifiable ou constante.

- Nom et explication
- Valeur initiale et unité
- Minimum, maximum ou choix autorisés
- Statut : donnée observée, hypothèse éditoriale ou choix apprenant
- Source et période si la valeur est observée

## Résultat de simulation

Résultat calculé à partir des entrées et des règles du scénario.

- Scénario et version
- Entrées utilisées
- Valeurs calculées, unités et période
- Règle de calcul
- Explication pédagogique
- Avertissement sur les hypothèses et limites

Le résultat n’est pas conservé au-delà de la session dans le MVP.

## Source

Publication, série statistique ou document de référence.

- Titre et éditeur
- URL
- Date de publication ou référence
- Période couverte
- Unité, définition et méthode si disponibles
- Statut d’accessibilité et date de dernière vérification
- Concepts, variables et explications soutenus

Une source inaccessible ne doit pas être présentée comme récemment vérifiée.

## Révision éditoriale

État de validation d’un contenu.

- Élément et numéro de version
- Rôle de la personne qui révise
- Date de révision et statut : brouillon, relu, publié, à revoir
- Changements de définition, de données ou de modèle
- Références contrôlées

## Session apprenant

État anonyme et temporaire de navigation dans le MVP.

- Parcours et étape courante
- Réponses ou choix nécessaires à l’activité
- Horodatages de session non identifiants
- Aucun nom, courriel, identifiant financier ou donnée de compte

La progression reste locale et s’efface lorsque l’apprenant réinitialise la session ou quitte le parcours.
