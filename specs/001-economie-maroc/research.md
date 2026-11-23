# Recherche — OXO au Maroc

Date de consultation : 2026-11-20

## Décisions

OXO relie finances du quotidien, mécanismes de l’économie et décisions collectives par des parcours et simulations locales. Cette piste doit être validée auprès d’apprenants marocains. Une IA, des quiz ou des langues locales ne suffisent pas comme différenciation à eux seuls.

## Marché

| Offre | Offre décrite publiquement | Conséquence pour OXO |
|---|---|---|
| [Wekeza](https://www.wekeza.com/) | Leçons interactives, fonction Ask AI et 10 langues annoncées, dont français et langues africaines. | L’IA et le multilingue ne sont pas un avantage distinctif isolé. |
| [PesaQuest](https://pesaquest.moski.org/) | Monde financier virtuel, scénarios et contexte kenyan. | La simulation et le contexte local existent déjà; OXO vise les mécanismes macro et les choix collectifs. |
| [Ladder](https://ladder.africa/) | Assistant financier IA, suivi de dépenses, objectifs et placements au Ghana/Nigeria. | Garder OXO éducatif et indépendant des ventes de produits. |
| [Levela](https://www.prudentialplc.com/en/newsroom/company-news/2026/Prudence-Foundation-launches-Levela-a-free-educational-app-to-scale-financial-literacy-across-Asia-and-Africa/) | Parcours de finances personnelles, fraude, mode hors ligne et six langues annoncées; Ghana et Zambie sont annoncés comme marchés de déploiement ultérieur. | Les bases financières et l’accessibilité sont déjà couvertes par des acteurs structurés. |
| [Khan Academy](https://www.khanacademy.org/college-careers-more/financial-literacy) et [Zogo](https://zogo.com/) | Cours gratuits ou courts, quiz et ludification. | Une bibliothèque de leçons seule serait facile à substituer. |
| [AfriVest Academy](https://www.afrivest.org/ecosystem/academy) | Éducation financière, actifs numériques, récompenses et écosystème de participation. Le site revendique 1M+ d’apprenants, chiffre non vérifié. | Éviter les jetons et l’investissement dans le MVP. |

Les fonctionnalités proviennent des descriptions publiques des opérateurs et n’ont pas été testées. Les chiffres de portée sont des déclarations marketing, pas des validations indépendantes.

## Ressources marocaines existantes

- Le [Budget citoyen du Ministère de l’Économie et des Finances](https://www.finances.gov.ma/fr/Nos-metiers/Pages/Budget-citoyen.aspx) vulgarise la Loi de Finances et présente recettes, dépenses, dette, déficit et indicateurs. Une édition du PLF 2027 a été publiée le 12 novembre 2026 : [publication](https://www.finances.gov.ma/fr/Pages/detail-actualite.aspx?fiche=7860).
- Le [HCP](https://www.hcp.ma/Indices-des-prix-a-la-consommation-IPC_r348.html) définit l’IPC et publie des [indicateurs et données téléchargeables](https://www.hcp.ma/Indicateurs-Indices-des-prix-a-la-consommation-IPC_r351.html).
- Bank Al-Maghrib publie des [rapports sur la politique monétaire](https://www.bkam.ma/content/download/786483/8744186/RPM_T2.pdf) qui expliquent les taux, les conditions monétaires et leurs relations avec l’activité et les prix.
- L’[AMMC](https://www.ammc.ma/fr/publications/guide-pedagogique-comprendre-les-opcvm) propose des guides pédagogiques sur les instruments du marché des capitaux.

OXO ne doit donc pas revendiquer la nouveauté sur la simple simplification d’un budget ou d’un guide. La valeur à tester consiste à connecter ces ressources à une progression pédagogique et à des simulations manipulables qui rendent leurs hypothèses et limites explicites.

## Décisions de conception issues de la recherche

1. Construire une expérience qui relie une situation vécue, un mécanisme économique et un arbitrage public.
2. Commencer par une expérience web mobile anonyme; utiliser des données publiques sélectionnées et révisées, sans dépendre de flux en temps réel.
3. Encadrer le tuteur IA dans le parcours, avec sources visibles et réponse d’abstention si le corpus ne couvre pas une question.
4. Garder le MVP indépendant des ventes, placements, transactions et recommandations personnalisées.
5. Commencer en français simple et valider l’usage du Darija auprès du public pilote au lieu de supposer une qualité de traduction.

## Hypothèses à valider

- Public pilote exact : étudiants, jeunes actifs ou groupe mixte.
- Langue et format : français, Darija écrit ou audio, arabe standard et autres langues.
- Les utilisateurs trouvent-ils une valeur dans l’exploration des arbitrages publics?
- L’IA améliore-t-elle l’apprentissage par rapport à des explications guidées seules?
- La simulation enseigne-t-elle un mécanisme sans créer une illusion de précision?

Sources consultées : Wekeza, PesaQuest, Ladder, Prudence Foundation/Levela, Khan Academy, Zogo et AfriVest. Revue documentaire réalisée le 20 novembre 2026; disponibilité, pays et fonctionnalités peuvent évoluer.
