# AUDIT FINAL — VOYAGE MAJORQUE

Export statique du code actuel (version 1.4.56). L’ordre ci-dessous suit le parcours canonique ; les variantes conditionnelles sont indiquées dans leur écran. Les mentions entre crochets décrivent une condition d’affichage et ne sont pas du texte affiché. Les retours à la ligne reproduisent les <br> du code ou séparent ses éléments visibles ; le retour automatique lié à la largeur de l’écran n’est pas représenté.

## [Accès Safari — installation]

TYPE : installation

ARRIVE APRÈS : Ouverture hors PWA, sans autorisation de prévisualisation Safari

TEXTE EXACT AFFICHÉ :

```text
Avant d’ouvrir le carnet
Installe-le sur ton iPhone
Cette histoire est faite pour être vécue comme une vraie webapp, depuis ton écran d’accueil.
1 Dans Safari, touche les … en bas à droite.
2 Choisis Partager.
3 Choisis Sur l’écran d’accueil.
4 Touche Ajouter, puis ouvre le carnet depuis sa nouvelle icône.
Continuer quand même dans Safari
```

ACTION UTILISATEUR : Installer puis ouvrir la PWA, ou « Continuer quand même dans Safari »

ÉCRAN SUIVANT : Prologue 1 — bienvenue

VISUEL PRINCIPAL : Icône et étapes d’installation.

---

## [Prologue 1 — bienvenue]

TYPE : narration

ARRIVE APRÈS : Ouverture en PWA ou accès Safari autorisé

TEXTE EXACT AFFICHÉ :

```text
Bonjour Marjolaine.
Je suis un arc-en-ciel.
Je suis né parce que la pluie et le soleil se sont rencontrés.
Je suis né parce que votre voyage a commencé.
On dit souvent que ce n’est pas la destination qui compte, mais le chemin pour y parvenir.
Je ne suis pas tout à fait d’accord.
Je pense que certains voyages restent beaux pour une raison beaucoup plus simple.
Est-ce que tu veux découvrir avec moi pourquoi ?
Commencer le voyage →
```

ACTION UTILISATEUR : Cliquer « Commencer le voyage → »

ÉCRAN SUIVANT : Prologue 2 — invitation

VISUEL PRINCIPAL : Arc-en-ciel et papier aquarelle.

---

## [Prologue 2 — invitation]

TYPE : narration

ARRIVE APRÈS : Prologue 1

TEXTE EXACT AFFICHÉ :

```text
Pendant quelques jours…
Je t’invite à ouvrir quelques pages,
à relever quelques défis,
et à te laisser surprendre.
Tu verras des choses que tu n’as encore jamais vues.
Des instants qui ont existé sans laisser d’image.
Des souvenirs qui auraient mérité d’être gardés quelque part.
Alors je les ai recréés.
Tu verras ce qui a été, ce qui aurait pu être, et peut-être aussi un peu de ce qui pourra être.
Des morceaux de votre histoire dont certains restent encore à inventer.
On y va ?
C’est parti ! →
```

ACTION UTILISATEUR : Cliquer « C’est parti ! → »

ÉCRAN SUIVANT : Prologue 3 — carnet

VISUEL PRINCIPAL : Arc-en-ciel, branche/feuille et papier.

---

## [Prologue 3 — carnet]

TYPE : narration

ARRIVE APRÈS : Prologue 2

TEXTE EXACT AFFICHÉ :

```text
Un petit carnet t’attend.
C’est lui qui va nous accompagner.
Il contiendra les étapes de notre voyage,
avec ses défis et ses découvertes.
Prends-le, quand tu es prête.
Et laisse-toi guider…
Tape sur le carnet pour l’ouvrir.
```

ACTION UTILISATEUR : Taper sur le carnet

ÉCRAN SUIVANT : Carnet — aperçu initial

VISUEL PRINCIPAL : Carnet fermé, cœur et arc-en-ciel.

---

## [Carnet — aperçu initial]

TYPE : carnet

ARRIVE APRÈS : Prologue 3 ou retour entre deux souvenirs

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
?
Il y a encore beaucoup
de pages à remplir…
Vignette 1 : Etre un couple (si souvenir révélé)
Vignette 2 : La vie à trois (si souvenir révélé)
Vignette 3 : La vie à quatre (si souvenir révélé)
Vignette 5 : Stockholm (si souvenir révélé)
Vignette 6 : Retour en France (si souvenir révélé)
Vignette 7 : Adolescence (si souvenir révélé)
Vignette 8 : Futur lointain (si souvenir révélé)
Vignette 4 : Majorque (si souvenir révélé)
```

ACTION UTILISATEUR : Taper sur la vignette fermée du prochain défi ; une vignette révélée rouvre sa galerie

ÉCRAN SUIVANT : Carnet — premier souvenir ou prochain défi

VISUEL PRINCIPAL : Carnet et polaroids ; nombre visible dépend de la progression.

---

## [Carnet — premier souvenir]

TYPE : carnet

ARRIVE APRÈS : Tap sur le premier polaroid fermé

TEXTE EXACT AFFICHÉ :

```text
← Notre voyage
?
Ce souvenir t’attend…
Pour le découvrir, il va falloir relever un défi.
C’est le premier d’une belle aventure.
Commencer le défi 1
```

ACTION UTILISATEUR : Cliquer « Commencer le défi 1 » ou retour « ← Notre voyage »

ÉCRAN SUIVANT : D1 — introduction

VISUEL PRINCIPAL : Grand polaroid retourné.

---

## [D1 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — premier souvenir

TEXTE EXACT AFFICHÉ :

```text
DÉFI 1
Les règles de notre monde
Avant de parcourir notre histoire…
Voyons si tu connais encore
les règles de notre monde à nous.
Découvrir les règles
```

ACTION UTILISATEUR : Cliquer « Découvrir les règles »

ÉCRAN SUIVANT : D1 — portes

VISUEL PRINCIPAL : Porte dessinée.

---

## [D1 — portes]

TYPE : challenge

ARRIVE APRÈS : D1 — introduction ou après la révélation d’une règle

TEXTE EXACT AFFICHÉ :

```text
Les règles de notre monde
Choisis une porte
On commence toujours par la règle numéro 1. [si aucune porte ouverte]
Chaque porte ouverte garde sa couleur. [après la première porte, et après les six]
Règle n°1
Règle n°2
Règle n°3
Règle n°4
Règle n°5
Règle n°6
Tu connais les règles de votre monde.
Alors maintenant… on peut entrer. [après les six portes]
Entrer [après les six portes]
```

ACTION UTILISATEUR : Ouvrir une porte disponible ; après les six, cliquer « Entrer »

ÉCRAN SUIVANT : D1 — dessin de la règle choisie ou D1 — conclusion

VISUEL PRINCIPAL : Six portes illustrées.

---

## [D1 — règle 1, dessin]

TYPE : question

ARRIVE APRÈS : D1 — portes, porte 1

TEXTE EXACT AFFICHÉ :

```text
Règle n°1
Quelle règle se cache derrière ce dessin ?
Je connais la règle
Dessine-moi encore un peu [niveaux 1–2]
Donne-moi un indice [niveau 3]
Avec Marjo, mieux vaut être d’accord ! [si indice demandé]
```

ACTION UTILISATEUR : Demander jusqu’à deux dessins supplémentaires, puis l’indice ; ou cliquer « Je connais la règle »

ÉCRAN SUIVANT : D1 — règle 1, réponse orale

VISUEL PRINCIPAL : Croquis de la règle, en trois niveaux.

---

## [D1 — règle 1, réponse orale]

TYPE : question

ARRIVE APRÈS : D1 — règle 1, dessin

TEXTE EXACT AFFICHÉ :

```text
Règle n°1
Alors dis-la à Vincent.
J’ai trouvé
```

ACTION UTILISATEUR : Dire la règle à Vincent, puis cliquer « J’ai trouvé »

ÉCRAN SUIVANT : D1 — règle 1, révélation

VISUEL PRINCIPAL : Croquis, petit arc-en-ciel.

---

## [D1 — règle 1, révélation]

TYPE : résultat

ARRIVE APRÈS : D1 — règle 1, réponse orale

TEXTE EXACT AFFICHÉ :

```text
Règle n°1
Marjolaine a toujours raison.
Continuer [apparaît après un délai]
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D1 — portes

VISUEL PRINCIPAL : Croquis complété en aquarelle.

---

## [D1 — règle 2, dessin]

TYPE : question

ARRIVE APRÈS : D1 — portes, porte 2

TEXTE EXACT AFFICHÉ :

```text
Règle n°2
Quelle règle se cache derrière ce dessin ?
Je connais la règle
Dessine-moi encore un peu [niveaux 1–2]
Donne-moi un indice [niveau 3]
Vincent n’a qu’une mission :
les éplucher, les couper,
et les lui servir. [si indice demandé]
```

ACTION UTILISATEUR : Demander jusqu’à deux dessins supplémentaires, puis l’indice ; ou cliquer « Je connais la règle »

ÉCRAN SUIVANT : D1 — règle 2, réponse orale

VISUEL PRINCIPAL : Croquis de la règle, en trois niveaux.

---

## [D1 — règle 2, réponse orale]

TYPE : question

ARRIVE APRÈS : D1 — règle 2, dessin

TEXTE EXACT AFFICHÉ :

```text
Règle n°2
Alors dis-la à Vincent.
J’ai trouvé
```

ACTION UTILISATEUR : Dire la règle à Vincent, puis cliquer « J’ai trouvé »

ÉCRAN SUIVANT : D1 — règle 2, révélation

VISUEL PRINCIPAL : Croquis, petit arc-en-ciel.

---

## [D1 — règle 2, révélation]

TYPE : résultat

ARRIVE APRÈS : D1 — règle 2, réponse orale

TEXTE EXACT AFFICHÉ :

```text
Règle n°2
Vincent doit éplucher
et couper les pommes
de Marjolaine.
Continuer [apparaît après un délai]
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D1 — portes

VISUEL PRINCIPAL : Croquis complété en aquarelle.

---

## [D1 — règle 3, dessin]

TYPE : question

ARRIVE APRÈS : D1 — portes, porte 3

TEXTE EXACT AFFICHÉ :

```text
Règle n°3
Quelle règle se cache derrière ce dessin ?
Je connais la règle
Dessine-moi encore un peu [niveaux 1–2]
Donne-moi un indice [niveau 3]
Ce café appartient à Vincent.
Le chocolat, beaucoup moins... [si indice demandé]
```

ACTION UTILISATEUR : Demander jusqu’à deux dessins supplémentaires, puis l’indice ; ou cliquer « Je connais la règle »

ÉCRAN SUIVANT : D1 — règle 3, réponse orale

VISUEL PRINCIPAL : Croquis de la règle, en trois niveaux.

---

## [D1 — règle 3, réponse orale]

TYPE : question

ARRIVE APRÈS : D1 — règle 3, dessin

TEXTE EXACT AFFICHÉ :

```text
Règle n°3
Alors dis-la à Vincent.
J’ai trouvé
```

ACTION UTILISATEUR : Dire la règle à Vincent, puis cliquer « J’ai trouvé »

ÉCRAN SUIVANT : D1 — règle 3, révélation

VISUEL PRINCIPAL : Croquis, petit arc-en-ciel.

---

## [D1 — règle 3, révélation]

TYPE : résultat

ARRIVE APRÈS : D1 — règle 3, réponse orale

TEXTE EXACT AFFICHÉ :

```text
Règle n°3
Marjolaine a le droit de tremper
son chocolat dans le café de Vincent.
Continuer [apparaît après un délai]
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D1 — portes

VISUEL PRINCIPAL : Croquis complété en aquarelle.

---

## [D1 — règle 4, dessin]

TYPE : question

ARRIVE APRÈS : D1 — portes, porte 4

TEXTE EXACT AFFICHÉ :

```text
Règle n°4
Quelle règle se cache derrière ce dessin ?
Je connais la règle
Dessine-moi encore un peu [niveaux 1–2]
Donne-moi un indice [niveau 3]
Cet air ronchon ne change rien :
il fait partie de la règle ! [si indice demandé]
```

ACTION UTILISATEUR : Demander jusqu’à deux dessins supplémentaires, puis l’indice ; ou cliquer « Je connais la règle »

ÉCRAN SUIVANT : D1 — règle 4, réponse orale

VISUEL PRINCIPAL : Croquis de la règle, en trois niveaux.

---

## [D1 — règle 4, réponse orale]

TYPE : question

ARRIVE APRÈS : D1 — règle 4, dessin

TEXTE EXACT AFFICHÉ :

```text
Règle n°4
Alors dis-la à Vincent.
J’ai trouvé
```

ACTION UTILISATEUR : Dire la règle à Vincent, puis cliquer « J’ai trouvé »

ÉCRAN SUIVANT : D1 — règle 4, révélation

VISUEL PRINCIPAL : Croquis, petit arc-en-ciel.

---

## [D1 — règle 4, révélation]

TYPE : résultat

ARRIVE APRÈS : D1 — règle 4, réponse orale

TEXTE EXACT AFFICHÉ :

```text
Règle n°4
Tous les chats sont beaux.
Continuer [apparaît après un délai]
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D1 — portes

VISUEL PRINCIPAL : Croquis complété en aquarelle.

---

## [D1 — règle 5, dessin]

TYPE : question

ARRIVE APRÈS : D1 — portes, porte 5

TEXTE EXACT AFFICHÉ :

```text
Règle n°5
Quelle règle se cache derrière ce dessin ?
Je connais la règle
Dessine-moi encore un peu [niveaux 1–2]
Donne-moi un indice [niveau 3]
Notre lit est tout petit
pour notre amour.
Pas question d’y ajouter
notre fierté. [si indice demandé]
```

ACTION UTILISATEUR : Demander jusqu’à deux dessins supplémentaires, puis l’indice ; ou cliquer « Je connais la règle »

ÉCRAN SUIVANT : D1 — règle 5, réponse orale

VISUEL PRINCIPAL : Croquis de la règle, en trois niveaux.

---

## [D1 — règle 5, réponse orale]

TYPE : question

ARRIVE APRÈS : D1 — règle 5, dessin

TEXTE EXACT AFFICHÉ :

```text
Règle n°5
Alors dis-la à Vincent.
J’ai trouvé
```

ACTION UTILISATEUR : Dire la règle à Vincent, puis cliquer « J’ai trouvé »

ÉCRAN SUIVANT : D1 — règle 5, révélation

VISUEL PRINCIPAL : Croquis, petit arc-en-ciel.

---

## [D1 — règle 5, révélation]

TYPE : résultat

ARRIVE APRÈS : D1 — règle 5, réponse orale

TEXTE EXACT AFFICHÉ :

```text
Règle n°5
On ne doit jamais se coucher
en étant fâchés.
Continuer [apparaît après un délai]
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D1 — portes

VISUEL PRINCIPAL : Croquis complété en aquarelle.

---

## [D1 — règle 6, dessin]

TYPE : question

ARRIVE APRÈS : D1 — portes, porte 6

TEXTE EXACT AFFICHÉ :

```text
Règle n°6
Quelle règle se cache derrière ce dessin ?
Je connais la règle
Dessine-moi encore un peu [niveaux 1–2]
Donne-moi un indice [niveau 3]
À la maison, il y a
une seule façon de circuler...
Vincent le sait bien ! [si indice demandé]
```

ACTION UTILISATEUR : Demander jusqu’à deux dessins supplémentaires, puis l’indice ; ou cliquer « Je connais la règle »

ÉCRAN SUIVANT : D1 — règle 6, réponse orale

VISUEL PRINCIPAL : Croquis de la règle, en trois niveaux.

---

## [D1 — règle 6, réponse orale]

TYPE : question

ARRIVE APRÈS : D1 — règle 6, dessin

TEXTE EXACT AFFICHÉ :

```text
Règle n°6
Alors dis-la à Vincent.
J’ai trouvé
```

ACTION UTILISATEUR : Dire la règle à Vincent, puis cliquer « J’ai trouvé »

ÉCRAN SUIVANT : D1 — règle 6, révélation

VISUEL PRINCIPAL : Croquis, petit arc-en-ciel.

---

## [D1 — règle 6, révélation]

TYPE : résultat

ARRIVE APRÈS : D1 — règle 6, réponse orale

TEXTE EXACT AFFICHÉ :

```text
Règle n°6
À la maison, on porte toujours
ses chaussons.
Continuer [apparaît après un délai]
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D1 — portes

VISUEL PRINCIPAL : Croquis complété en aquarelle.

---

## [D1 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D1 — portes, six règles découvertes

TEXTE EXACT AFFICHÉ :

```text
Tu connais les règles de notre monde.
Un souvenir de nous t’attend maintenant.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D1 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D1 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D1 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D1 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D1 — galerie]

TYPE : galerie

ARRIVE APRÈS : D1 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
2 / 5
3 / 5
4 / 5
5 / 5
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 5 images ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D1 — remise

VISUEL PRINCIPAL : 5 emplacements d’image ; 5 image(s) configurée(s), 0 placeholder(s).

---

## [D1 — remise]

TYPE : handover

ARRIVE APRÈS : D1 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce souvenir n’est pas tout à fait terminé.
Vincent a encore quelque chose pour toi.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Carnet — aperçu avant le défi suivant

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Carnet — aperçu avant D2]

TYPE : carnet

ARRIVE APRÈS : D1 — remise

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
?
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid fermé suivant

ÉCRAN SUIVANT : D2 — introduction

VISUEL PRINCIPAL : Carnet et polaroids.

---

## [D2 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — aperçu avant D2

TEXTE EXACT AFFICHÉ :

```text
DÉFI 2
Notre profil de couple
Un test très scientifique. Évidemment.
12 questions. Deux réponses à chaque fois.
D’abord Marjolaine. Puis Vincent.
Commencer le test
```

ACTION UTILISATEUR : Cliquer « Commencer le test »

ÉCRAN SUIVANT : D2 — question 1

VISUEL PRINCIPAL : Carnet ouvert et crayon.

---

## [D2 — question 1]

TYPE : question

ARRIVE APRÈS : D2 — introduction

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Votre définition d’un moment romantique depuis que vous êtes parents ?
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
● Dix minutes tranquilles sur le canapé, ça compte déjà beaucoup.
✦ Un fou rire au milieu d’un moment complètement bancal.
♡ Un moment où on se retrouve vraiment tous les deux, même très court.
◆ Un vrai dîner à deux, organisé à l’avance.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 2

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 2]

TYPE : question

ARRIVE APRÈS : D2 — question 1

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Votre couple face au manque de sommeil, c’est…
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
◆ Une équipe qui se répartit les rôles.
✦ Deux zombies qui finissent par rire de leur état.
● Deux zombies qui essaient de se relayer gentiment.
♡ Deux zombies qui trouvent encore le moyen de se faire un câlin.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 3

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 3]

TYPE : question

ARRIVE APRÈS : D2 — question 2

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Quand vous avez enfin une soirée à deux, vous choisissez quoi ?
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
♡ Peu importe ce qu’on fait, du moment qu’on est vraiment ensemble.
✦ Improviser au dernier moment selon l’humeur.
◆ Quelque chose de prévu pour vraiment en profiter.
● Ne rien faire et récupérer ensemble.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 4

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 4]

TYPE : question

ARRIVE APRÈS : D2 — question 3

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Dans votre couple, le romantisme aujourd’hui ressemble plutôt à…
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
◆ Des attentions préparées à l’avance.
♡ Un bisou, une main posée sur l’autre, un regard qui veut tout dire.
● Des petits gestes pratiques qui soulagent l’autre.
✦ Des blagues privées que personne d’autre ne comprend.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 5

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 5]

TYPE : question

ARRIVE APRÈS : D2 — question 4

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Si votre vie de famille était une météo, ce serait…
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
● Quelques averses, mais on reste bien à l’abri ensemble.
♡ Un temps changeant, avec toujours un petit coin de ciel bleu à deux.
✦ Une petite tempête suivie d’un grand arc-en-ciel.
◆ Un ciel changeant mais surveillé de près.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 6

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 6]

TYPE : question

ARRIVE APRÈS : D2 — question 5

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Quand l’un de vous est épuisé, l’autre…
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
♡ Commence par vérifier qu’il va vraiment bien.
◆ Réorganise immédiatement la journée pour prendre le relais.
✦ Commence par le faire rire avant de prendre la suite.
● Fait ce qu’il peut pour alléger la charge.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 7

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 7]

TYPE : question

ARRIVE APRÈS : D2 — question 6

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Votre plus grande force à deux ?
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
● Savoir vous soutenir.
✦ Savoir rire ensemble.
♡ Ne jamais vraiment vous perdre de vue.
◆ Savoir vous organiser.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 8

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 8]

TYPE : question

ARRIVE APRÈS : D2 — question 7

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
À la fin d’une longue journée, votre geste préféré ?
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
✦ Se regarder avec l’air de dire « on a survécu ».
● S’affaler côte à côte et souffler enfin.
◆ Faire le point ensemble sur ce qu’il reste à gérer.
♡ Se rapprocher l’un de l’autre, même sans parler.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 9

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 9]

TYPE : question

ARRIVE APRÈS : D2 — question 8

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Ce qui vous ressemble le plus depuis que vous êtes parents ?
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
♡ Toujours amoureux, mais autrement.
● Plus attentifs l’un à l’autre qu’avant.
◆ Plus organisés qu’avant.
✦ Encore plus complices dans l’imprévu.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 10

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 10]

TYPE : question

ARRIVE APRÈS : D2 — question 9

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Quand vous repensez à votre vie “avant”, vous vous dites…
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
✦ « On avait déjà de bons souvenirs, mais pas ceux-là. »
♡ « Notre vie a changé, mais j’aime toujours autant être juste avec toi. »
◆ « On avait tellement moins de choses à organiser. »
● « On ne savait pas ce que voulait dire être vraiment fatigués. »
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 11

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 11]

TYPE : question

ARRIVE APRÈS : D2 — question 10

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Si votre couple avait un super-pouvoir, ce serait…
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
● Continuer à avancer même avec très peu d’énergie.
♡ Réussir à se retrouver même quand tout le reste prend toute la place.
◆ Anticiper les catastrophes.
✦ Transformer le chaos en complicité.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — question 12

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — question 12]

TYPE : question

ARRIVE APRÈS : D2 — question 11

TEXTE EXACT AFFICHÉ :

```text
Notre profil de couple
Au fond, votre nouvelle vie ressemble surtout à…
Réponse de Marjolaine / Réponse de Vincent [sur le même écran, successivement]
♡ Une histoire d’amour qui a grandi pour faire de la place à quelqu’un d’autre.
◆ Un équilibre qu’on construit et qu’on ajuste chaque jour.
● Une équipe qui apprend à se soutenir dans la fatigue.
✦ Une aventure imprévisible qui devient votre histoire préférée.
```

ACTION UTILISATEUR : Marjolaine choisit, puis Vincent choisit ; passage automatique à la question suivante

ÉCRAN SUIVANT : D2 — profils de couple

VISUEL PRINCIPAL : Quatre bandes de choix ; douze points de progression.

---

## [D2 — profils de couple]

TYPE : résultat

ARRIVE APRÈS : D2 — question 12

TEXTE EXACT AFFICHÉ :

```text
Le carnet
Votre profil de couple
Marjolaine
Vincent
◆ L’équipe organisée
Planning, relais, organisation : vous aimez sentir que les choses sont sous contrôle… ou au moins faire semblant.
● Tendrement débordés
Vous avez compris l’essentiel : parfois, aimer quelqu’un, c’est surtout lui dire “vas-y, je m’en occupe”.
✦ Complices dans le chaos
Chez vous, les galères ont une drôle de tendance à finir en blagues et en souvenirs.
♡ Les amoureux avant tout
Le couple n’a pas disparu sous la logistique, la fatigue et les journées trop remplies. Il a juste trouvé de nouvelles façons de se dire “je t’aime”.
Même profil.
Ça explique probablement beaucoup de choses. [si profils identiques]
Pas tout à fait le même profil…
mais visiblement la même équipe. [si profils différents]
Votre histoire ne tient dans aucune case.
Continuer
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D2 — conclusion arc-en-ciel

VISUEL PRINCIPAL : Deux fiches de profils ; le profil de chacun dépend de ses réponses.

---

## [D2 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D2 — profils de couple

TEXTE EXACT AFFICHÉ :

```text
Notre couple ne tient pas dans une case.
Un souvenir en raconte un peu plus.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D2 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D2 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D2 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D2 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D2 — galerie]

TYPE : galerie

ARRIVE APRÈS : D2 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
1 / 5
2 / 5
3 / 5
4 / 5
5 / 5
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 5 images ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D2 — remise

VISUEL PRINCIPAL : 5 emplacements d’image ; 5 image(s) configurée(s), 0 placeholder(s).

---

## [D2 — remise]

TYPE : handover

ARRIVE APRÈS : D2 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce souvenir n’est pas tout à fait terminé.
Vincent a encore quelque chose pour toi.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Pause 1

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Pause 1 — attente]

TYPE : pause

ARRIVE APRÈS : D2 — remise

TEXTE EXACT AFFICHÉ :

```text
Deux souvenirs retrouvés.
On s’arrête ici pour ce soir. On reprend demain, dans l’avion.
En attendant, quel souvenir aimerais-tu emporter partout avec toi ?
Vendredi 18 septembre à 12 h
[compte à rebours dynamique] : [N j · ]HH h MM min SS s
```

ACTION UTILISATEUR : Attendre l’horaire de reprise

ÉCRAN SUIVANT : Pause 1 — reprise disponible

VISUEL PRINCIPAL : Arc-en-ciel et dos du carnet fermé.

---

## [Pause 1 — reprise disponible]

TYPE : pause

ARRIVE APRÈS : Pause 1 — attente, après Vendredi 18 septembre à 12 h

TEXTE EXACT AFFICHÉ :

```text
Le carnet est prêt à reprendre le voyage.
Reprendre le voyage
```

ACTION UTILISATEUR : Cliquer « Reprendre le voyage »

ÉCRAN SUIVANT : Carnet — aperçu avant D3

VISUEL PRINCIPAL : Arc-en-ciel et face avant du carnet fermé.

---

## [Carnet — aperçu avant D3]

TYPE : carnet

ARRIVE APRÈS : Pause 1 — reprise disponible

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
?
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid fermé suivant

ÉCRAN SUIVANT : D3 — introduction

VISUEL PRINCIPAL : Carnet et polaroids.

---

## [D3 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — aperçu avant D3

TEXTE EXACT AFFICHÉ :

```text
DÉFI 3
Qui est qui ?
Deux petits visages qui se ressemblent beaucoup.
À toi de reconnaître qui se cache
derrière chaque petit visage.
Commencer le défi
```

ACTION UTILISATEUR : Cliquer « Commencer le défi »

ÉCRAN SUIVANT : D3 — photo 1

VISUEL PRINCIPAL : Deux portraits de bébés en polaroids.

---

## [D3 — photo 1]

TYPE : question

ARRIVE APRÈS : D3 — introduction

TEXTE EXACT AFFICHÉ :

```text
Qui est qui ?
Lenny ou Milan ?
À toi de reconnaître qui se cache derrière chaque petit visage.
[photo affichée]
Lenny
Milan
```

ACTION UTILISATEUR : Choisir Lenny ou Milan

ÉCRAN SUIVANT : D3 — photo 1, réponse

VISUEL PRINCIPAL : Photo ou placeholder bébé ; trait terracotta.

---

## [D3 — photo 1, réponse]

TYPE : résultat

ARRIVE APRÈS : D3 — photo 1

TEXTE EXACT AFFICHÉ :

```text
Qui est qui ?
Lenny ou Milan ?
À toi de reconnaître qui se cache derrière chaque petit visage.
[photo affichée]
Lenny
Milan
Bien vu ! [si correct]
Presque ! [sinon]
C’était Lenny.
Suivant →
```

ACTION UTILISATEUR : Cliquer « Suivant → »

ÉCRAN SUIVANT : D3 — photo 2

VISUEL PRINCIPAL : Même photo, choix sélectionné et retour de réponse.

---

## [D3 — photo 2]

TYPE : question

ARRIVE APRÈS : D3 — photo 1, retour « Suivant → »

TEXTE EXACT AFFICHÉ :

```text
Qui est qui ?
Lenny ou Milan ?
À toi de reconnaître qui se cache derrière chaque petit visage.
PLACEHOLDER — photo de Milan bébé
Lenny
Milan
```

ACTION UTILISATEUR : Choisir Lenny ou Milan

ÉCRAN SUIVANT : D3 — photo 2, réponse

VISUEL PRINCIPAL : Photo ou placeholder bébé ; trait terracotta.

---

## [D3 — photo 2, réponse]

TYPE : résultat

ARRIVE APRÈS : D3 — photo 2

TEXTE EXACT AFFICHÉ :

```text
Qui est qui ?
Lenny ou Milan ?
À toi de reconnaître qui se cache derrière chaque petit visage.
PLACEHOLDER — photo de Milan bébé
Lenny
Milan
Bien vu ! [si correct]
Presque ! [sinon]
C’était Milan.
Suivant →
```

ACTION UTILISATEUR : Cliquer « Suivant → »

ÉCRAN SUIVANT : D3 — photo 3

VISUEL PRINCIPAL : Même photo, choix sélectionné et retour de réponse.

---

## [D3 — photo 3]

TYPE : question

ARRIVE APRÈS : D3 — photo 2, retour « Suivant → »

TEXTE EXACT AFFICHÉ :

```text
Qui est qui ?
Lenny ou Milan ?
À toi de reconnaître qui se cache derrière chaque petit visage.
PLACEHOLDER — seconde photo bébé
Lenny
Milan
```

ACTION UTILISATEUR : Choisir Lenny ou Milan

ÉCRAN SUIVANT : D3 — photo 3, réponse

VISUEL PRINCIPAL : Photo ou placeholder bébé ; trait terracotta.

---

## [D3 — photo 3, réponse]

TYPE : résultat

ARRIVE APRÈS : D3 — photo 3

TEXTE EXACT AFFICHÉ :

```text
Qui est qui ?
Lenny ou Milan ?
À toi de reconnaître qui se cache derrière chaque petit visage.
PLACEHOLDER — seconde photo bébé
Lenny
Milan
Bien vu ! [si correct]
Presque ! [sinon]
C’était Lenny.
Suivant →
```

ACTION UTILISATEUR : Cliquer « Suivant → »

ÉCRAN SUIVANT : D3 — conclusion arc-en-ciel

VISUEL PRINCIPAL : Même photo, choix sélectionné et retour de réponse.

---

## [D3 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D3 — photo 3, réponse

TEXTE EXACT AFFICHÉ :

```text
Ces petits visages ont déjà toute une histoire.
Une page de cette histoire t’attend.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D3 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D3 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D3 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D3 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D3 — galerie]

TYPE : galerie

ARRIVE APRÈS : D3 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
PLACEHOLDER — IMAGE À REMPLACER
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 1 image ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D3 — remise

VISUEL PRINCIPAL : 1 emplacement d’image ; 0 image(s) configurée(s), 1 placeholder(s).

---

## [D3 — remise]

TYPE : handover

ARRIVE APRÈS : D3 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce souvenir n’est pas tout à fait terminé.
Vincent a encore quelque chose pour toi.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Carnet — aperçu avant le défi suivant

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Carnet — aperçu avant D5]

TYPE : carnet

ARRIVE APRÈS : D3 — remise

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
?
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid fermé suivant

ÉCRAN SUIVANT : D5 — introduction

VISUEL PRINCIPAL : Carnet et polaroids.

---

## [D5 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — aperçu avant D5

TEXTE EXACT AFFICHÉ :

```text
DÉFI 5
À toi de nous emmener à Stockholm
Il n’y a pas de bonne route vers le futur.
Choisis simplement celle
qui te ressemble le plus.
Choisir l’itinéraire
```

ACTION UTILISATEUR : Cliquer « Choisir l’itinéraire »

ÉCRAN SUIVANT : D5 — choix 1

VISUEL PRINCIPAL : Camping-car devant les montagnes.

---

## [D5 — choix 1]

TYPE : question

ARRIVE APRÈS : D5 — introduction

TEXTE EXACT AFFICHÉ :

```text
À toi de nous emmener à Stockholm
On quitte Annecy. Par où on passe ?
Première décision : choisir notre grande direction.
ÉTAPE 1 / 5
Par la Suisse
Par l’Alsace
Par l’Italie et l’Autriche
```

ACTION UTILISATEUR : Taper sur l’une des trois bandes papier

ÉCRAN SUIVANT : D5 — trajet animé 1

VISUEL PRINCIPAL : Carte aquarelle centrée, trois routes et marqueurs 1/2/3.

---

## [D5 — trajet animé 1]

TYPE : transition

ARRIVE APRÈS : D5 — choix 1

TEXTE EXACT AFFICHÉ :

```text
[aucun texte visible pendant l’animation normale]
```

ACTION UTILISATEUR : Attendre la fin de l’animation

ÉCRAN SUIVANT : D5 — résultat 1

VISUEL PRINCIPAL : Carte agrandie, camping-car en mouvement, puis illustration.

---

## [D5 — résultat 1]

TYPE : résultat

ARRIVE APRÈS : D5 — trajet animé 1

TEXTE EXACT AFFICHÉ :

```text
[si choix 1]
Par la Suisse
Des montagnes, des lacs et une route qui file vers le nord.
[si choix 2]
Par l’Alsace
On remonte tranquillement par l’est de la France.
[si choix 3]
Par l’Italie et l’Autriche
Un petit détour avant de commencer vraiment la remontée.
Suivant →
```

ACTION UTILISATEUR : Cliquer le CTA

ÉCRAN SUIVANT : D5 — choix 2

VISUEL PRINCIPAL : Une des trois illustrations possibles selon le choix ; les variantes de titre et description sont listées ci-dessus.

---

## [D5 — choix 2]

TYPE : question

ARRIVE APRÈS : D5 — résultat 1, retour « Suivant → »

TEXTE EXACT AFFICHÉ :

```text
À toi de nous emmener à Stockholm
Où fait-on notre première vraie pause ?
Quitte à traverser l’Europe, autant s’arrêter quelque part.
ÉTAPE 2 / 5
Zurich
Strasbourg
Munich
```

ACTION UTILISATEUR : Taper sur l’une des trois bandes papier

ÉCRAN SUIVANT : D5 — trajet animé 2

VISUEL PRINCIPAL : Carte aquarelle centrée, trois routes et marqueurs 1/2/3.

---

## [D5 — trajet animé 2]

TYPE : transition

ARRIVE APRÈS : D5 — choix 2

TEXTE EXACT AFFICHÉ :

```text
[aucun texte visible pendant l’animation normale]
```

ACTION UTILISATEUR : Attendre la fin de l’animation

ÉCRAN SUIVANT : D5 — résultat 2

VISUEL PRINCIPAL : Carte agrandie, camping-car en mouvement, puis illustration.

---

## [D5 — résultat 2]

TYPE : résultat

ARRIVE APRÈS : D5 — trajet animé 2

TEXTE EXACT AFFICHÉ :

```text
[si choix 1]
Zurich
Un lac, une jolie ville et une première nuit sur la route.
[si choix 2]
Strasbourg
Des petites rues, des maisons colorées et une étape familière.
[si choix 3]
Munich
Une grande halte avant de continuer vers le nord.
Suivant →
```

ACTION UTILISATEUR : Cliquer le CTA

ÉCRAN SUIVANT : D5 — choix 3

VISUEL PRINCIPAL : Une des trois illustrations possibles selon le choix ; les variantes de titre et description sont listées ci-dessus.

---

## [D5 — choix 3]

TYPE : question

ARRIVE APRÈS : D5 — résultat 2, retour « Suivant → »

TEXTE EXACT AFFICHÉ :

```text
À toi de nous emmener à Stockholm
Et maintenant, par où on continue ?
Il est temps de choisir notre chemin vers le nord de l’Europe.
ÉTAPE 3 / 5
Hambourg et le Danemark
Berlin puis la Baltique
Prague avant de remonter
```

ACTION UTILISATEUR : Taper sur l’une des trois bandes papier

ÉCRAN SUIVANT : D5 — trajet animé 3

VISUEL PRINCIPAL : Carte aquarelle centrée, trois routes et marqueurs 1/2/3.

---

## [D5 — trajet animé 3]

TYPE : transition

ARRIVE APRÈS : D5 — choix 3

TEXTE EXACT AFFICHÉ :

```text
[aucun texte visible pendant l’animation normale]
```

ACTION UTILISATEUR : Attendre la fin de l’animation

ÉCRAN SUIVANT : D5 — résultat 3

VISUEL PRINCIPAL : Carte agrandie, camping-car en mouvement, puis illustration.

---

## [D5 — résultat 3]

TYPE : résultat

ARRIVE APRÈS : D5 — trajet animé 3

TEXTE EXACT AFFICHÉ :

```text
[si choix 1]
Hambourg et le Danemark
On continue tout droit vers Copenhague.
[si choix 2]
Berlin puis la Baltique
Une route un peu plus à l’est, au rythme des grandes villes.
[si choix 3]
Prague avant de remonter
Parce qu’un détour peut parfois valoir le voyage.
Suivant →
```

ACTION UTILISATEUR : Cliquer le CTA

ÉCRAN SUIVANT : D5 — choix 4

VISUEL PRINCIPAL : Une des trois illustrations possibles selon le choix ; les variantes de titre et description sont listées ci-dessus.

---

## [D5 — choix 4]

TYPE : question

ARRIVE APRÈS : D5 — résultat 3, retour « Suivant → »

TEXTE EXACT AFFICHÉ :

```text
À toi de nous emmener à Stockholm
On s’offre une vraie pause ?
Pas pour avancer. Juste pour profiter du voyage.
ÉTAPE 4 / 5
Une journée à Copenhague
Une nuit au bord de la mer
Une étape en pleine nature
```

ACTION UTILISATEUR : Taper sur l’une des trois bandes papier

ÉCRAN SUIVANT : D5 — trajet animé 4

VISUEL PRINCIPAL : Carte aquarelle centrée, trois routes et marqueurs 1/2/3.

---

## [D5 — trajet animé 4]

TYPE : transition

ARRIVE APRÈS : D5 — choix 4

TEXTE EXACT AFFICHÉ :

```text
[aucun texte visible pendant l’animation normale]
```

ACTION UTILISATEUR : Attendre la fin de l’animation

ÉCRAN SUIVANT : D5 — résultat 4

VISUEL PRINCIPAL : Carte agrandie, camping-car en mouvement, puis illustration.

---

## [D5 — résultat 4]

TYPE : résultat

ARRIVE APRÈS : D5 — trajet animé 4

TEXTE EXACT AFFICHÉ :

```text
[si choix 1]
Une journée à Copenhague
On gare le camping-car et on part découvrir la ville.
[si choix 2]
Une nuit au bord de la mer
Le camping-car posé près de l’eau, juste nous et l’horizon.
[si choix 3]
Une étape en pleine nature
Un lac, des arbres et personne autour de nous.
Suivant →
```

ACTION UTILISATEUR : Cliquer le CTA

ÉCRAN SUIVANT : D5 — choix 5

VISUEL PRINCIPAL : Une des trois illustrations possibles selon le choix ; les variantes de titre et description sont listées ci-dessus.

---

## [D5 — choix 5]

TYPE : question

ARRIVE APRÈS : D5 — résultat 4, retour « Suivant → »

TEXTE EXACT AFFICHÉ :

```text
À toi de nous emmener à Stockholm
Stockholm n’est plus très loin. On termine comment ?
Dernier choix avant l’arrivée.
ÉTAPE 5 / 5
En longeant la côte
Par les lacs et les forêts
On file jusqu’à Stockholm
```

ACTION UTILISATEUR : Taper sur l’une des trois bandes papier

ÉCRAN SUIVANT : D5 — trajet animé 5

VISUEL PRINCIPAL : Carte aquarelle centrée, trois routes et marqueurs 1/2/3.

---

## [D5 — trajet animé 5]

TYPE : transition

ARRIVE APRÈS : D5 — choix 5

TEXTE EXACT AFFICHÉ :

```text
[aucun texte visible pendant l’animation normale]
```

ACTION UTILISATEUR : Attendre la fin de l’animation

ÉCRAN SUIVANT : D5 — résultat 5

VISUEL PRINCIPAL : Carte agrandie, camping-car en mouvement, puis illustration.

---

## [D5 — résultat 5]

TYPE : résultat

ARRIVE APRÈS : D5 — trajet animé 5

TEXTE EXACT AFFICHÉ :

```text
[si choix 1]
En longeant la côte
Encore un peu de mer avant d’arriver.
[si choix 2]
Par les lacs et les forêts
Une dernière route au milieu de la Suède.
[si choix 3]
On file jusqu’à Stockholm
Cette fois, plus de détour.
Voir notre route →
```

ACTION UTILISATEUR : Cliquer le CTA

ÉCRAN SUIVANT : D5 — route finale

VISUEL PRINCIPAL : Une des trois illustrations possibles selon le choix ; les variantes de titre et description sont listées ci-dessus.

---

## [D5 — route finale]

TYPE : résultat

ARRIVE APRÈS : D5 — résultat 5

TEXTE EXACT AFFICHÉ :

```text
Voilà notre route.
Pas forcément la plus courte.
Pas forcément la plus logique.
Mais sûrement la nôtre.
Continuer le voyage →
```

ACTION UTILISATEUR : Cliquer « Continuer le voyage → »

ÉCRAN SUIVANT : D5 — conclusion arc-en-ciel

VISUEL PRINCIPAL : Carte du trajet complet.

---

## [D5 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D5 — route finale

TEXTE EXACT AFFICHÉ :

```text
Chaque chemin dessine une suite possible.
Découvrons celle qui se cache dans le carnet.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D5 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D5 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D5 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D5 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D5 — galerie]

TYPE : galerie

ARRIVE APRÈS : D5 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
PLACEHOLDER — STOCKHOLM
1 / 3
2 / 3
3 / 3
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 3 images ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D5 — remise

VISUEL PRINCIPAL : 3 emplacements d’image ; 2 image(s) configurée(s), 1 placeholder(s).

---

## [D5 — remise]

TYPE : handover

ARRIVE APRÈS : D5 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce souvenir n’est pas tout à fait terminé.
Vincent a encore quelque chose pour toi.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Pause 2

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Pause 2 — attente]

TYPE : pause

ARRIVE APRÈS : D5 — remise

TEXTE EXACT AFFICHÉ :

```text
Deux souvenirs de plus.
On s’arrête à nouveau pour aujourd’hui. On reprend demain matin.
Samedi 19 septembre à 8 h
[compte à rebours dynamique] : [N j · ]HH h MM min SS s
```

ACTION UTILISATEUR : Attendre l’horaire de reprise

ÉCRAN SUIVANT : Pause 2 — reprise disponible

VISUEL PRINCIPAL : Arc-en-ciel et dos du carnet fermé.

---

## [Pause 2 — reprise disponible]

TYPE : pause

ARRIVE APRÈS : Pause 2 — attente, après Samedi 19 septembre à 8 h

TEXTE EXACT AFFICHÉ :

```text
Le carnet est prêt à reprendre le voyage.
Reprendre le voyage
```

ACTION UTILISATEUR : Cliquer « Reprendre le voyage »

ÉCRAN SUIVANT : Carnet — aperçu avant D6

VISUEL PRINCIPAL : Arc-en-ciel et face avant du carnet fermé.

---

## [Carnet — aperçu avant D6]

TYPE : carnet

ARRIVE APRÈS : Pause 2 — reprise disponible

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
?
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid fermé suivant

ÉCRAN SUIVANT : D6 — introduction

VISUEL PRINCIPAL : Carnet et polaroids ; titres des souvenirs débloqués.

---

## [D6 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — aperçu avant D6

TEXTE EXACT AFFICHÉ :

```text
DÉFI 6
À vous de les convaincre
Les questions de Lenny et Milan.
Lenny et Milan ont quelques questions.
Certaines méritent une vraie réponse.
D’autres… probablement pas.

Tu auras 1 ou 2 minutes pour défendre ton idée.
Puis l’autre décidera s’il est convaincu.
Commencer
```

ACTION UTILISATEUR : Cliquer « Commencer »

ÉCRAN SUIVANT : D6 — question 1, lecture

VISUEL PRINCIPAL : Dumbledore et Gandalf.

---

## [D6 — question 1, lecture]

TYPE : question

ARRIVE APRÈS : D6 — introduction

TEXTE EXACT AFFICHÉ :

```text
Question 1 sur 14 · posée par Lenny
Qui gagnerait entre Voldemort et Dumbledore s’ils étaient tous les deux au sommet de leur forme ? Et pourquoi ?
Pour Maman
1 minute pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 1, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 1, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 1, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 1 sur 14 · posée par Lenny
Qui gagnerait entre Voldemort et Dumbledore s’ils étaient tous les deux au sommet de leur forme ? Et pourquoi ?
Pour Maman
1:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 1, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 1, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 1, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 1 sur 14
Vincent, Marjolaine t’a-t-elle convaincu ?
À Vincent de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 2, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 2, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 1, notation

TEXTE EXACT AFFICHÉ :

```text
Question 2 sur 14 · posée par Lenny
Qui gagnerait entre D’Artagnan et Edmond Dantès ? Et pourquoi ?
Pour Papa
1 minute pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 2, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 2, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 2, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 2 sur 14 · posée par Lenny
Qui gagnerait entre D’Artagnan et Edmond Dantès ? Et pourquoi ?
Pour Papa
1:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 2, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 2, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 2, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 2 sur 14
Marjolaine, Vincent t’a-t-il convaincue ?
À Marjolaine de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 3, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 3, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 2, notation

TEXTE EXACT AFFICHÉ :

```text
Question 3 sur 14 · posée par Milan
Si Harry, Ron et Hermione n’avaient pas été à Gryffondor, dans quelle maison aurait été chacun d’eux ? Et pourquoi ?
Pour Maman
2 minutes pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 3, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 3, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 3, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 3 sur 14 · posée par Milan
Si Harry, Ron et Hermione n’avaient pas été à Gryffondor, dans quelle maison aurait été chacun d’eux ? Et pourquoi ?
Pour Maman
2:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 3, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 3, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 3, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 3 sur 14
Vincent, Marjolaine t’a-t-elle convaincu ?
À Vincent de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 4, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 4, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 3, notation

TEXTE EXACT AFFICHÉ :

```text
Question 4 sur 14 · posée par Lenny
Est-ce qu’Edmond Dantès est vraiment un héros, ou est-ce qu’il va beaucoup trop loin pour se venger ?
Pour Papa
1 minute pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 4, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 4, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 4, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 4 sur 14 · posée par Lenny
Est-ce qu’Edmond Dantès est vraiment un héros, ou est-ce qu’il va beaucoup trop loin pour se venger ?
Pour Papa
1:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 4, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 4, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 4, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 4 sur 14
Marjolaine, Vincent t’a-t-il convaincue ?
À Marjolaine de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 5, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 5, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 4, notation

TEXTE EXACT AFFICHÉ :

```text
Question 5 sur 14 · posée par Milan
Une armée de 10 000 soldats attaque le château que tu dois défendre. Tu peux choisir trois personnages de fiction pour t’aider, mais aucun ne doit avoir de super-pouvoir. Qui tu prends, et pourquoi ?
Pour Papa
2 minutes pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 5, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 5, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 5, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 5 sur 14 · posée par Milan
Une armée de 10 000 soldats attaque le château que tu dois défendre. Tu peux choisir trois personnages de fiction pour t’aider, mais aucun ne doit avoir de super-pouvoir. Qui tu prends, et pourquoi ?
Pour Papa
2:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 5, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 5, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 5, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 5 sur 14
Marjolaine, Vincent t’a-t-il convaincue ?
À Marjolaine de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 6, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 6, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 5, notation

TEXTE EXACT AFFICHÉ :

```text
Question 6 sur 14 · posée par Milan
Si tu devais garder trois sorts de l’univers de Harry Potter pour pouvoir les utiliser dans la vraie vie, lesquels choisirais-tu et pourquoi ?
Pour Maman
2 minutes pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 6, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 6, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 6, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 6 sur 14 · posée par Milan
Si tu devais garder trois sorts de l’univers de Harry Potter pour pouvoir les utiliser dans la vraie vie, lesquels choisirais-tu et pourquoi ?
Pour Maman
2:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 6, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 6, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 6, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 6 sur 14
Vincent, Marjolaine t’a-t-elle convaincu ?
À Vincent de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 7, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 7, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 6, notation

TEXTE EXACT AFFICHÉ :

```text
Question 7 sur 14 · posée par Lenny
Parmi tous les dessins animés Disney, quels sont selon toi les trois méchants les plus méchants ? Et pourquoi ?
Pour Maman
2 minutes pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 7, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 7, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 7, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 7 sur 14 · posée par Lenny
Parmi tous les dessins animés Disney, quels sont selon toi les trois méchants les plus méchants ? Et pourquoi ?
Pour Maman
2:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 7, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 7, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 7, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 7 sur 14
Vincent, Marjolaine t’a-t-elle convaincu ?
À Vincent de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 8, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 8, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 7, notation

TEXTE EXACT AFFICHÉ :

```text
Question 8 sur 14 · posée par Milan
Si tu pouvais changer la fin d’un seul film, lequel choisirais-tu et qu’est-ce que tu changerais ?
Pour Maman
2 minutes pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 8, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 8, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 8, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 8 sur 14 · posée par Milan
Si tu pouvais changer la fin d’un seul film, lequel choisirais-tu et qu’est-ce que tu changerais ?
Pour Maman
2:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 8, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 8, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 8, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 8 sur 14
Vincent, Marjolaine t’a-t-elle convaincu ?
À Vincent de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 9, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 9, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 8, notation

TEXTE EXACT AFFICHÉ :

```text
Question 9 sur 14 · posée par Lenny
Des extraterrestres débarquent sur Terre. Ils ont une seule exigence : quelqu’un doit leur chanter une chanson. Qui est-ce qu’on envoie, quelle chanson il ou elle chante, et pourquoi ?
Pour Papa
1 minute pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 9, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 9, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 9, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 9 sur 14 · posée par Lenny
Des extraterrestres débarquent sur Terre. Ils ont une seule exigence : quelqu’un doit leur chanter une chanson. Qui est-ce qu’on envoie, quelle chanson il ou elle chante, et pourquoi ?
Pour Papa
1:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 9, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 9, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 9, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 9 sur 14
Marjolaine, Vincent t’a-t-il convaincue ?
À Marjolaine de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 10, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 10, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 9, notation

TEXTE EXACT AFFICHÉ :

```text
Question 10 sur 14 · posée par Milan
Battle de rap : Eminem contre Joe Dassin. Qui gagne… et surtout, comment ?
Pour Papa
1 minute pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 10, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 10, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 10, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 10 sur 14 · posée par Milan
Battle de rap : Eminem contre Joe Dassin. Qui gagne… et surtout, comment ?
Pour Papa
1:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 10, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 10, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 10, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 10 sur 14
Marjolaine, Vincent t’a-t-il convaincue ?
À Marjolaine de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 11, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 11, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 10, notation

TEXTE EXACT AFFICHÉ :

```text
Question 11 sur 14 · posée par Milan
Battle de rap : Booba contre Charles Aznavour. Qui gagne… et surtout, comment ?
Pour Maman
1 minute pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 11, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 11, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 11, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 11 sur 14 · posée par Milan
Battle de rap : Booba contre Charles Aznavour. Qui gagne… et surtout, comment ?
Pour Maman
1:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 11, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 11, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 11, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 11 sur 14
Vincent, Marjolaine t’a-t-elle convaincu ?
À Vincent de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 12, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 12, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 11, notation

TEXTE EXACT AFFICHÉ :

```text
Question 12 sur 14 · posée par Lenny
Tu peux choisir n’importe quel personnage de l’Histoire pour passer une journée avec nous quatre. Qui tu invites, qu’est-ce qu’on fait avec lui, et pourquoi ?
Pour Papa
2 minutes pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 12, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 12, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 12, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 12 sur 14 · posée par Lenny
Tu peux choisir n’importe quel personnage de l’Histoire pour passer une journée avec nous quatre. Qui tu invites, qu’est-ce qu’on fait avec lui, et pourquoi ?
Pour Papa
2:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 12, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 12, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 12, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 12 sur 14
Marjolaine, Vincent t’a-t-il convaincue ?
À Marjolaine de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 13, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 13, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 12, notation

TEXTE EXACT AFFICHÉ :

```text
Question 13 sur 14 · posée par Milan
Demain, Netflix t’appelle pour créer ta propre série. Quelle histoire voudrais-tu créer et raconter au monde ?
Pour Maman
2 minutes pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 13, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 13, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 13, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 13 sur 14 · posée par Milan
Demain, Netflix t’appelle pour créer ta propre série. Quelle histoire voudrais-tu créer et raconter au monde ?
Pour Maman
2:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 13, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 13, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 13, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 13 sur 14
Vincent, Marjolaine t’a-t-elle convaincu ?
À Vincent de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — question 14, lecture

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — question 14, lecture]

TYPE : question

ARRIVE APRÈS : D6 — question 13, notation

TEXTE EXACT AFFICHÉ :

```text
Question 14 sur 14 · posée par Lenny
Si tu pouvais supprimer une seule règle dans un sport pour le rendre plus amusant, laquelle tu enlèverais ? Et pourquoi ?
Pour Papa
1 minute pour convaincre
Lancer le chrono
```

ACTION UTILISATEUR : Cliquer « Lancer le chrono »

ÉCRAN SUIVANT : D6 — question 14, chrono

VISUEL PRINCIPAL : Question sur papier, trait terracotta.

---

## [D6 — question 14, chrono]

TYPE : question

ARRIVE APRÈS : D6 — question 14, lecture

TEXTE EXACT AFFICHÉ :

```text
Question 14 sur 14 · posée par Lenny
Si tu pouvais supprimer une seule règle dans un sport pour le rendre plus amusant, laquelle tu enlèverais ? Et pourquoi ?
Pour Papa
1:00
[décompte dynamique] : M:SS
J’ai fini
```

ACTION UTILISATEUR : Cliquer « J’ai fini » ou attendre la fin du chrono

ÉCRAN SUIVANT : D6 — question 14, notation

VISUEL PRINCIPAL : Même question, compte à rebours.

---

## [D6 — question 14, notation]

TYPE : question

ARRIVE APRÈS : D6 — question 14, chrono

TEXTE EXACT AFFICHÉ :

```text
Question 14 sur 14
Marjolaine, Vincent t’a-t-il convaincue ?
À Marjolaine de noter
0 1 2 3 4 5 6 7 8 9 10
Valider la note
```

ACTION UTILISATEUR : Choisir une note de 0 à 10 puis cliquer « Valider la note »

ÉCRAN SUIVANT : D6 — conclusion arc-en-ciel

VISUEL PRINCIPAL : Onze notes possibles.

---

## [D6 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D6 — question 14, notation

TEXTE EXACT AFFICHÉ :

```text
Ils vous poseront sûrement des centaines de questions.
Certaines auront une réponse.
D’autres beaucoup moins.

Mais ce qu’ils retiendront surtout,
c’est que vous aurez pris le temps d’y répondre.
Il est temps de voir ce qu’ils ont gardé de tout ça.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D6 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D6 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D6 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Retour en France
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D6 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D6 — galerie]

TYPE : galerie

ARRIVE APRÈS : D6 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
PLACEHOLDER — MAISON FAMILIALE
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 1 image ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D6 — remise

VISUEL PRINCIPAL : 1 emplacement d’image ; 0 image(s) configurée(s), 1 placeholder(s).

---

## [D6 — remise]

TYPE : handover

ARRIVE APRÈS : D6 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce souvenir n’est pas tout à fait terminé.
Vincent a encore quelque chose pour toi.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Carnet — aperçu avant le défi suivant

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Carnet — aperçu avant D7]

TYPE : carnet

ARRIVE APRÈS : D6 — remise

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Retour en France
?
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid fermé suivant

ÉCRAN SUIVANT : D7 — introduction

VISUEL PRINCIPAL : Carnet et polaroids ; titres des souvenirs débloqués.

---

## [D7 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — aperçu avant D7

TEXTE EXACT AFFICHÉ :

```text
DÉFI 7
Le serpent
Comme au temps des vieux téléphones.
Fais grandir le serpent
en mangeant les pommes.
Jouer
```

ACTION UTILISATEUR : Cliquer « Jouer »

ÉCRAN SUIVANT : D7 — serpent

VISUEL PRINCIPAL : Serpent fait de rondelles de pomme.

---

## [D7 — serpent]

TYPE : challenge

ARRIVE APRÈS : D7 — introduction ou « Rejouer »

TEXTE EXACT AFFICHÉ :

```text
Le serpent
Manger 10 pommes pour gagner.
Pommes 0 / 10 [puis 1 / 10 à 10 / 10]
↑ ← → ↓
```

ACTION UTILISATEUR : Diriger le serpent avec les flèches ; manger dix pommes

ÉCRAN SUIVANT : D7 — réussite ou D7 — échec

VISUEL PRINCIPAL : Grille de serpent et pommes.

---

## [D7 — échec]

TYPE : résultat

ARRIVE APRÈS : D7 — serpent, collision

TEXTE EXACT AFFICHÉ :

```text
Le carnet
Pommes N / 10
Le serpent s’est arrêté.
Rejouer
```

ACTION UTILISATEUR : Cliquer « Rejouer »

ÉCRAN SUIVANT : D7 — serpent

VISUEL PRINCIPAL : Grille figée.

---

## [D7 — réussite]

TYPE : résultat

ARRIVE APRÈS : D7 — serpent, dix pommes

TEXTE EXACT AFFICHÉ :

```text
Le carnet
Bien joué !
Pommes 10 / 10. Le serpent a bien grandi.
Continuer
```

ACTION UTILISATEUR : Cliquer « Continuer »

ÉCRAN SUIVANT : D7 — conclusion arc-en-ciel

VISUEL PRINCIPAL : Résultat sur page de carnet.

---

## [D7 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D7 — réussite

TEXTE EXACT AFFICHÉ :

```text
Le chemin s’est allongé, pomme après pomme.
Un souvenir t’attend au bout.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D7 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D7 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D7 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Retour en France
Adolescence
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D7 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D7 — galerie]

TYPE : galerie

ARRIVE APRÈS : D7 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
PLACEHOLDER — IMAGE À REMPLACER
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 1 image ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D7 — remise

VISUEL PRINCIPAL : 1 emplacement d’image ; 0 image(s) configurée(s), 1 placeholder(s).

---

## [D7 — remise]

TYPE : handover

ARRIVE APRÈS : D7 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce souvenir n’est pas tout à fait terminé.
Vincent a encore quelque chose pour toi.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Pause 3

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Pause 3 — attente]

TYPE : pause

ARRIVE APRÈS : D7 — remise

TEXTE EXACT AFFICHÉ :

```text
Deux souvenirs de plus.
Le carnet peut se reposer un peu. On reprend ce soir.
Samedi 19 septembre à 18 h
[compte à rebours dynamique] : [N j · ]HH h MM min SS s
```

ACTION UTILISATEUR : Attendre l’horaire de reprise

ÉCRAN SUIVANT : Pause 3 — reprise disponible

VISUEL PRINCIPAL : Arc-en-ciel et dos du carnet fermé.

---

## [Pause 3 — reprise disponible]

TYPE : pause

ARRIVE APRÈS : Pause 3 — attente, après Samedi 19 septembre à 18 h

TEXTE EXACT AFFICHÉ :

```text
Le carnet est prêt à reprendre le voyage.
Reprendre le voyage
```

ACTION UTILISATEUR : Cliquer « Reprendre le voyage »

ÉCRAN SUIVANT : Carnet — aperçu avant D8

VISUEL PRINCIPAL : Arc-en-ciel et face avant du carnet fermé.

---

## [Carnet — aperçu avant D8]

TYPE : carnet

ARRIVE APRÈS : Pause 3 — reprise disponible

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Retour en France
Adolescence
?
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid fermé suivant

ÉCRAN SUIVANT : D8 — introduction

VISUEL PRINCIPAL : Carnet et polaroids ; titres des souvenirs débloqués.

---

## [D8 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — aperçu avant D8

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Des chansons qui ont accompagné notre histoire.
Écoute bien et fais confiance à ta mémoire.
À toi de retrouver les chansons.
Commencer le blind test
```

ACTION UTILISATEUR : Cliquer « Commencer le blind test »

ÉCRAN SUIVANT : D8 — chanson 1, écoute

VISUEL PRINCIPAL : Guitare dessinée ; aucun label DÉFI 8 (retiré par le code).

---

## [D8 — chanson 1, écoute]

TYPE : question

ARRIVE APRÈS : D8 — introduction

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Chanson 1
À toi de jouer !
Vincent lance la musique sur la playlist
Deezer, écoute bien…
J’ai trouvé !
```

ACTION UTILISATEUR : Écouter Vincent, puis cliquer « J’ai trouvé ! »

ÉCRAN SUIVANT : D8 — chanson 1, révélation

VISUEL PRINCIPAL : Notes de musique et points de progression.

---

## [D8 — chanson 1, révélation]

TYPE : résultat

ARRIVE APRÈS : D8 — chanson 1, écoute

TEXTE EXACT AFFICHÉ :

```text
Lady Marmalade
Christina Aguilera
Chanson suivante
```

ACTION UTILISATEUR : Cliquer « Chanson suivante » ; après la septième, attendre le passage automatique

ÉCRAN SUIVANT : D8 — chanson 2, écoute

VISUEL PRINCIPAL : Réponse de la chanson.

---

## [D8 — chanson 2, écoute]

TYPE : question

ARRIVE APRÈS : D8 — chanson 1, révélation

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Chanson 2
À toi de jouer !
Vincent lance la musique sur la playlist
Deezer, écoute bien…
J’ai trouvé !
```

ACTION UTILISATEUR : Écouter Vincent, puis cliquer « J’ai trouvé ! »

ÉCRAN SUIVANT : D8 — chanson 2, révélation

VISUEL PRINCIPAL : Notes de musique et points de progression.

---

## [D8 — chanson 2, révélation]

TYPE : résultat

ARRIVE APRÈS : D8 — chanson 2, écoute

TEXTE EXACT AFFICHÉ :

```text
Set Fire to the Rain
Adele
Chanson suivante
```

ACTION UTILISATEUR : Cliquer « Chanson suivante » ; après la septième, attendre le passage automatique

ÉCRAN SUIVANT : D8 — chanson 3, écoute

VISUEL PRINCIPAL : Réponse de la chanson.

---

## [D8 — chanson 3, écoute]

TYPE : question

ARRIVE APRÈS : D8 — chanson 2, révélation

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Chanson 3
À toi de jouer !
Vincent lance la musique sur la playlist
Deezer, écoute bien…
J’ai trouvé !
```

ACTION UTILISATEUR : Écouter Vincent, puis cliquer « J’ai trouvé ! »

ÉCRAN SUIVANT : D8 — chanson 3, révélation

VISUEL PRINCIPAL : Notes de musique et points de progression.

---

## [D8 — chanson 3, révélation]

TYPE : résultat

ARRIVE APRÈS : D8 — chanson 3, écoute

TEXTE EXACT AFFICHÉ :

```text
Bohemian Rhapsody
Queen
Chanson suivante
```

ACTION UTILISATEUR : Cliquer « Chanson suivante » ; après la septième, attendre le passage automatique

ÉCRAN SUIVANT : D8 — chanson 4, écoute

VISUEL PRINCIPAL : Réponse de la chanson.

---

## [D8 — chanson 4, écoute]

TYPE : question

ARRIVE APRÈS : D8 — chanson 3, révélation

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Chanson 4
À toi de jouer !
Vincent lance la musique sur la playlist
Deezer, écoute bien…
J’ai trouvé !
```

ACTION UTILISATEUR : Écouter Vincent, puis cliquer « J’ai trouvé ! »

ÉCRAN SUIVANT : D8 — chanson 4, révélation

VISUEL PRINCIPAL : Notes de musique et points de progression.

---

## [D8 — chanson 4, révélation]

TYPE : résultat

ARRIVE APRÈS : D8 — chanson 4, écoute

TEXTE EXACT AFFICHÉ :

```text
Ave Maria
Andrea Bocelli
Chanson suivante
```

ACTION UTILISATEUR : Cliquer « Chanson suivante » ; après la septième, attendre le passage automatique

ÉCRAN SUIVANT : D8 — chanson 5, écoute

VISUEL PRINCIPAL : Réponse de la chanson.

---

## [D8 — chanson 5, écoute]

TYPE : question

ARRIVE APRÈS : D8 — chanson 4, révélation

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Chanson 5
À toi de jouer !
Vincent lance la musique sur la playlist
Deezer, écoute bien…
J’ai trouvé !
```

ACTION UTILISATEUR : Écouter Vincent, puis cliquer « J’ai trouvé ! »

ÉCRAN SUIVANT : D8 — chanson 5, révélation

VISUEL PRINCIPAL : Notes de musique et points de progression.

---

## [D8 — chanson 5, révélation]

TYPE : résultat

ARRIVE APRÈS : D8 — chanson 5, écoute

TEXTE EXACT AFFICHÉ :

```text
Your Song
Elton John
Chanson suivante
```

ACTION UTILISATEUR : Cliquer « Chanson suivante » ; après la septième, attendre le passage automatique

ÉCRAN SUIVANT : D8 — chanson 6, écoute

VISUEL PRINCIPAL : Réponse de la chanson.

---

## [D8 — chanson 6, écoute]

TYPE : question

ARRIVE APRÈS : D8 — chanson 5, révélation

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Chanson 6
À toi de jouer !
Vincent lance la musique sur la playlist
Deezer, écoute bien…
J’ai trouvé !
```

ACTION UTILISATEUR : Écouter Vincent, puis cliquer « J’ai trouvé ! »

ÉCRAN SUIVANT : D8 — chanson 6, révélation

VISUEL PRINCIPAL : Notes de musique et points de progression.

---

## [D8 — chanson 6, révélation]

TYPE : résultat

ARRIVE APRÈS : D8 — chanson 6, écoute

TEXTE EXACT AFFICHÉ :

```text
Still Loving You
Scorpions
Chanson suivante
```

ACTION UTILISATEUR : Cliquer « Chanson suivante » ; après la septième, attendre le passage automatique

ÉCRAN SUIVANT : D8 — chanson 7, écoute

VISUEL PRINCIPAL : Réponse de la chanson.

---

## [D8 — chanson 7, écoute]

TYPE : question

ARRIVE APRÈS : D8 — chanson 6, révélation

TEXTE EXACT AFFICHÉ :

```text
Le blind test
Chanson 7
À toi de jouer !
Vincent lance la musique sur la playlist
Deezer, écoute bien…
J’ai trouvé !
```

ACTION UTILISATEUR : Écouter Vincent, puis cliquer « J’ai trouvé ! »

ÉCRAN SUIVANT : D8 — chanson 7, révélation

VISUEL PRINCIPAL : Notes de musique et points de progression.

---

## [D8 — chanson 7, révélation]

TYPE : résultat

ARRIVE APRÈS : D8 — chanson 7, écoute

TEXTE EXACT AFFICHÉ :

```text
Can’t Help Falling in Love
Elvis Presley
```

ACTION UTILISATEUR : Cliquer « Chanson suivante » ; après la septième, attendre le passage automatique

ÉCRAN SUIVANT : D8 — conclusion arc-en-ciel

VISUEL PRINCIPAL : Réponse de la chanson.

---

## [D8 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D8 — chanson 7, révélation

TEXTE EXACT AFFICHÉ :

```text
Il y a des chansons qu’on reconnaît en quelques secondes.
Et d’autres qu’on n’oublie jamais.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D8 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D8 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D8 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Retour en France
Adolescence
Futur lointain
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D8 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D8 — galerie]

TYPE : galerie

ARRIVE APRÈS : D8 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
PLACEHOLDER — IMAGE À REMPLACER
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 1 image ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D8 — remise

VISUEL PRINCIPAL : 1 emplacement d’image ; 0 image(s) configurée(s), 1 placeholder(s).

---

## [D8 — remise]

TYPE : handover

ARRIVE APRÈS : D8 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce souvenir n’est pas tout à fait terminé.
Vincent a encore quelque chose pour toi.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Carnet — aperçu avant le défi suivant

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Carnet — aperçu avant D4]

TYPE : carnet

ARRIVE APRÈS : D8 — remise

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Retour en France
Adolescence
Futur lointain
?
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid fermé suivant

ÉCRAN SUIVANT : D4 — introduction

VISUEL PRINCIPAL : Carnet et polaroids ; titres des souvenirs débloqués.

---

## [D4 — introduction]

TYPE : challenge

ARRIVE APRÈS : Carnet — aperçu avant D4

TEXTE EXACT AFFICHÉ :

```text
DÉFI 4
Le dernier souvenir
Majorque
Pour le dernier défi,
il suffit de regarder devant toi.
Découvrir le défi
```

ACTION UTILISATEUR : Cliquer « Découvrir le défi »

ÉCRAN SUIVANT : D4 — coucher de soleil

VISUEL PRINCIPAL : Arc-en-ciel.

---

## [D4 — coucher de soleil]

TYPE : challenge

ARRIVE APRÈS : D4 — introduction

TEXTE EXACT AFFICHÉ :

```text
Samedi soir
Va voir le coucher de soleil
Marche jusqu’au banc.
Quand le soleil commence à descendre sur Majorque, prends simplement le temps de regarder.
Le soleil se couche
```

ACTION UTILISATEUR : Cliquer « Le soleil se couche »

ÉCRAN SUIVANT : D4 — conclusion arc-en-ciel

VISUEL PRINCIPAL : Page de carnet et trait terracotta.

---

## [D4 — conclusion arc-en-ciel]

TYPE : rainbow conclusion

ARRIVE APRÈS : D4 — coucher de soleil

TEXTE EXACT AFFICHÉ :

```text
Tu étais là.
Au bon endroit,
au bon moment.
Ce dernier souvenir est à toi.
Continuer
```

ACTION UTILISATEUR : Attendre l’apparition du message, puis cliquer « Continuer »

ÉCRAN SUIVANT : D4 — révélation dans le carnet

VISUEL PRINCIPAL : Arc-en-ciel animé.

---

## [D4 — révélation dans le carnet]

TYPE : carnet

ARRIVE APRÈS : D4 — conclusion arc-en-ciel

TEXTE EXACT AFFICHÉ :

```text
NOTRE VOYAGE
Etre un couple
La vie à trois
La vie à quatre
Stockholm
Retour en France
Adolescence
Futur lointain
Majorque
Il y a encore beaucoup
de pages à remplir…
```

ACTION UTILISATEUR : Taper sur le polaroid du souvenir révélé

ÉCRAN SUIVANT : D4 — galerie

VISUEL PRINCIPAL : Polaroid qui se retourne dans le carnet.

---

## [D4 — galerie]

TYPE : galerie

ARRIVE APRÈS : D4 — révélation dans le carnet

TEXTE EXACT AFFICHÉ :

```text
PLACEHOLDER — COUCHER DE SOLEIL À MAJORQUE
Revenir au carnet [après la dernière image et un délai]
```

ACTION UTILISATEUR : Balayer 1 image ; après la dernière, cliquer « Revenir au carnet »

ÉCRAN SUIVANT : D4 — remise

VISUEL PRINCIPAL : 1 emplacement d’image ; 0 image(s) configurée(s), 1 placeholder(s).

---

## [D4 — remise]

TYPE : handover

ARRIVE APRÈS : D4 — galerie

TEXTE EXACT AFFICHÉ :

```text
Ce dernier souvenir n’est pas tout à fait terminé.
Vincent a une dernière image physique pour toi.
Elle cache la dernière lettre du mot de passe.
Je l’ai
```

ACTION UTILISATEUR : Recevoir l’image physique et cliquer « Je l’ai »

ÉCRAN SUIVANT : Final — mot de passe

VISUEL PRINCIPAL : Enveloppe/souvenir transmis de Vincent à Marjolaine.

---

## [Final — mot de passe]

TYPE : final

ARRIVE APRÈS : D4 — remise

TEXTE EXACT AFFICHÉ :

```text
Le voyage touche à sa fin…
Tu as les huit images physiques entre tes mains.
Chacune cache une lettre.
Assemble-les et trouve le mot de passe
qui ouvrira la dernière surprise.
Entre le mot de passe ici :
Continuer le voyage
Pas tout à fait… regarde encore les huit images. [si mot de passe incorrect]
```

ACTION UTILISATEUR : Saisir huit lettres, puis cliquer « Continuer le voyage » ; en cas d’erreur, réessayer

ÉCRAN SUIVANT : Final — remise de la boîte si correct ; sinon même écran avec erreur

VISUEL PRINCIPAL : Arc-en-ciel, huit cases de saisie, papier.

---

## [Final — remise de la boîte]

TYPE : final

ARRIVE APRÈS : Mot de passe correct

TEXTE EXACT AFFICHÉ :

```text
Vincent a encore
quelque chose à te remettre…
Cette boîte est la dernière étape de notre voyage.
Elle t’attend dans la vraie vie.
C’est fini
```

ACTION UTILISATEUR : Recevoir la boîte physique, cliquer « C’est fini »

ÉCRAN SUIVANT : Final — terminé

VISUEL PRINCIPAL : Boîte transmise de Vincent à Marjolaine.

---

## [Final — terminé]

TYPE : final

ARRIVE APRÈS : Final — remise de la boîte

TEXTE EXACT AFFICHÉ :

```text
Vincent a encore
quelque chose à te remettre…
Cette boîte est la dernière étape de notre voyage.
Elle t’attend dans la vraie vie.
C’est fini.
```

ACTION UTILISATEUR : Aucune ; état final

ÉCRAN SUIVANT : Aucun

VISUEL PRINCIPAL : Même illustration de boîte.

---

# INVENTAIRE DES ÉCRANS

1. Accès Safari — installation
2. Prologue 1 — bienvenue
3. Prologue 2 — invitation
4. Prologue 3 — carnet
5. Carnet — aperçu initial
6. Carnet — premier souvenir
7. D1 — introduction
8. D1 — portes
9. D1 — règle 1, dessin
10. D1 — règle 1, réponse orale
11. D1 — règle 1, révélation
12. D1 — règle 2, dessin
13. D1 — règle 2, réponse orale
14. D1 — règle 2, révélation
15. D1 — règle 3, dessin
16. D1 — règle 3, réponse orale
17. D1 — règle 3, révélation
18. D1 — règle 4, dessin
19. D1 — règle 4, réponse orale
20. D1 — règle 4, révélation
21. D1 — règle 5, dessin
22. D1 — règle 5, réponse orale
23. D1 — règle 5, révélation
24. D1 — règle 6, dessin
25. D1 — règle 6, réponse orale
26. D1 — règle 6, révélation
27. D1 — conclusion arc-en-ciel
28. D1 — révélation dans le carnet
29. D1 — galerie
30. D1 — remise
31. Carnet — aperçu avant D2
32. D2 — introduction
33. D2 — question 1
34. D2 — question 2
35. D2 — question 3
36. D2 — question 4
37. D2 — question 5
38. D2 — question 6
39. D2 — question 7
40. D2 — question 8
41. D2 — question 9
42. D2 — question 10
43. D2 — question 11
44. D2 — question 12
45. D2 — profils de couple
46. D2 — conclusion arc-en-ciel
47. D2 — révélation dans le carnet
48. D2 — galerie
49. D2 — remise
50. Pause 1 — attente
51. Pause 1 — reprise disponible
52. Carnet — aperçu avant D3
53. D3 — introduction
54. D3 — photo 1
55. D3 — photo 1, réponse
56. D3 — photo 2
57. D3 — photo 2, réponse
58. D3 — photo 3
59. D3 — photo 3, réponse
60. D3 — conclusion arc-en-ciel
61. D3 — révélation dans le carnet
62. D3 — galerie
63. D3 — remise
64. Carnet — aperçu avant D5
65. D5 — introduction
66. D5 — choix 1
67. D5 — trajet animé 1
68. D5 — résultat 1
69. D5 — choix 2
70. D5 — trajet animé 2
71. D5 — résultat 2
72. D5 — choix 3
73. D5 — trajet animé 3
74. D5 — résultat 3
75. D5 — choix 4
76. D5 — trajet animé 4
77. D5 — résultat 4
78. D5 — choix 5
79. D5 — trajet animé 5
80. D5 — résultat 5
81. D5 — route finale
82. D5 — conclusion arc-en-ciel
83. D5 — révélation dans le carnet
84. D5 — galerie
85. D5 — remise
86. Pause 2 — attente
87. Pause 2 — reprise disponible
88. Carnet — aperçu avant D6
89. D6 — introduction
90. D6 — question 1, lecture
91. D6 — question 1, chrono
92. D6 — question 1, notation
93. D6 — question 2, lecture
94. D6 — question 2, chrono
95. D6 — question 2, notation
96. D6 — question 3, lecture
97. D6 — question 3, chrono
98. D6 — question 3, notation
99. D6 — question 4, lecture
100. D6 — question 4, chrono
101. D6 — question 4, notation
102. D6 — question 5, lecture
103. D6 — question 5, chrono
104. D6 — question 5, notation
105. D6 — question 6, lecture
106. D6 — question 6, chrono
107. D6 — question 6, notation
108. D6 — question 7, lecture
109. D6 — question 7, chrono
110. D6 — question 7, notation
111. D6 — question 8, lecture
112. D6 — question 8, chrono
113. D6 — question 8, notation
114. D6 — question 9, lecture
115. D6 — question 9, chrono
116. D6 — question 9, notation
117. D6 — question 10, lecture
118. D6 — question 10, chrono
119. D6 — question 10, notation
120. D6 — question 11, lecture
121. D6 — question 11, chrono
122. D6 — question 11, notation
123. D6 — question 12, lecture
124. D6 — question 12, chrono
125. D6 — question 12, notation
126. D6 — question 13, lecture
127. D6 — question 13, chrono
128. D6 — question 13, notation
129. D6 — question 14, lecture
130. D6 — question 14, chrono
131. D6 — question 14, notation
132. D6 — conclusion arc-en-ciel
133. D6 — révélation dans le carnet
134. D6 — galerie
135. D6 — remise
136. Carnet — aperçu avant D7
137. D7 — introduction
138. D7 — serpent
139. D7 — échec
140. D7 — réussite
141. D7 — conclusion arc-en-ciel
142. D7 — révélation dans le carnet
143. D7 — galerie
144. D7 — remise
145. Pause 3 — attente
146. Pause 3 — reprise disponible
147. Carnet — aperçu avant D8
148. D8 — introduction
149. D8 — chanson 1, écoute
150. D8 — chanson 1, révélation
151. D8 — chanson 2, écoute
152. D8 — chanson 2, révélation
153. D8 — chanson 3, écoute
154. D8 — chanson 3, révélation
155. D8 — chanson 4, écoute
156. D8 — chanson 4, révélation
157. D8 — chanson 5, écoute
158. D8 — chanson 5, révélation
159. D8 — chanson 6, écoute
160. D8 — chanson 6, révélation
161. D8 — chanson 7, écoute
162. D8 — chanson 7, révélation
163. D8 — conclusion arc-en-ciel
164. D8 — révélation dans le carnet
165. D8 — galerie
166. D8 — remise
167. Carnet — aperçu avant D4
168. D4 — introduction
169. D4 — coucher de soleil
170. D4 — conclusion arc-en-ciel
171. D4 — révélation dans le carnet
172. D4 — galerie
173. D4 — remise
174. Final — mot de passe
175. Final — remise de la boîte
176. Final — terminé

# TEXTES RÉUTILISÉS

- « NOTRE VOYAGE » et « Il y a encore beaucoup / de pages à remplir… » : aperçus du carnet et révélation des souvenirs.
- « Revenir au carnet » : fin de chaque galerie.
- « Ce souvenir n’est pas tout à fait terminé. », « Vincent a encore quelque chose pour toi. » et « Je l’ai » : remises D1, D2, D3, D5, D6, D7 et D8. D4 utilise sa variante « Ce dernier souvenir… ».
- « Continuer » : révélations D1, profils D2, réussite D7 et conclusions arc-en-ciel.
- « Lenny ou Milan ? », « Lenny », « Milan » et « À toi de reconnaître qui se cache derrière chaque petit visage. » : trois photos D3.
- « À toi de nous emmener à Stockholm » : introduction et cinq choix D5.
- « Lancer le chrono », « J’ai fini », « Valider la note » : quatorze questions D6.
- « Le blind test », « À toi de jouer ! / Vincent lance la musique sur la playlist / Deezer, écoute bien… » et « J’ai trouvé ! » : sept chansons D8.
- « Deux souvenirs de plus. » : pauses 2 et 3.

# ROUTES LEGACY ENCORE ACCESSIBLES

- `#gallery-1`, `#gallery-2`, `#gallery-3`, `#gallery-5`, `#gallery-6`, `#gallery-7`, `#gallery-8` et `#gallery-4` : après révélation d’un souvenir, la galerie déjà vue peut être rouverte depuis son polaroid ; l’accès direct par URL dépend de la progression enregistrée. Cette revisite ramène au carnet, sans rejouer la remise.
- `#handoff-1`, `#handoff-2`, `#handoff-3`, `#handoff-5`, `#handoff-6`, `#handoff-7`, `#handoff-8` et `#handoff-4` : routes encore enregistrées et rendues ; un accès direct par URL après révélation du souvenir peut réafficher l’ancien écran de remise, sous réserve des gardes de navigation et des pauses.
- `d3-crop-calibrator.html?debug=1` : écran d’outil accessible depuis le panneau de test avec `?debug=1`, hors parcours principal.

Les anciens rendus `renderChoiceSequence` (`script.js`) et `openGalleryViewer` (`gallery-viewer.js`) restent dans le code mais ne sont appelés par aucune route du parcours courant ; aucun écran accessible correspondant n’a été identifié.
