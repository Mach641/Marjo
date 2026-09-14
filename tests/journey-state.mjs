import assert from 'node:assert/strict';
import { CONFIG } from '../config.js';
import { createJourneyProgress, currentChapter, visibleChapters, winChallenge, continueConclusion, revealMemory, finishReward, pauseAfter, activePause, pauseStatus, resumeChapter, journeyHome } from '../journey-state.js';
const order = [1,2,3,5,6,7,8,4];
assert.deepEqual(CONFIG.routeOrder, order);
let state = createJourneyProgress();
for (const [index,id] of order.entries()) {
  assert.equal(currentChapter(state),id);
  assert.deepEqual(visibleChapters(state),order.slice(0,index+1));
  for(const future of order.slice(index+1)) assert.equal(winChallenge(state,future),false);
  assert.equal(finishReward(state,id),false);
  assert.equal(winChallenge(state,id),true);
  assert.equal(winChallenge(state,id),false);
  state=JSON.parse(JSON.stringify(state));
  assert.equal(journeyHome(state),`conclusion-${id}`);
  assert.equal(revealMemory(state),null);
  assert.equal(continueConclusion(state,id),true);
  assert.equal(finishReward(state,id),false);
  assert.equal(revealMemory(state),id);
  assert.equal(revealMemory(state),null);
  assert.deepEqual(visibleChapters(state),order.slice(0,index+1));
  assert.equal(finishReward(state,id),true);
  const pause=pauseAfter(id);
  if(pause) {
    const target=Date.parse(pause.target);
    assert.ok(Number.isFinite(target));
    assert.equal(activePause(state).id,pause.id);
    assert.equal(currentChapter(state),null);
    assert.equal(pauseStatus(state,pause,target-1),'PAUSED');
    assert.equal(resumeChapter(state,pause,target-1),false);
    state=JSON.parse(JSON.stringify(state));
    assert.equal(pauseStatus(state,pause,target),'READY_TO_RESUME');
    assert.equal(pauseStatus(state,pause,target+86400000),'READY_TO_RESUME');
    assert.equal(currentChapter(state),null); // Time alone does not expose the next back.
    assert.equal(resumeChapter(state,pause,target),true);
    assert.equal(resumeChapter(state,pause,target),false);
    state=JSON.parse(JSON.stringify(state));
    assert.equal(pauseStatus(state,pause,target-86400000),'RESUMED');
  }
  assert.equal(currentChapter(state),order[index+1]??null);
}
assert.deepEqual(visibleChapters(state),order);
assert.equal(activePause(state),undefined);
assert.deepEqual(Object.keys(state.revealedMemories).map(Number).sort((a,b)=>a-b),[1,2,3,4,5,6,7,8]);
console.log('Order, guarded transitions, persisted stages, absolute pause boundaries and one-shot reveal: OK');
