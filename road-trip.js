import { gameplayHeader } from "./gameplay-header.js?v=1.4.23";
import { challengeIntro } from "./challenge-intro.js?v=1.4.19";
const ASSETS = 'assets/challenge-5/v1-4-14';
const START = [350,664];
// Coordonnées sur la carte originale ; image réserve un asset distinct pour chaque choix.
export const ROAD_STEPS = [
  {
    "title": "On quitte Annecy. Par où on passe ?",
    "subtitle": "Première décision : choisir notre grande direction.",
    "options": [
      {
        "title": "Par la Suisse",
        "text": "Des montagnes, des lacs et une route qui file vers le nord.",
        "end": [
          435,
          640
        ],
        "via": [
          390,
          610
        ],
        "label": "Suisse",
        "image": null
      },
      {
        "title": "Par l’Alsace",
        "text": "On remonte tranquillement par l’est de la France.",
        "end": [
          355,
          575
        ],
        "via": [
          315,
          610
        ],
        "label": "Alsace",
        "image": null
      },
      {
        "title": "Par l’Italie et l’Autriche",
        "text": "Un petit détour avant de commencer vraiment la remontée.",
        "end": [
          615,
          610
        ],
        "via": [
          485,
          740
        ],
        "label": "Italie / Autriche",
        "image": null
      }
    ]
  },
  {
    "title": "Où fait-on notre première vraie pause ?",
    "subtitle": "Quitte à traverser l’Europe, autant s’arrêter quelque part.",
    "options": [
      {
        "title": "Zurich",
        "text": "Un lac, une jolie ville et une première nuit sur la route.",
        "end": [
          464,
          595
        ],
        "via": [
          430,
          570
        ],
        "label": "Zurich",
        "image": null
      },
      {
        "title": "Strasbourg",
        "text": "Des petites rues, des maisons colorées et une étape familière.",
        "end": [
          385,
          550
        ],
        "via": [
          350,
          535
        ],
        "label": "Strasbourg",
        "image": null
      },
      {
        "title": "Munich",
        "text": "Une grande halte avant de continuer vers le nord.",
        "end": [
          532,
          547
        ],
        "via": [
          555,
          585
        ],
        "label": "Munich",
        "image": null
      }
    ]
  },
  {
    "title": "Et maintenant, par où on continue ?",
    "subtitle": "Il est temps de choisir notre chemin vers le nord de l’Europe.",
    "options": [
      {
        "title": "Hambourg et le Danemark",
        "text": "On continue tout droit vers Copenhague.",
        "end": [
          481,
          375
        ],
        "via": [
          405,
          420
        ],
        "label": "Hambourg",
        "image": null
      },
      {
        "title": "Berlin puis la Baltique",
        "text": "Une route un peu plus à l’est, au rythme des grandes villes.",
        "end": [
          570,
          409
        ],
        "via": [
          580,
          475
        ],
        "label": "Berlin",
        "image": null
      },
      {
        "title": "Prague avant de remonter",
        "text": "Parce qu’un détour peut parfois valoir le voyage.",
        "end": [
          666,
          499
        ],
        "via": [
          630,
          550
        ],
        "label": "Prague",
        "image": null
      }
    ]
  },
  {
    "title": "On s’offre une vraie pause ?",
    "subtitle": "Pas pour avancer. Juste pour profiter du voyage.",
    "options": [
      {
        "title": "Une journée à Copenhague",
        "text": "On gare le camping-car et on part découvrir la ville.",
        "end": [
          568,
          302
        ],
        "via": [
          490,
          300
        ],
        "label": "Copenhague",
        "image": null
      },
      {
        "title": "Une nuit au bord de la mer",
        "text": "Le camping-car posé près de l’eau, juste nous et l’horizon.",
        "end": [
          615,
          280
        ],
        "via": [
          640,
          340
        ],
        "label": "Bord de mer",
        "image": null
      },
      {
        "title": "Une étape en pleine nature",
        "text": "Un lac, des arbres et personne autour de nous.",
        "end": [
          615,
          235
        ],
        "via": [
          560,
          270
        ],
        "label": "Nature",
        "image": null
      }
    ]
  },
  {
    "title": "Stockholm n’est plus très loin. On termine comment ?",
    "subtitle": "Dernier choix avant l’arrivée.",
    "options": [
      {
        "title": "En longeant la côte",
        "text": "Encore un peu de mer avant d’arriver.",
        "end": [
          692,
          98
        ],
        "via": [
          745,
          225
        ],
        "label": "La côte",
        "image": null
      },
      {
        "title": "Par les lacs et les forêts",
        "text": "Une dernière route au milieu de la Suède.",
        "end": [
          692,
          98
        ],
        "via": [
          530,
          115
        ],
        "label": "Lacs et forêts",
        "image": null
      },
      {
        "title": "On file jusqu’à Stockholm",
        "text": "Cette fois, plus de détour.",
        "end": [
          692,
          98
        ],
        "via": [
          650,
          150
        ],
        "label": "Stockholm",
        "image": null
      }
    ]
  }
];
export function routeSegments(choices) {
 let start=START;
 return choices.map((choice,i)=>{const o=ROAD_STEPS[i].options[choice];const s={...o,start,d:`M ${start.join(' ')} Q ${o.via.join(' ')} ${o.end.join(' ')}`};start=o.end;return s;});
}
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// One presentation timeline, shared by the real journey and the debug snapshots.
export const ROAD_TIMING = { expand: 550, drive: 2800, arrive: 500, fadeOut: 400, fadeIn: 550 };
const T = ROAD_TIMING;
const ARRIVAL = T.expand + T.drive;
const FADE_OUT = ARRIVAL + T.arrive;
const FADE_IN = FADE_OUT + T.fadeOut;
const END = FADE_IN + T.fadeIn;
export const ROAD_PREVIEWS = [
 ['question', 'Question + mini-carte', null],
 ['selected', 'Juste après sélection', 0],
 ['large', 'Grande carte', T.expand],
 ['moving', 'Camping-car en mouvement', T.expand + T.drive / 2],
 ['arrived', 'Arrivée', ARRIVAL],
 ['transition', 'Carte → illustration', FADE_OUT + T.fadeOut / 2],
 ['illustration', 'Illustration affichée', END],
];
// Same original coordinates for the bitmap, routes, destinations and pawn.
// The crop contains every quadratic route, with room around Annecy and Stockholm.
const MAP_VIEW = '250 0 530 735';
const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => value * value * (3 - 2 * value);
export function renderRoadTrip(container, trip, save, onComplete, { previewAt = null } = {}) {
 let frame = 0, disposed = false;
 const choices = [];
 for (const value of Array.isArray(trip.choices) ? trip.choices.slice(0,5) : []) {
  if (!Number.isInteger(value) || value < 0 || value > 2) break;
  choices.push(value);
 }
 trip.choices = choices;
 if (!['choice','reveal','final'].includes(trip.phase)) trip.phase = 'choice';
 if (trip.phase === 'reveal' && !choices.length) trip.phase = 'choice';
 if (choices.length === 5 && trip.phase === 'choice') trip.phase = 'final';
 if (trip.phase === 'final' && choices.length < 5) trip.phase = 'choice';
 const cta = label => `<button type="button" class="primary-button" data-trip-next>${label}</button>`;
 const next = fn => container.querySelector('[data-trip-next]').addEventListener('click', fn, {once:true});
 const map = (stage, reveal, final) => {
  const previous = reveal ? trip.choices.slice(0,-1) : trip.choices;
  const segments = routeSegments(previous), position = segments.at(-1)?.end || START;
  const paths = segments.map(s => `<path d="${s.d}" class="stockholm-map__route"/>`).join('');
  const candidates = final ? '' : ROAD_STEPS[stage].options.map((o,i) => {
   const s = routeSegments([...previous,i]).at(-1);
   const selected = reveal && i === trip.choices[stage];
   const x = .25*position[0] + .5*o.via[0] + .25*o.end[0];
   const y = .25*position[1] + .5*o.via[1] + .25*o.end[1];
   return `<g class="stockholm-map__option stockholm-map__option--${i} ${reveal && !selected ? 'stockholm-map__option--muted' : ''}"><title>${esc(o.title)}</title><path d="${s.d}" ${selected ? 'data-trip-segment' : ''}/><circle cx="${o.end[0]}" cy="${o.end[1]}" r="7"/><g transform="translate(${x} ${y-20})"><circle r="17" class="stockholm-map__badge"/><text text-anchor="middle" dy="7">${i+1}</text></g></g>`;
  }).join('');
  return `<div class="stockholm-map"><svg viewBox="${MAP_VIEW}" role="img" aria-label="${final ? 'Notre route jusqu’à Stockholm' : reveal ? 'Segment choisi : '+esc(ROAD_STEPS[stage].options[trip.choices[stage]].title) : 'Trois routes possibles'}"><image href="${ASSETS}/map.png" width="1000" height="833"/>${paths}${candidates}<g data-trip-van transform="translate(${position.join(' ')})" aria-hidden="true"><image href="${ASSETS}/camper.png" x="-70" y="-92" width="140" height="105"/></g></svg></div>`;
 };
 const draw = (fromRect = null) => {
  cancelAnimationFrame(frame);
  if (disposed) return;
  if (!trip.started) {
   container.innerHTML = challengeIntro({ id:5, title:"À toi de nous emmener à Stockholm", subtitle:"Il n’y a pas de bonne route vers le futur.", image:`${ASSETS}/camper.png`, alt:"Camping-car devant les montagnes", copy:"Choisis simplement celle<br>qui te ressemble le plus.", label:"Choisir l’itinéraire", action:"data-trip-next", footer:"path" });
   next(() => { trip.started = true; save(); draw(); }); return;
  }
  const final = trip.phase === 'final', reveal = trip.phase === 'reveal';
  const stage = trip.choices.length - (reveal ? 1 : 0), step = ROAD_STEPS[stage];
  let body;
  if (final) body = `<h1>Voilà notre route.</h1><p>Pas forcément la plus courte.<br>Pas forcément la plus logique.<br>Mais sûrement la nôtre.</p>${map(stage,false,true)}${cta('Continuer le voyage →')}`;
  else if (reveal) {
   const o = step.options[trip.choices[stage]];
   body = `<div class="stockholm-stage">${map(stage,true,false)}<div class="stockholm-illustration" data-illustration="${stage+1}-${trip.choices[stage]+1}" aria-hidden="true">${o.image ? `<img src="${esc(o.image)}" alt="${esc(o.title)}"/>` : `<div><span>Illustration à venir</span><small>${esc(o.title)}</small></div>`}</div></div><div class="stockholm-result" hidden><h1>${esc(o.title)}</h1><p>${esc(o.text)}</p>${cta(stage===4 ? 'Voir notre route →' : 'Suivant →')}</div>${previewAt !== null ? '<button type="button" class="quiet-button stockholm-preview" data-trip-play>Lire la suite de l’animation</button>' : ''}`;
  } else {
   body = `${gameplayHeader({theme:"À toi de nous emmener à Stockholm",title:step.title,description:step.subtitle})}<div class="stockholm-overview">${map(stage,false,false)}<ol class="stockholm-destinations">${step.options.map((o,i) => `<li class="stockholm-destination--${i}">${esc(o.label)}</li>`).join('')}</ol></div><p class="kicker">ÉTAPE ${stage+1}</p><div class="choice-list">${step.options.map((o,i) => `<button type="button" class="choice" data-trip-choice="${i}">${o.title}</button>`).join('')}</div>`;
  }
  container.innerHTML = `<section class="paper-card stockholm-trip ${reveal ? 'stockholm-trip--reveal' : ''}">${body}</section>`;
  if (!fromRect) window.scrollTo(0,0);
  if (final) { next(onComplete); return; }
  if (!reveal) {
   container.querySelectorAll('[data-trip-choice]').forEach(button => button.addEventListener('click', () => {
    if (trip.phase !== 'choice' || trip.choices.length !== stage) return;
    const rect = container.querySelector('.stockholm-map').getBoundingClientRect();
    trip.choices.push(Number(button.dataset.tripChoice)); trip.phase = 'reveal'; save(); draw(rect);
   }, {once:true}));
   return;
  }
  next(() => { previewAt = null; trip.phase = trip.choices.length === 5 ? 'final' : 'choice'; save(); draw(); });
  const section = container.querySelector('.stockholm-trip');
  const mapNode = container.querySelector('.stockholm-map');
  const art = container.querySelector('.stockholm-illustration');
  const result = container.querySelector('.stockholm-result');
  const path = container.querySelector('[data-trip-segment]');
  const van = container.querySelector('[data-trip-van]');
  const length = path.getTotalLength();
  // FLIP uses measured rectangles; no device-specific coordinates or separate map.
  window.scrollTo(0,0);
  const target = mapNode.getBoundingClientRect();
  const origin = fromRect || {left:target.left,top:target.top,width:target.width*.55,height:target.height*.55};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const paint = elapsed => {
   const expanding = ease(clamp(elapsed/T.expand));
   mapNode.style.transform = `translate(${(origin.left-target.left)*(1-expanding)}px, ${(origin.top-target.top)*(1-expanding)}px) scale(${1+(origin.width/target.width-1)*(1-expanding)}, ${1+(origin.height/target.height-1)*(1-expanding)})`;
   const progress = ease(clamp((elapsed-T.expand)/T.drive));
   const point = path.getPointAtLength(length*progress);
   van.setAttribute('transform', `translate(${point.x} ${point.y})`);
   mapNode.style.opacity = 1-clamp((elapsed-FADE_OUT)/T.fadeOut);
   mapNode.style.visibility = elapsed >= FADE_IN ? 'hidden' : 'visible';
   art.style.opacity = clamp((elapsed-FADE_IN)/T.fadeIn);
   art.setAttribute('aria-hidden', String(elapsed < FADE_IN));
   result.hidden = elapsed < END;
   section.dataset.tripPresentation = elapsed < T.expand ? 'expanding' : elapsed < ARRIVAL ? 'moving' : elapsed < FADE_OUT ? 'arrived' : elapsed < FADE_IN ? 'map-out' : elapsed < END ? 'illustration-in' : 'illustration';
  };
  const play = (offset=0) => {
   cancelAnimationFrame(frame);
   const start = performance.now();
   const tick = now => {
    if (disposed) return;
    const elapsed = reduced ? END : Math.min(END,offset+now-start);
    paint(elapsed);
    if (elapsed < END) frame = requestAnimationFrame(tick);
   };
   tick(start);
  };
  // A reload of an already selected answer keeps the result, never appends a choice.
  if (previewAt !== null) {
   paint(previewAt);
   container.querySelector('[data-trip-play]').addEventListener('click', event => {
    event.currentTarget.hidden = true; play(previewAt);
   }, {once:true});
  } else if (fromRect) play();
  else paint(END);
 };
 draw();
 return () => { disposed = true; cancelAnimationFrame(frame); };
}
