export const SIZE = 10;
const DIRECTIONS = { up: [0,-1], down: [0,1], left: [-1,0], right: [1,0] };
const same = (a,b) => a[0]===b[0] && a[1]===b[1];
export function placeApple(body, random = Math.random) {
  const free=[];
  for(let y=0;y<SIZE;y++) for(let x=0;x<SIZE;x++) if(!body.some(p=>same(p,[x,y]))) free.push([x,y]);
  return free[Math.floor(random()*free.length)] || null;
}
export function createGame(random = Math.random) {
  const body=[[4,5],[3,5],[2,5]];
  return { body, direction: 'right', pending: null, apple: placeApple(body,random), score: 0, status: 'playing' };
}
export function turn(game, direction) {
  if(game.status!=='playing'||game.pending||!DIRECTIONS[direction]) return;
  const a=DIRECTIONS[game.direction],b=DIRECTIONS[direction];
  if(a[0]+b[0]===0&&a[1]+b[1]===0) return;
  if(direction!==game.direction) game.pending=direction;
}
export function tick(game, random = Math.random) {
  if(game.status!=='playing') return;
  game.direction=game.pending||game.direction;game.pending=null;
  const d=DIRECTIONS[game.direction],head=[game.body[0][0]+d[0],game.body[0][1]+d[1]];
  const eating=same(head,game.apple);
  const occupied=eating?game.body:game.body.slice(0,-1);
  if(head.some(v=>v<0||v>=SIZE)||occupied.some(p=>same(p,head))) {game.status='lost';return;}
  game.body.unshift(head);
  if(eating) {game.score++;if(game.score===10){game.status='won';game.apple=null;}else game.apple=placeApple(game.body,random);}
  else game.body.pop();
}
export function renderFamilyGame(container,onComplete) {
  let timer=null,game=null,disposed=false;
  const stop=()=>{clearInterval(timer);timer=null;};
  const draw=()=>{
    const board=container.querySelector('.snake-board');
    board.innerHTML=game.body.map((p,i)=>`<span class="snake-piece ${i===0?'snake-piece--head':''}" style="grid-column:${p[0]+1};grid-row:${p[1]+1}" aria-hidden="true">${i===0?'••':'✦'}</span>`).join('')+(game.apple?`<span class="snake-apple" style="grid-column:${game.apple[0]+1};grid-row:${game.apple[1]+1}" aria-hidden="true"></span>`:'');
    container.querySelector('[data-snake-score]').textContent=`Pommes ${game.score} / 10`;
    if(game.status==='lost') {
      stop();container.querySelectorAll('[data-direction]').forEach(b=>b.disabled=true);
      container.querySelector('[data-snake-message]').innerHTML='<p>Le serpent s’est arrêté.</p><button type="button" class="primary-button" data-replay>Rejouer</button>';
      container.querySelector('[data-replay]').addEventListener('click',start,{once:true});
    } else if(game.status==='won') {stop();onComplete();}
  };
  const advance=()=>{if(disposed||document.hidden)return;tick(game);draw();};
  const start=()=>{
    stop();game=createGame();
    container.innerHTML=`<p>Manger 10 pommes pour gagner.</p><div class="snake-board" role="img" aria-label="Grille Snake de 10 cases sur 10"></div><p class="snake-score" data-snake-score aria-live="polite"></p><div class="snake-controls" aria-label="Direction du serpent">${[['up','↑','Haut'],['left','←','Gauche'],['right','→','Droite'],['down','↓','Bas']].map(([key,arrow,label])=>`<button type="button" class="secondary-button snake-control snake-control--${key}" data-direction="${key}" aria-label="${label}">${arrow}</button>`).join('')}</div><div data-snake-message role="status"></div>`;
    container.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>turn(game,b.dataset.direction)));
    draw();timer=setInterval(advance,300);
  };
  start();return()=>{disposed=true;stop();};
}
