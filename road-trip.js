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
export function renderRoadTrip(container,trip,save,onComplete) {
 let frame=0, disposed=false;
 const choices=[];
 for(const value of Array.isArray(trip.choices)?trip.choices.slice(0,5):[]) {if(!Number.isInteger(value)||value<0||value>2)break;choices.push(value);}
 trip.choices=choices;
 if(!['choice','reveal','final'].includes(trip.phase))trip.phase='choice';
 if(trip.phase==='reveal'&&!choices.length)trip.phase='choice';
 if(choices.length===5&&trip.phase==='choice')trip.phase='final';
 if(trip.phase==='final'&&choices.length<5)trip.phase='choice';
 const cta=label=>`<button type="button" class="primary-button" data-trip-next>${label}</button>`;
 const next=fn=>container.querySelector('[data-trip-next]').addEventListener('click',fn,{once:true});
 const map=(stage,reveal,final)=>{
  const segments=routeSegments(trip.choices),position=segments.at(-1)?.end||START;
  const paths=segments.map((s,i)=>`<path d="${s.d}" class="stockholm-map__route ${reveal&&i===segments.length-1?'stockholm-map__route--active':''}" ${reveal&&i===segments.length-1?'data-trip-segment':''}/>`).join('');
  const candidates=!reveal&&!final?ROAD_STEPS[stage].options.map((o,i)=>{
   const s=routeSegments([...trip.choices,i]).at(-1),x=.25*position[0]+.5*o.via[0]+.25*o.end[0],y=.25*position[1]+.5*o.via[1]+.25*o.end[1];
   return `<g class="stockholm-map__option stockholm-map__option--${i}"><title>${esc(o.title)}</title><path d="${s.d}"/><text x="${x}" y="${y-12}" text-anchor="middle">${esc(o.label)}</text></g>`;
  }).join(''):'';
  return `<div class="stockholm-map"><img src="${ASSETS}/map.png" alt="Carte illustrée d’Annecy à Stockholm"/><svg viewBox="0 0 1000 833" role="img" aria-label="${final?'Notre route jusqu’à Stockholm':reveal?'Segment choisi : '+esc(segments.at(-1).title):'Trois routes possibles'}">${paths}${candidates}<g data-trip-van transform="translate(${position.join(' ')})" aria-hidden="true"><rect x="-18" y="-15" width="30" height="20" rx="3" fill="#fff8e8" stroke="#473a2e" stroke-width="3"/><path d="M 12 -8 H 21 L 27 0 V 5 H 12 Z" fill="#e9cf9d" stroke="#473a2e" stroke-width="3"/><path d="M -12 -10 H 5 V -3 H -12 Z" fill="#94b7bf"/><circle cx="-10" cy="7" r="5" fill="#473a2e"/><circle cx="18" cy="7" r="5" fill="#473a2e"/></g></svg></div>`;
 };
 const draw=(animate=false)=>{
  cancelAnimationFrame(frame);if(disposed)return;
  window.scrollTo(0, 0);
  if(!trip.started){container.innerHTML=challengeIntro({ id: 5, title: "À toi de nous emmener à Stockholm", subtitle: "Il n’y a pas de bonne route vers le futur.", image: `${ASSETS}/camper.png`, alt: "Camping-car devant les montagnes", copy: "Choisis simplement celle<br>qui te ressemble le plus.", label: "Choisir l’itinéraire", action: "data-trip-next", footer: "path" });next(()=>{trip.started=true;save();draw();});return;}
  const final=trip.phase==='final',reveal=trip.phase==='reveal',stage=trip.choices.length-(reveal?1:0),step=ROAD_STEPS[stage];let body;
  if(final)body=`<h1>Voilà notre route.</h1><p>Pas forcément la plus courte.<br>Pas forcément la plus logique.<br>Mais sûrement la nôtre.</p>${map(stage,false,true)}${cta('Continuer le voyage →')}`;
  else if(reveal){const o=step.options[trip.choices[stage]];body=`${map(stage,true,false)}<div class="stockholm-illustration" data-illustration="${stage+1}-${trip.choices[stage]+1}">${o.image?`<img src="${esc(o.image)}" alt="${esc(o.title)}"/>`:'<span>Illustration à venir</span>'}</div><h1>${esc(o.title)}</h1><p>${esc(o.text)}</p>${cta(stage===4?'Voir notre route →':'Suivant →')}`;}
  else body=`${gameplayHeader({ theme: "À toi de nous emmener à Stockholm", title: step.title, description: step.subtitle })}${map(stage,false,false)}<p class="kicker">ÉTAPE ${stage+1}</p><div class="choice-list">${step.options.map((o,i)=>`<button type="button" class="choice" data-trip-choice="${i}">${o.title}</button>`).join('')}</div>`;
  container.innerHTML=`<section class="paper-card screen stockholm-trip">${body}</section>`;
  if(final)next(onComplete);
  else if(reveal){next(()=>{trip.phase=trip.choices.length===5?'final':'choice';save();draw();});
   if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const path=container.querySelector('[data-trip-segment]'),van=container.querySelector('[data-trip-van]'),length=path.getTotalLength(),startTime=performance.now();const move=now=>{if(disposed)return;const progress=Math.min(1,(now-startTime)/1000),point=path.getPointAtLength(length*progress);van.setAttribute('transform',`translate(${point.x} ${point.y})`);if(progress<1)frame=requestAnimationFrame(move);};move(startTime);}
  } else container.querySelectorAll('[data-trip-choice]').forEach(button=>button.addEventListener('click',()=>{if(trip.phase!=='choice'||trip.choices.length!==stage)return;trip.choices.push(Number(button.dataset.tripChoice));trip.phase='reveal';save();draw(true);},{once:true}));
 };
 draw();return()=>{disposed=true;cancelAnimationFrame(frame);};
}
