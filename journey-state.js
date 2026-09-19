import { CONFIG } from "./config.js?v=1.4.63";

export const pauses = CONFIG.journeyChapters.flatMap(chapter => chapter.pause ? [chapter.pause] : []);
export const pauseAfter = id => pauses.find(pause => pause.after === id);
export const createJourneyProgress = () => ({ completedChallenges: {}, revealedMemories: {}, galleryViewed: {}, revealedScenes: {}, illustrations: {}, resumedPauses: {}, rewardStage: null });
export const activePause = state => pauses.find(pause => state.illustrations[pause.after] && !state.resumedPauses[pause.id]);
export const pauseStatus = (state, pause, now) => state.resumedPauses[pause.id] ? "RESUMED" : now >= Date.parse(pause.target) ? "READY_TO_RESUME" : "PAUSED";
export function currentChapter(state) {
  for (const id of CONFIG.routeOrder) {
    if (!state.illustrations[id]) return id;
    const pause = pauseAfter(id);
    if (pause && !state.resumedPauses[pause.id]) return null;
  }
  return null;
}
export function visibleChapters(state) {
  const result = [];
  for (const id of CONFIG.routeOrder) {
    result.push(id);
    if (!state.illustrations[id]) break;
    const pause = pauseAfter(id);
    if (pause && !state.resumedPauses[pause.id]) break;
  }
  return result;
}
export function winChallenge(state, id) {
  if (currentChapter(state) !== id || state.completedChallenges[id]) return false;
  state.completedChallenges[id] = true;
  state.rewardStage = { chapterId: id, phase: "conclusion" };
  return true;
}
export function continueConclusion(state, id) {
  if (state.rewardStage?.chapterId !== id || state.rewardStage.phase !== "conclusion") return false;
  state.rewardStage = { chapterId: id, phase: "reveal" };
  return true;
}
export function revealMemory(state) {
  if (state.rewardStage?.phase !== "reveal") return null;
  const id = state.rewardStage.chapterId;
  const first = !state.revealedMemories[id];
  state.revealedMemories[id] = true;
  state.rewardStage = null;
  return first ? id : null;
}
export function finishReward(state, id) {
  if (!state.completedChallenges[id] || !state.revealedMemories[id]) return false;
  state.galleryViewed[id] = true;
  state.illustrations[id] = true;
  return true;
}
export function resumeChapter(state, pause, now) {
  if (activePause(state)?.id !== pause.id || pauseStatus(state, pause, now) !== "READY_TO_RESUME") return false;
  state.resumedPauses[pause.id] = true;
  return true;
}
export function journeyHome(state) {
  if (state.rewardStage?.phase === "conclusion") return `conclusion-${state.rewardStage.chapterId}`;
  return activePause(state)?.id || "book-open";
}
