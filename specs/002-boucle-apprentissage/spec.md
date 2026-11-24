# Spécification de fonctionnalité : Boucle d’apprentissage OXO

**Feature Branch**: feat/002-apprentissage-lot-a  
**Created**: 2026-11-24  
**Status**: Draft  
**Input**: Exigences de l’itération OXO fournies par le porteur du projet, lots A à D.

## Contexte et objectif

Le MVP React 19, TypeScript et Vite est une application statique sans backend ni base de données. Il comporte deux étapes, observer et manipuler, un glossaire Markdown compilé au build et un tuteur local à règles déterministes.

Cette fonctionnalité corrige les données et la pédagogie du MVP, puis prépare une boucle d’apprentissage complète et son extension future. Elle doit conserver l’application statique, sa CSP stricte et son pipeline qui refuse les fiches de contenu incomplètes. Les lots sont livrés dans l’ordre A, B, C, D, chacun dans une PR distincte avec vérification verte avant d’engager le lot suivant.

## Scénarios utilisateur

### User Story 1 — Comprendre une donnée HCP datée et la comparer à son panier (Priority: P0, Lot A)

En tant qu’apprenant, je veux voir plusieurs chiffres HCP réels avec leurs périodes et sources, afin de distinguer une variation observée d’une hypothèse de simulation.

**Pourquoi cette priorité** : le contenu actuel affiche une période incorrecte et un IPC sans valeur. L’apprenant doit pouvoir vérifier les chiffres avant d’interpréter le modèle.

**Independent Test** : vérifier visuellement au moins trois chiffres HCP d’octobre 2026, leur provenance complète, leur période et leur statut, puis comparer le scénario réel et le panier pédagogique.

**Acceptance Scenarios** :

1. **Given** les publications HCP S1 et S2, **When** la première étape s’affiche, **Then** elle montre au moins l’IPC national +1,9 % sur un an, l’alimentaire +0,3 % sur un an face au transport +11,6 % sur un an, et les légumes +6,8 % sur un mois, avec source, période et statut.
2. **Given** la source IPC publiée le 20 novembre 2026 et couvrant octobre 2026, **When** la cohérence de date est vérifiée, **Then** la période de référence ne peut pas être postérieure à la publication.
3. **Given** le montant fixe du panier pédagogique de 240 DH, **When** il est présenté, **Then** il est décrit comme exemple fixe, panier simplifié et base mensuelle; le texte ne prétend pas que l’apprenant l’a choisi.
4. **Given** les poids de simulation 40/25/35, **When** ils sont montrés, **Then** ils sont étiquetés hypothèses pédagogiques et comparés uniquement au poids alimentaire officiel vérifié de 37,28 %, avec la mention « 12 postes officiels vs 3 postes simplifiés ».
5. **Given** le mode « Scénario réel octobre 2026 », **When** l’apprenant l’active, **Then** les variations alimentaire +0,3 % et transport +11,6 % préremplissent la simulation comme données observées sur un an; le mode libre reste explicitement présenté comme hypothèses.

### User Story 2 — Suivre une leçon construite à partir de premières observations (Priority: P1, Lot B)

En tant qu’apprenant, je veux suivre une progression allant d’une observation réelle au mécanisme, puis à un modèle et à ses limites, afin de comprendre les notions au lieu de mémoriser une définition isolée.

**Independent Test** : construire et charger une leçon française avec observation sourcée, mécanisme, formalisation, limites et récupération; le build échoue si une section ou métadonnée requise manque.

**Acceptance Scenarios** :

1. **Given** un manifeste complet, **When** le contenu est compilé, **Then** la leçon conserve le comportement visuel actuel et expose ses objectifs, prérequis, données, paramètres, quiz et revue.
2. **Given** un manifeste incomplet, **When** le build valide le contenu, **Then** il échoue avec le nom du champ manquant.
3. **Given** une chaîne d’interface, **When** elle est rendue, **Then** elle provient du catalogue de locale fr plutôt que d’un composant.
4. **Given** des concepts inflation et IPC, **When** leurs nœuds sont chargés, **Then** leurs identifiants et arêtes de prérequis sont consultables sans moteur adaptatif.

### User Story 3 — Interpréter, récupérer et terminer une leçon (Priority: P1, Lot C)

En tant qu’apprenant, je veux répondre à des questions qui révèlent les idées fausses, recevoir un feedback qui explique mon erreur et terminer par une synthèse, afin de vérifier ce que j’ai compris et ce que je dois revoir.

**Independent Test** : effectuer le parcours observer → manipuler → interpréter → synthèse, puis fermer et rouvrir l’application pour constater que les événements d’apprentissage sont conservés localement.

**Acceptance Scenarios** :

1. **Given** une mauvaise réponse qui correspond à une misconception, **When** l’apprenant la choisit, **Then** le feedback explique pourquoi cette interprétation est incorrecte.
2. **Given** la restitution « explique avec tes mots », **When** l’apprenant répond, **Then** une grille d’auto-évaluation ou des mots-clés servent de repères, sans score génératif.
3. **Given** une étape terminée, **When** elle est enregistrée, **Then** les événements conformes au schéma sont conservés uniquement dans localStorage.
4. **Given** la fin du quiz, **When** la synthèse s’affiche, **Then** elle rappelle l’idée clé, les limites, les sources et la prochaine étape.

### User Story 4 — Obtenir une réponse de tuteur locale et accessible (Priority: P2, Lot D)

En tant qu’apprenant, je veux recevoir une réponse utile sur le contenu de la leçon sans refus déclenché par un mot pris hors contexte, et naviguer dans les dialogues au clavier, afin de pouvoir utiliser l’outil sans risque de conseil inventé ni blocage d’accessibilité.

**Independent Test** : exécuter le jeu doré de questions, vérifier les abstentions et sur-refus, puis parcourir les dialogues et curseurs uniquement au clavier.

**Acceptance Scenarios** :

1. **Given** les questions « acheter des tomates » ou « les soldes », **When** le tuteur les reçoit, **Then** elles ne déclenchent pas un refus de placement ou un avertissement de partage de solde.
2. **Given** une question hors corpus ou une demande financière personnelle, **When** le tuteur répond, **Then** il s’abstient explicitement ou refuse la donnée personnelle selon le cas.
3. **Given** un dialogue avec aria-modal, **When** l’utilisateur tabule, **Then** le focus reste dans le dialogue jusqu’à sa fermeture.
4. **Given** un curseur de simulation, **When** l’utilisateur change sa valeur au clavier, **Then** aria-valuetext communique la valeur et son sens.
5. **Given** une entrée NaN, négative ou supérieure à 100 au modèle, **When** le calcul est demandé, **Then** le modèle rejette l’entrée.

## Cas limites

- Une donnée est affichée dans une période différente de celle qu’elle compare.
- Le snapshot se rapporte à une période antérieure ou égale à sa date de publication; l’interface doit préserver les deux dates distinctes.
- Une donnée est marquée verified sans référence, période, unité, éditeur ou URL.
- Les poids simulés pourraient être pris pour les pondérations HCP officielles.
- La somme pondérée contient des valeurs invalides, hors plage ou non numériques.
- Le tuteur reçoit un mot ambigu, une question hors corpus ou une donnée financière personnelle.
- localStorage contient un schéma d’événements antérieur, invalide ou impossible à lire.
- Aucun quiz n’est disponible dans une leçon ou un ID de concept référencé n’existe.
- Un dialogue est fermé par Échap ou son bouton alors que le focus est déplacé.
- Une préférence de locale inconnue est présente; fr doit être la locale de repli.

## Exigences

### Lot A — Données réelles et corrections éditoriales

- **FR-001**: La période de référence d’une source MUST être stockée distinctement de sa date de consultation et de sa date de publication.
- **FR-002**: Le snapshot HCP S1 MUST conserver les valeurs vérifiées fournies pour octobre 2026 avec leurs séries, périodes comparées, unités, géographie, éditeur, URL, retrievedAt et statut.
- **FR-003**: Les leçons MUST référencer les données du snapshot par identifiant stable et non par URL vivante.
- **FR-004**: L’étape observer MUST afficher au moins quatre données vérifiées : IPC national +1,9 % sur un an; alimentaire +0,3 % sur un an; transport +11,6 % sur un an; légumes +6,8 % sur un mois.
- **FR-005**: Le placeholder IPC « Moyenne » MUST être remplacé par une valeur sourcée. Le badge « Donnée observée » MUST correspondre à des données réellement affichées.
- **FR-006**: Le panier de 240 DH MUST être décrit comme exemple fixe, panier fictif simplifié et base mensuelle.
- **FR-007**: Les poids 40/25/35 MUST être étiquetés hypothèses pédagogiques. L’interface MUST n’afficher comme poids HCP comparatif que l’alimentaire 37,28 % et MUST indiquer « 12 postes officiels vs 3 postes simplifiés ».
- **FR-008**: La simulation MUST proposer le preset « Scénario réel octobre 2026 » qui préremplit les variations alimentaire et transport avec les chiffres S1 sur un an. Le mode libre MUST rester distinct et étiqueté hypothèses.
- **FR-009**: Les fiches éditoriales touchées MUST porter le statut draft ou to_review et la date de revue du changement.
- **FR-010**: Un test MUST échouer si la période de référence est postérieure à la date de publication connue de sa source.

### Lot B — Manifeste, i18n et graphe de concepts

- **FR-011**: Le contenu MUST être décrit par un manifeste LessonManifest typé comprenant id, locale, prerequisites, objectives, dataRefs, simulation/modelId/params, blocks, quiz et review.
- **FR-012**: La validation de contenu au build MUST généraliser le pipeline actuel et échouer avec une erreur explicite lorsqu’un champ requis manque.
- **FR-013**: La migration des textes existants MUST préserver le comportement visible de l’application.
- **FR-014**: Les chaînes d’interface MUST être séparées par locale et provenir d’un catalogue; fr est la seule locale livrée et aucune bibliothèque i18n n’est ajoutée.
- **FR-015**: Le domaine MUST définir ConceptNode et les arêtes de prérequis avec types et identifiants validés. Aucun moteur adaptatif n’est inclus.
- **FR-016**: La leçon inflation MUST suivre l’ordre observation, mécanisme, formalisation, limites, récupération et rester draft/to_review jusqu’à revue humaine.

### Lot C — Interpréter, synthétiser et enregistrer localement

- **FR-017**: Le parcours MUST ajouter une étape interpréter et l’intégrer à StepId, au routage URL, au navigateur et à la progression.
- **FR-018**: Le quiz MUST inclure des distracteurs correspondant aux misconceptions spécifiées par le porteur et un feedback ciblé expliquant pourquoi un distracteur est faux.
- **FR-019**: La restitution MUST fournir des mots-clés attendus ou une grille d’auto-évaluation et MUST exclure toute notation générative.
- **FR-020**: La synthèse MUST afficher idée clé, limites, sources et prochaine étape.
- **FR-021**: L’application MUST enregistrer step_completed, quiz_answered, hypothesis_changed et tutor_abstention dans localStorage uniquement.
- **FR-022**: Une vue progression locale MUST afficher concepts vus, quiz réussis et concepts à revoir.
- **FR-023**: Aucun événement, identifiant ou réponse MUST être envoyé hors du navigateur.

### Lot D — Tuteur, accessibilité et bornage du modèle

- **FR-024**: Le tuteur MUST utiliser des intentions ou mots-clés évalués avec garde-fous contextuels plutôt que des sous-chaînes générales isolées.
- **FR-025**: Le corpus local MUST couvrir inflation, IPC, panier, poids, hypothèse, simulation et période. Les questions hors corpus et demandes de données financières personnelles MUST conserver leur abstention/refus explicite.
- **FR-026**: Un jeu doré MUST couvrir hors corpus, misconceptions et cas adversariaux comme acheter, soldes et investir en contexte non financier. Les tests MUST mesurer abstention, sur-refus et conformité.
- **FR-027**: InfoDialog et TutorDock MUST piéger le focus lorsque aria-modal=true et libérer le focus à la fermeture.
- **FR-028**: Les curseurs MUST fournir aria-valuetext utile et leur utilisation au clavier MUST rester compréhensible.
- **FR-029**: calculateBasket MUST rejeter NaN, valeur négative et valeur supérieure à 100.
- **FR-030**: Le modèle MUST exposer une seule valeur canonique de variation pondérée; percentChange et weightedChange ne doivent pas représenter le même résultat en doublon.
- **FR-031**: Les fiches du glossaire MUST inclure des liens croisés vers les concepts liés.

### Exigences non fonctionnelles et contraintes

- **NFR-001**: Aucune requête réseau, API LLM ou télémétrie ne doit être ajoutée.
- **NFR-002**: Les données et événements restent locaux; localStorage est la seule persistance nouvelle autorisée.
- **NFR-003**: La CSP stricte existante est conservée sans unsafe-inline.
- **NFR-004**: Aucune dépendance runtime nouvelle n’est ajoutée sans justification documentée et approbation du porteur.
- **NFR-005**: Le bundle JavaScript gzip est environ 77 kB avant les changements; toute hausse supérieure à 10 % doit être justifiée.
- **NFR-006**: L’architecture i18n fournit uniquement fr; aucun contenu anglais ou darija n’est créé.
- **NFR-007**: Aucun moteur adaptatif ni écran social, classement, marketplace, UGC, application native, certificat, paiement, historique de chat ou profil n’est ajouté.
- **NFR-008**: Toute nouvelle affirmation ou donnée non fournie dans cette spécification doit être sourcée et marquée to_review.
- **NFR-009**: Tout nouveau contenu rédigé reste draft ou to_review jusqu’à validation humaine. Les seuls chiffres verified de cette itération sont les chiffres S1/S2.
- **NFR-010**: Chaque lot doit faire passer npm run verify et npm run build avant ouverture de sa PR.
- **NFR-011**: docs/architecture.md et docs/production.md MUST refléter le comportement réellement livré.

### Source de vérité des données de cette itération

**S1 — HCP, IPC octobre 2026**

- Titre : « L’Indice des prix à la consommation (IPC) du mois d’octobre 2026 »
- Publication : 2026-11-20
- Référence : octobre 2026; consultée le 2026-11-24 pour cette itération
- URL : https://www.hcp.ma/L-Indice-des-prix-a-la-consommation-IPC-du-mois-d-octobre-2026_a4369.html
- Valeurs vérifiées : national +0,8 % m/m et +1,9 % a/a; alimentaire +1,6 % m/m et +0,3 % a/a; non-alimentaire +0,3 % m/m et +3,1 % a/a; légumes +6,8 % m/m; viandes +2,7 % m/m; poissons et fruits de mer −0,8 % m/m; carburants +5,0 % m/m; transport +11,6 % a/a; loisirs et culture −0,1 % a/a; inflation sous-jacente +0,2 % m/m et +1,0 % a/a; villes Errachidia +1,6 % m/m et Al Hoceima −0,3 % m/m.

**S2 — HCP, méthode et panier de référence, publié le 2023-04-17**

- Titre : « L’inflation : comment elle est calculée, de quoi est composé le panier de référence »
- URL : https://www.hcp.ma/L-inflation-comment-elle-est-calculee-de-quoi-est-compose-le-panier-de-reference_a3701.html
- Faits vérifiés base 2017 : 12 postes COICOP, 546 produits, 1 391 variétés, 18 villes; souks ruraux exclus; poids alimentaire 37,28 % (base 2017, contre 39,28 % en base 2006); santé 7,7 % et éducation 6,3 % en 2017.
- Règle : ne pas inventer les poids officiels logement ou transport. Dans l’UI comparer uniquement le poids alimentaire 37,28 % et indiquer « 12 postes officiels vs 3 postes simplifiés ».

### Critères de succès

- **SC-001**: L’étape observer affiche au moins quatre chiffres vérifiés, chacun avec provenance complète et période.
- **SC-002**: Le test de cohérence période/publication passe et détecterait une période postérieure.
- **SC-003**: Le panier fictif, ses poids hypothétiques, le poids alimentaire officiel et la comparaison 12/3 sont correctement distingués.
- **SC-004**: Le parcours complet observer → manipuler → interpréter → synthèse s’achève sans quitter la boucle.
- **SC-005**: Tous les événements d’apprentissage requis sont lisibles depuis localStorage après réouverture et aucune requête réseau ne les transmet.
- **SC-006**: Le tuteur passe son jeu doré sans refus sur les sondes non financières et s’abstient hors corpus.
- **SC-007**: npm run verify et npm run build passent à la fin de chacun des lots.
- **SC-008**: Le bundle gzip reste dans la limite de +10 %, ou son dépassement est justifié dans la PR du lot concerné.

## Hypothèses

- Le dépôt existant reste l’application cible; React 19, TypeScript, Vite, Vitest et Oxlint sont conservés.
- Les quatre lots peuvent être livrés dans l’ordre demandé sur des branches/PR séparées.
- L’application reste statique et sans backend.
- Les tests unitaires et UI restent dans le dispositif Vitest déjà installé.
- La protection de main et la configuration Vercel sont des actions manuelles; elles ne sont pas modifiées par ces lots.
- Les dates de revue du contenu touché reflètent le 24 novembre 2026; le statut reste to_review/draft jusqu’à approbation humaine.

## Hors périmètre

- Fournisseur IA ou appel LLM, requête réseau ou télémétrie.
- Contenu éditorial en anglais ou darija.
- Moteur adaptatif ou recommandation personnalisée.
- Nouvelles pages autres que entrée, activité, synthèse, glossaire/sources, dock tuteur et progression locale.
- Authentification, profil, historique de conversation, UGC, classements, certificats, marketplace ou paiement.
- Nouveaux chiffres officiels ou poids HCP absents des sources S1/S2.
