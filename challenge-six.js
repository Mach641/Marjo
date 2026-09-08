import { gameplayHeader } from "./gameplay-header.js?v=1.4.23";
import { challengeIntro } from "./challenge-intro.js?v=1.4.19";
// Les quatre images de thème seront fournies ultérieurement.
export const THEMES = [
  {
    "title": "Magie / Histoire / Les deux",
    "options": [
      "Magie",
      "Histoire",
      "Les deux"
    ],
    "questions": [
      {
        "prompt": "Nicolas Flamel",
        "answer": "Les deux",
        "reveal": "Nicolas Flamel a réellement vécu au XIVe siècle. Ce sont des légendes postérieures qui en ont fait un alchimiste capable de créer la pierre philosophale."
      },
      {
        "prompt": "La pierre philosophale",
        "answer": "Les deux",
        "reveal": "Objet mythique de l’alchimie pendant des siècles, elle est ensuite devenue un incontournable de la fantasy."
      },
      {
        "prompt": "Les procès de sorcières de Salem",
        "answer": "Histoire",
        "reveal": "Les procès ont réellement eu lieu en 1692 et ont conduit à l’exécution de plusieurs personnes."
      },
      {
        "prompt": "Excalibur",
        "answer": "Magie",
        "reveal": "L’épée appartient à la légende arthurienne. On n’a aucune preuve historique de son existence."
      },
      {
        "prompt": "L’Ordre des Templiers",
        "answer": "Histoire",
        "reveal": "Un véritable ordre religieux et militaire, auquel des siècles de légendes ont ensuite attribué toutes sortes de secrets."
      },
      {
        "prompt": "Merlin",
        "answer": "Magie",
        "reveal": "Le Merlin que nous connaissons appartient surtout à la légende, même si certains éléments pourraient être inspirés de personnages plus anciens."
      }
    ],
    "image": null
  },
  {
    "title": "Harry Potter / Le Seigneur des Anneaux / Les deux",
    "options": [
      "Harry Potter",
      "Le Seigneur des Anneaux",
      "Les deux"
    ],
    "questions": [
      {
        "prompt": "Une araignée géante terrifiante",
        "answer": "Les deux",
        "reveal": "Aragog d’un côté, Shelob de l’autre."
      },
      {
        "prompt": "Un vieux sorcier barbu qui guide les héros",
        "answer": "Les deux",
        "reveal": "Dumbledore et Gandalf : probablement l’une des comparaisons les plus évidentes entre les deux sagas."
      },
      {
        "prompt": "Un anneau capable de rendre invisible",
        "answer": "Le Seigneur des Anneaux",
        "reveal": "Celui-là appartient à Tolkien. Harry possède, lui, une cape d’invisibilité."
      },
      {
        "prompt": "Une cape qui rend invisible",
        "answer": "Harry Potter",
        "reveal": "À Poudlard, l’invisibilité passe plutôt par la garde-robe."
      },
      {
        "prompt": "Des arbres capables de parler ou de se déplacer",
        "answer": "Les deux",
        "reveal": "Les Ents chez Tolkien ; le Saule Cogneur et d’autres arbres magiques dans Harry Potter."
      },
      {
        "prompt": "Un grand méchant dont le pouvoir survit tant qu’une partie de lui subsiste ailleurs",
        "answer": "Les deux",
        "reveal": "Sauron et son Anneau d’un côté, Voldemort et ses Horcruxes de l’autre.\nCoïncidence ? Inspiration ? Le débat peut commencer."
      }
    ],
    "image": null
  },
  {
    "title": "Réel / Fiction / Inspiré du réel",
    "options": [
      "Réel",
      "Fiction",
      "Inspiré du réel"
    ],
    "questions": [
      {
        "prompt": "D’Artagnan",
        "answer": "Réel",
        "reveal": "Charles de Batz de Castelmore, dit d’Artagnan, a réellement servi Louis XIV. Dumas a largement romancé sa vie."
      },
      {
        "prompt": "Athos",
        "answer": "Inspiré du réel",
        "reveal": "Dumas s’est inspiré d’un véritable mousquetaire : Armand de Sillègue d’Athos d’Autevielle."
      },
      {
        "prompt": "Le cardinal de Richelieu",
        "answer": "Réel",
        "reveal": "Armand Jean du Plessis de Richelieu a réellement dirigé la politique française sous Louis XIII."
      },
      {
        "prompt": "Milady de Winter",
        "answer": "Fiction",
        "reveal": "La redoutable espionne est essentiellement une création romanesque de Dumas."
      },
      {
        "prompt": "Le comte de Monte-Cristo",
        "answer": "Inspiré du réel",
        "reveal": "Edmond Dantès est fictif, mais Dumas s’est notamment inspiré d’une histoire rapportée dans les archives de Jacques Peuchet."
      },
      {
        "prompt": "Robin des Bois",
        "answer": "Inspiré du réel",
        "reveal": "Aucun Robin des Bois historique n’est identifié avec certitude, mais la légende pourrait agréger plusieurs personnages et traditions médiévales."
      }
    ],
    "image": null
  },
  {
    "title": "Papa / Maman / Les deux",
    "options": [
      "Papa",
      "Maman",
      "Les deux"
    ],
    "questions": [
      {
        "prompt": "Savoir reconnaître Poudlard en moins d’une seconde.",
        "answer": "Maman",
        "reveal": ""
      },
      {
        "prompt": "Être capable de raconter pendant vingt minutes l’histoire d’un château qu’on vient juste de croiser.",
        "answer": "Papa",
        "reveal": ""
      },
      {
        "prompt": "Penser qu’une très bonne histoire mérite parfois de se coucher beaucoup trop tard.",
        "answer": "Les deux",
        "reveal": ""
      },
      {
        "prompt": "Imaginer qu’une vieille forêt cache forcément quelque chose d’extraordinaire.",
        "answer": "Maman",
        "reveal": ""
      },
      {
        "prompt": "Considérer qu’on peut parfaitement apprendre l’Histoire grâce à un jeu vidéo.",
        "answer": "Papa",
        "reveal": ""
      },
      {
        "prompt": "Leur avoir donné envie de découvrir des mondes qui n’étaient pas les leurs.",
        "answer": "Les deux",
        "reveal": ""
      }
    ],
    "image": null
  }
];
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderChallengeSix(container, progress, save, complete) {
  progress.answers = Array.isArray(progress.answers) ? progress.answers.slice(0,24) : [];
  if (!['intro','question','illustration','theme'].includes(progress.phase)) progress.phase = 'intro';
  const button = label => `<button class="primary-button" type="button" data-six-next>${label}</button>`;
  const next = handler => container.querySelector('[data-six-next]')?.addEventListener('click', handler, { once: true });
  const change = phase => { progress.phase = phase; save(); draw(); };
  const draw = () => {
    window.scrollTo(0,0);
    const count = progress.answers.length;
    const revealed = progress.phase === 'question' && progress.revealed;
    const index = Math.min(23, count - (revealed ? 1 : 0));
    const themeIndex = progress.phase === 'illustration' ? Math.max(0, Math.ceil(count / 6)-1) : Math.floor(index / 6);
    const theme = THEMES[themeIndex];
    let body;
    if (progress.phase === 'intro') {
      body = challengeIntro({ id: 6, title: "Magie, histoire…<br>ou les deux ?", subtitle: "Les mondes que l’on partage.", image: "assets/challenge-6/v1-4-15/wizards.png", alt: "Dumbledore et Gandalf croisent leurs baguettes", copy: "Quatre thèmes pour explorer<br>les univers transmis aux enfants.", label: "Commencer le quiz", action: "data-six-next", footer: "balloon" });
    } else if (progress.phase === 'illustration') {
      body = `<p class="kicker">THÈME ${themeIndex+1} · TERMINÉ</p><h1>${theme.title}</h1><div class="challenge-six__illustration" data-six-illustration="${themeIndex+1}">${theme.image ? `<img src="${esc(theme.image)}" alt="Illustration du thème ${themeIndex+1}"/>` : `<span>Illustration digitale ${themeIndex+1}<br>À venir</span>`}</div>${button('Continuer')}`;
    } else if (progress.phase === 'theme') {
      body = `<p class="kicker">THÈME ${themeIndex+1}</p><h1>${theme.title}</h1><p>Six nouvelles questions.</p>${button('Commencer ce thème')}`;
    } else {
      const question = theme.questions[index % 6];
      const selected = revealed ? progress.answers[index] : null;
      const correct = selected === question.answer;
      body = `${revealed ? `<p class="kicker">${theme.title}</p>` : gameplayHeader({ theme: theme.title, title: question.prompt })}<div class="challenge-six__dots" aria-label="Question ${index%6+1} sur 6">${Array.from({length:6},(_,i)=>`<span class="${i===index%6?'is-current':''}" aria-hidden="true"></span>`).join('')}</div>${revealed ? `<h1>${question.prompt}</h1>` : ""}<div class="choice-list">${theme.options.map((o,i)=>`<button class="choice ${selected===o?'challenge-six__selected':''}" type="button" data-six-choice="${i}" ${revealed?'disabled':''}>${o}</button>`).join('')}</div>${revealed?`<div class="challenge-six__feedback" role="status"><p><strong>${correct?'Bien vu !':'Pas tout à fait.'}</strong><br>La réponse : ${question.answer}.</p>${question.reveal?`<p>${esc(question.reveal).replaceAll('\n','<br>')}</p>`:''}</div>${button('Suivant')}`:''}`;
    }
    container.innerHTML = progress.phase === 'intro' ? body : `<section class="paper-card screen challenge-six">${body}</section>`;
    if (progress.phase === 'intro' || progress.phase === 'theme') next(()=>change('question'));
    else if (progress.phase === 'illustration') next(()=>{if(count===24)complete();else change('theme');});
    else if (revealed) next(()=>{progress.revealed=false;change(count%6===0?'illustration':'question');});
    else container.querySelectorAll('[data-six-choice]').forEach(node=>node.addEventListener('click',()=>{
      if(progress.revealed || progress.answers.length!==count)return;
      progress.answers.push(theme.options[Number(node.dataset.sixChoice)]);progress.revealed=true;save();draw();
    },{once:true}));
  };
  draw();
}
