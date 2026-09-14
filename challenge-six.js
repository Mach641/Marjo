import { gameplayHeader } from "./gameplay-header.js?v=1.4.23";
import { challengeIntro } from "./challenge-intro.js?v=1.4.19";

export const DEBATE_QUESTIONS = [
  { presenter: "Lenny", recipient: "Maman", minutes: 1, prompt: "Qui gagnerait entre Voldemort et Dumbledore s’ils étaient tous les deux au sommet de leur forme ? Et pourquoi ?" },
  { presenter: "Lenny", recipient: "Papa", minutes: 1, prompt: "Qui gagnerait entre D’Artagnan et Edmond Dantès ? Et pourquoi ?" },
  { presenter: "Milan", recipient: "Maman", minutes: 2, prompt: "Si Harry, Ron et Hermione n’avaient pas été à Gryffondor, dans quelle maison aurait été chacun d’eux ? Et pourquoi ?" },
  { presenter: "Lenny", recipient: "Papa", minutes: 1, prompt: "Est-ce qu’Edmond Dantès est vraiment un héros, ou est-ce qu’il va beaucoup trop loin pour se venger ?" },
  { presenter: "Milan", recipient: "Papa", minutes: 2, prompt: "Une armée de 10 000 soldats attaque le château que tu dois défendre. Tu peux choisir trois personnages de fiction pour t’aider, mais aucun ne doit avoir de super-pouvoir. Qui tu prends, et pourquoi ?" },
  { presenter: "Milan", recipient: "Maman", minutes: 2, prompt: "Si tu devais garder trois sorts de l’univers de Harry Potter pour pouvoir les utiliser dans la vraie vie, lesquels choisirais-tu et pourquoi ?" },
  { presenter: "Lenny", recipient: "Maman", minutes: 2, prompt: "Parmi tous les dessins animés Disney, quels sont selon toi les trois méchants les plus méchants ? Et pourquoi ?" },
  { presenter: "Milan", recipient: "Maman", minutes: 2, prompt: "Si tu pouvais changer la fin d’un seul film, lequel choisirais-tu et qu’est-ce que tu changerais ?" },
  { presenter: "Lenny", recipient: "Papa", minutes: 1, prompt: "Des extraterrestres débarquent sur Terre. Ils ont une seule exigence : quelqu’un doit leur chanter une chanson. Qui est-ce qu’on envoie, quelle chanson il ou elle chante, et pourquoi ?" },
  { presenter: "Milan", recipient: "Papa", minutes: 1, prompt: "Battle de rap : Eminem contre Joe Dassin. Qui gagne… et surtout, comment ?" },
  { presenter: "Milan", recipient: "Maman", minutes: 1, prompt: "Battle de rap : Booba contre Charles Aznavour. Qui gagne… et surtout, comment ?" },
  { presenter: "Lenny", recipient: "Papa", minutes: 2, prompt: "Tu peux choisir n’importe quel personnage de l’Histoire pour passer une journée avec nous quatre. Qui tu invites, qu’est-ce qu’on fait avec lui, et pourquoi ?" },
  { presenter: "Milan", recipient: "Maman", minutes: 2, prompt: "Demain, Netflix t’appelle pour créer ta propre série. Quelle histoire voudrais-tu créer et raconter au monde ?" },
  { presenter: "Lenny", recipient: "Papa", minutes: 1, prompt: "Si tu pouvais supprimer une seule règle dans un sport pour le rendre plus amusant, laquelle tu enlèverais ? Et pourquoi ?" },
];

export const CHALLENGE_SIX_PREVIEWS = [
  ["d6-intro", "D6 — introduction"],
  ["d6-read-1", "D6 — lecture · 1 minute"],
  ["d6-read-2", "D6 — lecture · 2 minutes"],
  ["d6-timer", "D6 — chrono actif"],
  ["d6-expiring", "D6 — chrono à 00:02"],
  ["d6-rating-vincent", "D6 — notation par Vincent"],
  ["d6-rating-marjolaine", "D6 — notation par Marjolaine"],
  ["d6-last", "D6 — dernière question"],
];

const initialProgress = () => ({ phase: "intro", questionIndex: 0, notes: [], endAt: null, selectedScore: null });

export function renderChallengeSix(container, progress, save, complete) {
  let interval = null;
  let disposed = false;
  const validPhases = new Set(["intro", "read", "timer", "rating"]);
  const legacy = Array.isArray(progress.answers) || !validPhases.has(progress.phase) || !Array.isArray(progress.notes);
  if (legacy) {
    Object.assign(progress, initialProgress());
    delete progress.answers;
    delete progress.revealed;
    save();
  }
  progress.questionIndex = Math.max(0, Math.min(DEBATE_QUESTIONS.length - 1, Number(progress.questionIndex) || 0));
  progress.notes = progress.notes.slice(0, progress.questionIndex);

  const clearClock = () => { clearInterval(interval); interval = null; };
  const change = phase => {
    clearClock();
    progress.phase = phase;
    if (phase !== "timer") progress.endAt = null;
    if (phase !== "rating") progress.selectedScore = null;
    save();
    draw();
  };
  const questionHeader = question => gameplayHeader({
    theme: `Question ${progress.questionIndex + 1} sur ${DEBATE_QUESTIONS.length} · posée par ${question.presenter}`,
    title: question.prompt,
    description: `Pour ${question.recipient}`,
    compact: progress.phase !== "read",
  });
  const finishAnswer = () => change("rating");

  const draw = () => {
    if (disposed) return;
    clearClock();
    window.scrollTo(0, 0);
    const question = DEBATE_QUESTIONS[progress.questionIndex];
    if (progress.phase === "timer" && (!Number.isFinite(progress.endAt) || progress.endAt <= Date.now())) {
      progress.phase = "rating";
      progress.endAt = null;
      progress.selectedScore = null;
      save();
    }

    if (progress.phase === "intro") {
      container.innerHTML = challengeIntro({
        id: 6,
        title: "À vous de les convaincre",
        subtitle: "Les questions de Lenny et Milan.",
        image: "assets/challenge-6/v1-4-15/wizards.png",
        alt: "Dumbledore et Gandalf croisent leurs baguettes",
        copy: "Lenny et Milan ont quelques questions.<br>Certaines méritent une vraie réponse.<br>D’autres… probablement pas.<br><br>Tu auras 1 ou 2 minutes pour défendre ton idée.<br>Puis l’autre décidera s’il est convaincu.",
        label: "Commencer",
        action: "data-six-start",
        footer: "balloon",
      });
      container.querySelector("[data-six-start]")?.addEventListener("click", () => change("read"), { once: true });
      return;
    }

    if (progress.phase === "read") {
      container.innerHTML = `<section class="paper-card screen challenge-six challenge-six--read">${questionHeader(question)}
        <p class="challenge-six__allowance">${question.minutes} minute${question.minutes > 1 ? "s" : ""} pour convaincre</p>
        <button class="d1-handover__cta challenge-six__primary" type="button" data-six-launch>Lancer le chrono</button>
      </section>`;
      container.querySelector("[data-six-launch]")?.addEventListener("click", () => {
        progress.endAt = Date.now() + question.minutes * 60000;
        progress.phase = "timer";
        save();
        draw();
      }, { once: true });
      return;
    }

    if (progress.phase === "timer") {
      container.innerHTML = `<section class="paper-card screen challenge-six challenge-six--timer">${questionHeader(question)}
        <output class="challenge-six__timer" role="timer" aria-live="off">${question.minutes}:00</output>
        <button class="secondary-button challenge-six__secondary" type="button" data-six-finished>J’ai fini</button>
      </section>`;
      const output = container.querySelector(".challenge-six__timer");
      const updateClock = () => {
        const remaining = Math.max(0, Math.ceil((progress.endAt - Date.now()) / 1000));
        output.textContent = `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;
        if (remaining === 0) finishAnswer();
      };
      updateClock();
      interval = setInterval(updateClock, 250);
      container.querySelector("[data-six-finished]")?.addEventListener("click", finishAnswer, { once: true });
      return;
    }

    const rater = question.recipient === "Maman" ? "Vincent" : "Marjolaine";
    const ratingPrompt = question.recipient === "Maman"
      ? "Vincent, Marjolaine t’a-t-elle convaincu ?"
      : "Marjolaine, Vincent t’a-t-il convaincue ?";
    container.innerHTML = `<section class="paper-card screen challenge-six challenge-six--rating">${gameplayHeader({ theme: `Question ${progress.questionIndex + 1} sur ${DEBATE_QUESTIONS.length}`, title: ratingPrompt, description: `À ${rater} de noter` })}
      <div class="challenge-six__ratings" role="radiogroup" aria-label="Note de 0 à 10">
        ${Array.from({ length: 11 }, (_, score) => `<button type="button" role="radio" aria-checked="${progress.selectedScore === score}" class="challenge-six__rating${progress.selectedScore === score ? " is-selected" : ""}" data-six-score="${score}">${score}</button>`).join("")}
      </div>
      <button class="d1-handover__cta challenge-six__primary" type="button" data-six-rate ${progress.selectedScore === null ? "disabled" : ""}>Valider la note</button>
    </section>`;
    container.querySelectorAll("[data-six-score]").forEach(node => node.addEventListener("click", () => {
      progress.selectedScore = Number(node.dataset.sixScore);
      save();
      draw();
    }));
    container.querySelector("[data-six-rate]")?.addEventListener("click", () => {
      if (!Number.isInteger(progress.selectedScore)) return;
      progress.notes.push({ question: progress.questionIndex + 1, score: progress.selectedScore, ratedBy: rater });
      progress.questionIndex += 1;
      progress.selectedScore = null;
      if (progress.questionIndex === DEBATE_QUESTIONS.length) {
        progress.phase = "done";
        save();
        complete();
      } else change("read");
    }, { once: true });
  };

  draw();
  return () => { disposed = true; clearClock(); };
}
