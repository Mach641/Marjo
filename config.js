// Configuration éditoriale V1. Toute mention PLACEHOLDER reste à remplacer.
export const APP_VERSION = "1.4.11";

export const CONFIG = {
  storageKey: "voyage-majorque-v1",
  stateVersion: 3,
  password: "MYMPVTME",
  routeOrder: [1, 8, 2, 3, 5, 6, 7, 4],
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
  geo: {
    name: "Aéroport Lyon Saint-Exupéry",
    latitude: 45.7256,
    longitude: 5.0811,
    radiusKm: 10,
  },
  schedule: {
    // Dates locales du voyage, modifiables sans toucher au moteur.
    fridayUnlockDate: "2026-09-18",
    saturdayUnlockDate: "2026-09-19",
  },
  text: {
    prologue: [
      "Moi, c’est l’arc-en-ciel.",
      "Je suis l’esprit de ce carnet.",
      "Dans les prochains jours, je te proposerai quelques défis. Chaque souvenir devra être gagné avant de trouver sa place entre ces pages.",
      "Nous voyagerons dans votre passé, dans les vies qui auraient pu être les vôtres, dans le présent… et peut-être un peu plus loin.",
      "Alors… tu veux commencer le voyage ?",
    ],
    analysis: [
      "Analyse de vos réponses…",
      "Compatibilité des habitudes…",
      "Prise en compte du retard moyen de Vincent…",
    ],
    diagnostic: "Votre histoire ne tient dans aucune case.",
  },
  chapters: {
    1: {
      title: "Stresa",
      publicChallengeTitle: "Les règles de notre monde",
      galleryTitle: "Stresa",
      letter: "M",
      gallery: [
        { src: null, label: "PLACEHOLDER — STRESA 1" },
        { src: null, label: "PLACEHOLDER — STRESA 2" },
      ],
      // Option future : { enabled: true, src: "assets/audio/...", startMode: "user", volume: 0.8 }
      soundtrack: null,
    },
    2: {
      title: "La vie à trois",
      publicChallengeTitle: "Notre profil de couple",
      galleryTitle: "Regarde.",
      letter: "Y",
      gallery: [{ src: null, label: "PLACEHOLDER — VIE À TROIS" }],
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
    4: { title: "Majorque", publicChallengeTitle: "Samedi soir", letter: "P" },
    5: {
      title: "Stockholm",
      publicChallengeTitle: "À toi de nous emmener à Stockholm",
      galleryTitle: "Stockholm",
      letter: "V",
      gallery: [{ src: null, label: "PLACEHOLDER — STOCKHOLM" }],
      soundtrack: null,
      routeEvents: [
        { text: "La route s’ouvre devant nous.", action: "Démarrer" },
        { text: "Une pause imprévue. L’arc-en-ciel prétend connaître un raccourci.", action: "Reprendre la route" },
        { text: "La Baltique n’est plus très loin.", action: "Continuer vers le nord" },
      ],
    },
    6: {
      title: "Retour en France",
      publicChallengeTitle: "Magie, histoire… ou les deux ?",
      galleryTitle: "Regarde.",
      letter: "T",
      gallery: [{ src: null, label: "PLACEHOLDER — MAISON FAMILIALE" }],
      soundtrack: null,
      questions: [
        { prompt: "PLACEHOLDER — Le premier matin dans notre maison", answer: "Les deux" },
        { prompt: "PLACEHOLDER — Un détail extraordinaire du quotidien", answer: "Magie" },
        { prompt: "PLACEHOLDER — Un souvenir transmis aux enfants", answer: "Histoire" },
      ],
    },
    7: {
      title: "Adolescence",
      publicChallengeTitle: "Une minute en famille",
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
        { title: "À définir", artist: "À définir" },
        { title: "À définir", artist: "À définir" },
        { title: "À définir", artist: "À définir" },
      ],
    },
  },
};

export const STEPS = [
  "welcome", "prologue", "challenge-1", "resolution-1", "gallery-1", "travel-past-medium-1", "handoff-1",
  "challenge-8", "resolution-8", "gallery-8", "travel-future-large", "handoff-8", "thursday-lock",
  "travel-past-large", "friday-returned", "geo", "departure", "flight", "challenge-2", "analysis-2", "resolution-2",
  "gallery-2", "travel-past-medium", "handoff-2", "challenge-3", "resolution-3", "gallery-3",
  "travel-future-small", "handoff-3", "friday-lock", "saturday-intro", "challenge-5", "resolution-5",
  "reveal-5", "gallery-5", "travel-future-small-5", "handoff-5", "challenge-6", "resolution-6",
  "reveal-6", "gallery-6", "travel-future-medium-6", "handoff-6", "challenge-7", "resolution-7",
  "gallery-7", "travel-future-medium-7", "handoff-7", "travel-past-large-return", "saturday-evening",
  "majorca", "order", "letters-clue", "password", "final",
].map((id) => ({ id, label: id.replaceAll("-", " ") }));
