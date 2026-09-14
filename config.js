// Configuration éditoriale V1. Toute mention PLACEHOLDER reste à remplacer.
export const APP_VERSION = "1.4.49";

// D8 is deliberately late: the distant future precedes the return to Majorca.
const JOURNEY_CHAPTERS = [
  { id: "thursday", challenges: [1, 2], pause: { id: "pause-1", after: 2, next: 3, target: "2026-09-18T12:00:00+02:00", label: "Vendredi 18 septembre à 12 h", text: ["Deux souvenirs retrouvés.", "On s’arrête ici pour ce soir. On reprend demain, dans l’avion."], extra: "En attendant, quel souvenir aimerais-tu emporter partout avec toi ?" } },
  { id: "friday", challenges: [3, 5], pause: { id: "pause-2", after: 5, next: 6, target: "2026-09-19T08:00:00+02:00", label: "Samedi 19 septembre à 8 h", text: ["Deux souvenirs de plus.", "On s’arrête à nouveau pour aujourd’hui. On reprend demain matin."] } },
  { id: "saturday-morning", challenges: [6, 7], pause: { id: "pause-3", after: 7, next: 8, target: "2026-09-19T18:00:00+02:00", label: "Samedi 19 septembre à 18 h", text: ["Deux souvenirs de plus.", "Le carnet peut se reposer un peu. On reprend ce soir."] } },
  { id: "saturday-evening", challenges: [8, 4] },
];

// Existing gallery transitions remain separate from chapter pauses.
export const GALLERY_TRAVEL = { 2: "travel-past-medium", 3: "travel-future-small", 5: "travel-future-small-5", 8: "travel-future-large" };

export const CONFIG = {
  storageKey: "voyage-majorque-v1",
  stateVersion: 4,
  password: "MYMPVTME",
  journeyChapters: JOURNEY_CHAPTERS,
  routeOrder: JOURNEY_CHAPTERS.flatMap(chapter => chapter.challenges),
  chronologicalOrder: [1, 2, 3, 4, 5, 6, 7, 8],
  timeTravel: {
    // Inverser ces deux valeurs suffit à retourner le langage visuel passé/futur.
    visualDirections: { past: "right", future: "left" },
  },
  challengeOne: {
    rules: [
      { id: 1, text: "Marjolaine a toujours raison.", hint: "Avec Marjo, mieux vaut être d’accord !" },
      { id: 2, text: "Vincent doit éplucher<br>et couper les pommes<br>de Marjolaine.", hint: "Vincent n’a qu’une mission :<br>les éplucher, les couper,<br>et les lui servir." },
      { id: 3, text: "Marjolaine a le droit de tremper<br>son chocolat dans le café de Vincent.", hint: "Ce café appartient à Vincent.<br>Le chocolat, beaucoup moins..." },
      { id: 4, text: "Tous les chats sont beaux.", hint: "Cet air ronchon ne change rien :<br>il fait partie de la règle !" },
      { id: 5, text: "On ne doit jamais se coucher<br>en étant fâchés.", hint: "Notre lit est tout petit<br>pour notre amour.<br>Pas question d’y ajouter<br>notre fierté." },
      { id: 6, text: "À la maison, on porte toujours<br>ses chaussons.", hint: "À la maison, il y a<br>une seule façon de circuler...<br>Vincent le sait bien !" },
    ],
  },
  text: {
    opening: {
      welcome: [
        "Je suis né parce que la pluie et le soleil se sont rencontrés.",
        "Les paysages changent, les chemins aussi, parfois même la destination.",
        "Mais certains voyages restent beaux pour une raison beaucoup plus simple.",
        "Est-ce que tu veux découvrir avec moi pourquoi ?",
      ],
      prologue: [
        "Je t’invite à ouvrir des pages,<br>à relever quelques défis,<br>à te laisser surprendre.",
        "On ira faire un tour du côté des souvenirs,<br>et imaginer d’autres possibles,<br>et on verra comment tout cela s’assemble.",
        "Pas besoin d’être parfaite,<br>juste d’être curieuse.",
      ],
      notebook: [
        "C’est lui qui va nous accompagner.<br>Il contiendra les étapes de notre voyage,<br>avec ses défis et ses découvertes.",
        "Prends-le, quand tu es prête.<br>Et laisse-toi guider…",
      ],
    },
    // Provisional copy except D8, whose validated conclusion is unchanged.
    conclusions: {
      1: ["Tu connais les règles de notre monde.", "Un souvenir de nous t’attend maintenant."],
      2: ["Notre couple ne tient pas dans une case.", "Un souvenir en raconte un peu plus."],
      3: ["Ces petits visages ont déjà toute une histoire.", "Une page de cette histoire t’attend."],
      5: ["Chaque chemin dessine une suite possible.", "Découvrons celle qui se cache dans le carnet."],
      6: ["Ils vous poseront sûrement des centaines de questions.<br>Certaines auront une réponse.<br>D’autres beaucoup moins.<br><br>Mais ce qu’ils retiendront surtout,<br>c’est que vous aurez pris le temps d’y répondre.", "Il est temps de voir ce qu’ils ont gardé de tout ça."],
      7: ["Le chemin s’est allongé, pomme après pomme.", "Un souvenir t’attend au bout."],
      8: ["Il y a des chansons qu’on reconnaît en quelques secondes.", "Et d’autres qu’on n’oublie jamais."],
      4: ["Tu étais là.<br>Au bon endroit,<br>au bon moment.", "Ce dernier souvenir est à toi."],
    },
    diagnostic: "Votre histoire ne tient dans aucune case.",
  },
  chapters: {
    1: {
      title: "Stresa",
      publicChallengeTitle: "Les règles de notre monde",
      galleryTitle: "Stresa",
      letter: "M",
      memoryThumbnail: "assets/challenge-1/v1-4-27/parc-de-vincennes.png",
      gallery: [
        { id: "vincennes-01", full: "assets/challenge-1/v1-4-30/d1-vincennes-portrait-characters.png", decor: "assets/challenge-1/v1-4-30/d1-vincennes-portrait-decor.png", immersive: true, alt: "Vincent et Marjolaine sur le banc du parc de Vincennes" },
        { id: "duomo-02", decor: "assets/challenge-1/v1-4-45/D1_G2_decor.png", full: "assets/challenge-1/v1-4-45/D1_G2_final.png", alt: "Vincent et Marjolaine devant le Duomo" },
        { id: "D1_G3", decor: "assets/challenge-1/v1-4-45/D1_G3_decor.png", full: "assets/challenge-1/v1-4-45/D1_G3_final.png", alt: "Vincent, Marjolaine enceinte et leur chat devant le mur de miroirs" },
        { id: "D1_G4", decor: "assets/challenge-1/v1-4-45/D1_G4_decor.png", full: "assets/challenge-1/v1-4-45/D1_G4_final.png" },
        { id: "D1_G5", decor: "assets/challenge-1/v1-4-45/D1_G5_decor.png", full: "assets/challenge-1/v1-4-45/D1_G5_final.png", alt: "Vincent et Marjolaine au balcon du Regina Palace à Stresa" },
      ],
      // Option future : { enabled: true, src: "assets/audio/...", startMode: "user", volume: 0.8 }
      soundtrack: null,
    },
    2: {
      title: "La vie à trois",
      publicChallengeTitle: "Notre profil de couple",
      galleryTitle: "Regarde.",
      letter: "Y",
      gallery: [
        { id: "D2_G1", decor: "assets/challenge-1/v1-4-45/D2_G1_decor.png", full: "assets/challenge-1/v1-4-45/D2_G1_final.png" },
        { id: "D2_G2", decor: "assets/challenge-1/v1-4-45/D2_G2_decor.png", full: "assets/challenge-1/v1-4-45/D2_G2_final.png" },
        { id: "D2_G3", decor: "assets/challenge-1/v1-4-45/D2_G3_decor.png", full: "assets/challenge-1/v1-4-45/D2_G3_final.png" },
        { id: "D2_G4", decor: "assets/challenge-1/v1-4-45/D2_G4_decor.png", full: "assets/challenge-1/v1-4-45/D2_G4_final.png" },
        { id: "D2_G5", decor: "assets/challenge-1/v1-4-45/D2_G5_decor.png", full: "assets/challenge-1/v1-4-45/D2_G5_final.png" },
      ],
      soundtrack: null,
      profiles: {
        A: { symbol: "◆", name: "L’équipe organisée", description: "Planning, relais, organisation : vous aimez sentir que les choses sont sous contrôle… ou au moins faire semblant." },
        B: { symbol: "●", name: "Tendrement débordés", description: "Vous avez compris l’essentiel : parfois, aimer quelqu’un, c’est surtout lui dire “vas-y, je m’en occupe”." },
        C: { symbol: "✦", name: "Complices dans le chaos", description: "Chez vous, les galères ont une drôle de tendance à finir en blagues et en souvenirs." },
        D: { symbol: "♡", name: "Les amoureux avant tout", description: "Le couple n’a pas disparu sous la logistique, la fatigue et les journées trop remplies. Il a juste trouvé de nouvelles façons de se dire “je t’aime”." },
      },
      questions: [
        { prompt: "Un dimanche matin, votre salon ressemble à une zone sinistrée. Votre premier réflexe ?", options: [
          { symbol: "◆", profile: "A", text: "On range tout avant de faire quoi que ce soit." },
          { symbol: "♡", profile: "D", text: "On se retrouve cinq minutes tous les deux avant d’affronter le chantier." },
          { symbol: "✦", profile: "C", text: "On se moque du bazar et on improvise autour." },
          { symbol: "●", profile: "B", text: "On commence par souffler un peu, puis on s’y met." },
        ] },
        { prompt: "Votre définition d’un moment romantique depuis que vous êtes parents ?", options: [
          { symbol: "●", profile: "B", text: "Dix minutes tranquilles sur le canapé, ça compte déjà beaucoup." },
          { symbol: "✦", profile: "C", text: "Un fou rire au milieu d’un moment complètement bancal." },
          { symbol: "♡", profile: "D", text: "Un moment où on se retrouve vraiment tous les deux, même très court." },
          { symbol: "◆", profile: "A", text: "Un vrai dîner à deux, organisé à l’avance." },
        ] },
        { prompt: "Quand une journée part complètement de travers, vous êtes plutôt…", options: [
          { symbol: "✦", profile: "C", text: "« Bon, autant en rire. »" },
          { symbol: "◆", profile: "A", text: "« On se pose, on organise, on reprend le contrôle. »" },
          { symbol: "♡", profile: "D", text: "« Tant qu’on reste soudés tous les deux, ça ira. »" },
          { symbol: "●", profile: "B", text: "« On fait comme on peut, un truc après l’autre. »" },
        ] },
        { prompt: "À la maison, qui repère le plus vite qu’un petit détail cloche ?", options: [
          { symbol: "♡", profile: "D", text: "Celui qui remarque surtout que l’autre n’a pas l’air dans son assiette." },
          { symbol: "●", profile: "B", text: "Celui qui a encore assez d’énergie pour le remarquer." },
          { symbol: "◆", profile: "A", text: "Celui qui garde un œil sur tout." },
          { symbol: "✦", profile: "C", text: "Celui qui transforme le problème en blague." },
        ] },
        { prompt: "Votre couple face au manque de sommeil, c’est…", options: [
          { symbol: "◆", profile: "A", text: "Une équipe qui se répartit les rôles." },
          { symbol: "✦", profile: "C", text: "Deux zombies qui finissent par rire de leur état." },
          { symbol: "●", profile: "B", text: "Deux zombies qui essaient de se relayer gentiment." },
          { symbol: "♡", profile: "D", text: "Deux zombies qui trouvent encore le moyen de se faire un câlin." },
        ] },
        { prompt: "Quand vous avez enfin une soirée à deux, vous choisissez quoi ?", options: [
          { symbol: "♡", profile: "D", text: "Peu importe ce qu’on fait, du moment qu’on est vraiment ensemble." },
          { symbol: "✦", profile: "C", text: "Improviser au dernier moment selon l’humeur." },
          { symbol: "◆", profile: "A", text: "Quelque chose de prévu pour vraiment en profiter." },
          { symbol: "●", profile: "B", text: "Ne rien faire et récupérer ensemble." },
        ] },
        { prompt: "Un désaccord éclate pour une raison ridicule. Vous…", options: [
          { symbol: "●", profile: "B", text: "Prenez un peu de distance puis revenez calmement." },
          { symbol: "♡", profile: "D", text: "Supportez très mal de rester froids l’un avec l’autre trop longtemps." },
          { symbol: "✦", profile: "C", text: "Finissez par rire de la raison initiale." },
          { symbol: "◆", profile: "A", text: "Essayez de régler ça tout de suite." },
        ] },
        { prompt: "La phrase qui revient le plus souvent chez vous ?", options: [
          { symbol: "✦", profile: "C", text: "« Attends, ça c’est quand même très drôle. »" },
          { symbol: "♡", profile: "D", text: "« Viens là. »" },
          { symbol: "◆", profile: "A", text: "« On s’organise comment ? »" },
          { symbol: "●", profile: "B", text: "« Tu peux prendre le relais deux minutes ? »" },
        ] },
        { prompt: "Dans votre couple, le romantisme aujourd’hui ressemble plutôt à…", options: [
          { symbol: "◆", profile: "A", text: "Des attentions préparées à l’avance." },
          { symbol: "♡", profile: "D", text: "Un bisou, une main posée sur l’autre, un regard qui veut tout dire." },
          { symbol: "●", profile: "B", text: "Des petits gestes pratiques qui soulagent l’autre." },
          { symbol: "✦", profile: "C", text: "Des blagues privées que personne d’autre ne comprend." },
        ] },
        { prompt: "Si votre vie de famille était une météo, ce serait…", options: [
          { symbol: "●", profile: "B", text: "Quelques averses, mais on reste bien à l’abri ensemble." },
          { symbol: "♡", profile: "D", text: "Un temps changeant, avec toujours un petit coin de ciel bleu à deux." },
          { symbol: "✦", profile: "C", text: "Une petite tempête suivie d’un grand arc-en-ciel." },
          { symbol: "◆", profile: "A", text: "Un ciel changeant mais surveillé de près." },
        ] },
        { prompt: "Quand l’un de vous est épuisé, l’autre…", options: [
          { symbol: "♡", profile: "D", text: "Commence par vérifier qu’il va vraiment bien." },
          { symbol: "◆", profile: "A", text: "Réorganise immédiatement la journée pour prendre le relais." },
          { symbol: "✦", profile: "C", text: "Commence par le faire rire avant de prendre la suite." },
          { symbol: "●", profile: "B", text: "Fait ce qu’il peut pour alléger la charge." },
        ] },
        { prompt: "Votre plus grande force à deux ?", options: [
          { symbol: "●", profile: "B", text: "Savoir vous soutenir." },
          { symbol: "✦", profile: "C", text: "Savoir rire ensemble." },
          { symbol: "♡", profile: "D", text: "Ne jamais vraiment vous perdre de vue." },
          { symbol: "◆", profile: "A", text: "Savoir vous organiser." },
        ] },
        { prompt: "Une sortie familiale se transforme en galère. Vous réagissez comment ?", options: [
          { symbol: "◆", profile: "A", text: "Vous trouvez immédiatement un plan B." },
          { symbol: "♡", profile: "D", text: "Vous vous assurez d’abord que l’autre tient le coup." },
          { symbol: "●", profile: "B", text: "Vous simplifiez tout et faites au plus facile." },
          { symbol: "✦", profile: "C", text: "Vous décidez que ce sera une excellente anecdote plus tard." },
        ] },
        { prompt: "À la fin d’une longue journée, votre geste préféré ?", options: [
          { symbol: "✦", profile: "C", text: "Se regarder avec l’air de dire « on a survécu »." },
          { symbol: "●", profile: "B", text: "S’affaler côte à côte et souffler enfin." },
          { symbol: "◆", profile: "A", text: "Faire le point ensemble sur ce qu’il reste à gérer." },
          { symbol: "♡", profile: "D", text: "Se rapprocher l’un de l’autre, même sans parler." },
        ] },
        { prompt: "Ce qui vous ressemble le plus depuis que vous êtes parents ?", options: [
          { symbol: "♡", profile: "D", text: "Toujours amoureux, mais autrement." },
          { symbol: "●", profile: "B", text: "Plus attentifs l’un à l’autre qu’avant." },
          { symbol: "◆", profile: "A", text: "Plus organisés qu’avant." },
          { symbol: "✦", profile: "C", text: "Encore plus complices dans l’imprévu." },
        ] },
        { prompt: "Quand vous repensez à votre vie “avant”, vous vous dites…", options: [
          { symbol: "✦", profile: "C", text: "« On avait déjà de bons souvenirs, mais pas ceux-là. »" },
          { symbol: "♡", profile: "D", text: "« Notre vie a changé, mais j’aime toujours autant être juste avec toi. »" },
          { symbol: "◆", profile: "A", text: "« On avait tellement moins de choses à organiser. »" },
          { symbol: "●", profile: "B", text: "« On ne savait pas ce que voulait dire être vraiment fatigués. »" },
        ] },
        { prompt: "Le plus grand changement dans votre couple ?", options: [
          { symbol: "◆", profile: "A", text: "Vous êtes devenus une vraie équipe logistique." },
          { symbol: "✦", profile: "C", text: "Vous avez inventé encore plus de codes et de blagues à vous." },
          { symbol: "♡", profile: "D", text: "Vous avez dû apprendre à protéger votre place de couple dans une vie beaucoup plus remplie." },
          { symbol: "●", profile: "B", text: "Vous avez appris à mieux vous relayer." },
        ] },
        { prompt: "Si votre couple avait un super-pouvoir, ce serait…", options: [
          { symbol: "●", profile: "B", text: "Continuer à avancer même avec très peu d’énergie." },
          { symbol: "♡", profile: "D", text: "Réussir à se retrouver même quand tout le reste prend toute la place." },
          { symbol: "◆", profile: "A", text: "Anticiper les catastrophes." },
          { symbol: "✦", profile: "C", text: "Transformer le chaos en complicité." },
        ] },
        { prompt: "Un souvenir parfait de votre vie à trois, ce serait plutôt…", options: [
          { symbol: "✦", profile: "C", text: "Une scène un peu chaotique mais dont vous riez encore." },
          { symbol: "♡", profile: "D", text: "Un moment où vous regardez votre enfant puis vous vous regardez tous les deux, sans avoir besoin de parler." },
          { symbol: "●", profile: "B", text: "Un moment tout simple où tout le monde est enfin bien." },
          { symbol: "◆", profile: "A", text: "Une journée où tout s’est déroulé comme prévu." },
        ] },
        { prompt: "Au fond, votre nouvelle vie ressemble surtout à…", options: [
          { symbol: "♡", profile: "D", text: "Une histoire d’amour qui a grandi pour faire de la place à quelqu’un d’autre." },
          { symbol: "◆", profile: "A", text: "Un équilibre qu’on construit et qu’on ajuste chaque jour." },
          { symbol: "●", profile: "B", text: "Une équipe qui apprend à se soutenir dans la fatigue." },
          { symbol: "✦", profile: "C", text: "Une aventure imprévisible qui devient votre histoire préférée." },
        ] },
      ],
    },
    3: {
      title: "La vie à quatre",
      publicChallengeTitle: "Qui est qui ?",
      galleryTitle: "Regarde.",
      letter: "M",
      gallery: [{ src: null, label: "PLACEHOLDER — VIE À QUATRE" }],
      soundtrack: null,
      babyPhotos: [
        { src: "assets/img/Lenny_1.png", answer: "Lenny", alt: "Photo de Lenny bébé" },
        { src: null, answer: "Milan", alt: "PLACEHOLDER — photo de Milan bébé" },
        { src: null, answer: "Lenny", alt: "PLACEHOLDER — seconde photo bébé" },
      ],
    },
    4: {
      title: "Majorque",
      publicChallengeTitle: "Le coucher de soleil",
      galleryTitle: "Majorque",
      letter: "P",
      gallery: [{ src: null, label: "PLACEHOLDER — COUCHER DE SOLEIL À MAJORQUE" }],
      soundtrack: null,
    },
    5: {
      title: "Stockholm",
      publicChallengeTitle: "À toi de nous emmener à Stockholm",
      galleryTitle: "Stockholm",
      letter: "V",
      gallery: [
        { src: null, label: "PLACEHOLDER — STOCKHOLM" },
        { id: "D5_G2", decor: "assets/challenge-1/v1-4-45/D5_G2_decor.png", full: "assets/challenge-1/v1-4-45/D5_G2_final.png" },
        { id: "D5_G3", decor: "assets/challenge-1/v1-4-45/D5_G3_decor.png", full: "assets/challenge-1/v1-4-45/D5_G3_final.png" },
      ],
      soundtrack: null,
      routeEvents: [
        { text: "La route s’ouvre devant nous.", action: "Démarrer" },
        { text: "Une pause imprévue. L’arc-en-ciel prétend connaître un raccourci.", action: "Reprendre la route" },
        { text: "La Baltique n’est plus très loin.", action: "Continuer vers le nord" },
      ],
    },
    6: {
      title: "Retour en France",
      publicChallengeTitle: "À vous de les convaincre",
      galleryTitle: "Regarde.",
      letter: "T",
      gallery: [{ src: null, label: "PLACEHOLDER — MAISON FAMILIALE" }],
      soundtrack: null,
    },
    7: {
      title: "Adolescence",
      publicChallengeTitle: "Le serpent",
      galleryTitle: "Regarde.",
      letter: "M",
      gallery: [{ src: null, label: "PLACEHOLDER — ADOLESCENCE" }],
      soundtrack: null,
    },
    8: {
      title: "Futur lointain",
      publicChallengeTitle: "Blind test guitare",
      galleryTitle: "Regarde.",
      letter: "E",
      gallery: [{ src: null, label: "PLACEHOLDER — FUTUR LOINTAIN" }],
      soundtrack: null,
      songs: [
        { title: "Lady Marmalade", artist: "Christina Aguilera" },
        { title: "Set Fire to the Rain", artist: "Adele" },
        { title: "Bohemian Rhapsody", artist: "Queen" },
        { title: "Ave Maria", artist: "Andrea Bocelli" },
        { title: "Your Song", artist: "Elton John" },
        { title: "Still Loving You", artist: "Scorpions" },
        { title: "Can’t Help Falling in Love", artist: "Elvis Presley" },
      ],
    },
  },
};

export const STEPS = [
  "welcome", "prologue", "notebook-intro",
  ...CONFIG.routeOrder.flatMap(id => [
    `challenge-${id}`, `conclusion-${id}`,
    `gallery-${id}`, ...(GALLERY_TRAVEL[id] ? [GALLERY_TRAVEL[id]] : []), `handoff-${id}`,
    ...JOURNEY_CHAPTERS.filter(chapter => chapter.pause?.after === id).map(chapter => chapter.pause.id),
  ]),
  "password", "final-handover", "final",
].map(id => ({ id, label: id.replaceAll("-", " ") }));
