// Configuration éditoriale V1. Toute mention PLACEHOLDER reste à remplacer.
export const APP_VERSION = "1.4.0";

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
      publicChallengeTitle: "Les six portes de notre mémoire",
      galleryTitle: "Stresa",
      letter: "M",
      gallery: [
        { src: null, label: "PLACEHOLDER — STRESA 1" },
        { src: null, label: "PLACEHOLDER — STRESA 2" },
      ],
      // Option future : { enabled: true, src: "assets/audio/...", startMode: "user", volume: 0.8 }
      soundtrack: null,
      questions: [
        { prompt: "PLACEHOLDER — question sur un lieu", options: ["Réponse A", "Réponse B", "Réponse C"], answer: 0 },
        { prompt: "PLACEHOLDER — question sur un objet", options: ["Réponse A", "Réponse B", "Réponse C"], answer: 1 },
        { prompt: "PLACEHOLDER — question sur une phrase", options: ["Réponse A", "Réponse B", "Réponse C"], answer: 2 },
        { prompt: "PLACEHOLDER — question sur un détail", options: ["Réponse A", "Réponse B", "Réponse C"], answer: 0 },
        { prompt: "PLACEHOLDER — question sur un goût ou un geste", options: ["Réponse A", "Réponse B", "Réponse C"], answer: 1 },
        { prompt: "PLACEHOLDER — question sur une image", options: ["Réponse A", "Réponse B", "Réponse C"], answer: 2 },
      ],
    },
    2: {
      title: "La vie à trois",
      publicChallengeTitle: "Notre profil de couple",
      galleryTitle: "Regarde.",
      letter: "Y",
      gallery: [{ src: null, label: "PLACEHOLDER — VIE À TROIS" }],
      soundtrack: null,
      questions: [
        { prompt: "PLACEHOLDER — Notre dimanche idéal commence par…", options: ["Un réveil lent", "Une aventure", "Un petit-déjeuner qui dure"] },
        { prompt: "PLACEHOLDER — Quand tout s’accélère, nous…", options: ["Improvisons", "Faisons une liste", "Rions d’abord"] },
        { prompt: "PLACEHOLDER — Notre super-pouvoir de couple ?", options: ["La tendresse", "L’obstination", "Les goûters"] },
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
      tracks: [
        { label: "Extrait guitare PLACEHOLDER 1", options: ["Morceau A", "Morceau B", "Morceau C"], answer: 0 },
        { label: "Extrait guitare PLACEHOLDER 2", options: ["Morceau D", "Morceau E", "Morceau F"], answer: 1 },
        { label: "Extrait guitare PLACEHOLDER 3", options: ["Can’t Help Falling in Love", "Morceau PLACEHOLDER G", "Morceau PLACEHOLDER H"], answer: 0 },
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
