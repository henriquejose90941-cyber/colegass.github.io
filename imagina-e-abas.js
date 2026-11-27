function initImagina(R){
const IMGS=[];/* fotos originais: anexar o arquivo para restaurar */
const E=["🌙","🏰","🐙","🎈","🌋","🦉","🚂","🌊","🎭","🗝️","🦋","🍄","⛵","🕯️","🐉","🌵","🎪","🔮","🦊","🌈","🪐","🐚","🎻","🏔️","🕰️","🌻","🦢","🎡","🧭","🪞"];
const V=R.getElementById('v');let G,T;
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function card(i){if(i<IMGS.length)return `<div class="c" style="background:url(${IMGS[i]}) center/cover"></div>`;
const h=(i*37)%360;return `<div class="c" style="background:linear-gradient(135deg,hsl(${h} 60% 45%),hsl(${(h+70)%360} 70% 22%))"><span class="a">${E[i%30]}</span><span class="b">${E[(i*7+3)%30]}</span></div>`}
function view(h){clearInterval(T);V.innerHTML=h;window.scrollTo(0,0)}
function cards(list){return `<div class="grid" id="g">${list.map(c=>`<div class="w" data-c="${c}">${card(c)}</div>`).join('')}</div>`}
function choose(btn){let v=null;R.querySelectorAll('#g .w').forEach(w=>w.onclick=()=>{R.querySelectorAll('#g .w').forEach(x=>x.classList.remove('sel'));w.classList.add('sel');v=+w.dataset.c;btn(v)});return()=>v}
function pass(name,cb){view(`<h2>📱 Passe o aparelho para ${esc(name)}</h2><p>Os outros não devem olhar.</p><button id="go">Sou eu, mostrar</button>`);R.getElementById('go').onclick=cb}
function draw(p){if(!G.deck.length){G.deck=shuf(G.disc);G.disc=[]}p.hand.push(G.deck.pop())}
function setup(){view(`<h1>🃏 Imagina</h1><p>Jogo de associação estilo Dixit · 3 a 10 jogadores · primeiro a 30 pontos vence.</p>
<label>Nº de jogadores <input id="n" type="number" min="3" max="10" value="5"></label><div id="nm"></div><button id="st">Começar</button>`);
const n=R.getElementById('n'),nm=R.getElementById('nm');
const r=()=>{const k=Math.min(10,Math.max(3,+n.value||3));const old=[...nm.querySelectorAll('input')].map(i=>i.value);nm.innerHTML=Array.from({length:k},(_,i)=>`<input placeholder="Jogador ${i+1}" value="${esc(old[i]||'')}">`).join('')};
n.oninput=r;r();
R.getElementById('st').onclick=()=>{const k=Math.min(10,Math.max(3,+n.value||3));
G={players:[...nm.querySelectorAll('input')].map((i,x)=>({n:i.value.trim()||'Jogador '+(x+1),s:0,hand:[]})).slice(0,k),deck:shuf([...Array(60).keys()]),disc:[],st:0};
for(let i=0;i<5;i++)G.players.forEach(draw);round()}}
function round(){G.table=[];const p=G.players[G.st];pass(p.n+' (narrador)',tell)}
function tell(){const p=G.players[G.st];
view(`<h2>${esc(p.n)}, você é o narrador</h2><div class="t" id="tm">50</div><p>Escolha uma carta e escreva o que ela lembra:</p>${cards(p.hand)}<input id="cl" placeholder="Sua dica (palavra, frase, som...)" maxlength="80"><button id="ok" disabled>Confirmar</button>`);
let get=choose(()=>chk()),left=50;const cl=R.getElementById('cl'),ok=R.getElementById('ok');
const chk=()=>ok.disabled=!(get()!==null&&cl.value.trim());cl.oninput=chk;
const fin=()=>{clearInterval(T);const c=get()??p.hand[0];G.clue=cl.value.trim()||'...';p.hand=p.hand.filter(x=>x!==c);G.table=[{c,o:G.st}];G.others=G.players.map((_,i)=>i).filter(i=>i!==G.st);pickLoop(0)};
ok.onclick=fin;T=setInterval(()=>{left--;R.getElementById('tm').textContent=left;if(left<=0)fin()},1000)}
function pickLoop(k){if(k>=G.others.length){G.table=shuf(G.table);G.votes={};return voteLoop(0)}
const i=G.others[k],p=G.players[i];
pass(p.n,()=>{view(`<h2>${esc(p.n)}</h2><div class="clue">Dica: <b>${esc(G.clue)}</b></div><p>Escolha a carta da sua mão que melhor combina:</p>${cards(p.hand)}<button id="ok" disabled>Confirmar</button>`);
const get=choose(()=>R.getElementById('ok').disabled=false);
R.getElementById('ok').onclick=()=>{const c=get();p.hand=p.hand.filter(x=>x!==c);G.table.push({c,o:i});pickLoop(k+1)}})}
function voteLoop(k){if(k>=G.others.length)return result();
const i=G.others[k],p=G.players[i];
pass(p.n,()=>{const opts=G.table.filter(t=>t.o!==i).map(t=>t.c);
view(`<h2>${esc(p.n)}, vote</h2><div class="clue">Dica: <b>${esc(G.clue)}</b></div><p>Qual é a carta do narrador? (a sua está oculta)</p>${cards(opts)}<button id="ok" disabled>Votar</button>`);
const get=choose(()=>R.getElementById('ok').disabled=false);
R.getElementById('ok').onclick=()=>{G.votes[i]=get();voteLoop(k+1)}})}
function result(){const st=G.st,sc=G.players.map(()=>0);
const tc=G.table.find(t=>t.o===st).c,nv=G.others.length;
const ok=G.others.filter(i=>G.votes[i]===tc);
if(ok.length===0||ok.length===nv)G.others.forEach(i=>sc[i]+=2);else{sc[st]+=3;ok.forEach(i=>sc[i]+=3)}
G.others.forEach(i=>{const t=G.table.find(t=>t.c===G.votes[i]);if(t.o!==st)sc[t.o]+=1});
G.players.forEach((p,i)=>p.s+=sc[i]);
const show=G.table.map(t=>{const vs=G.others.filter(i=>G.votes[i]===t.c).map(i=>esc(G.players[i].n));return `<div>${card(t.c)}<small>${t.o===st?'⭐ ':''}${esc(G.players[t.o].n)}<br>${vs.length?'🗳 '+vs.join(', '):'—'}</small></div>`}).join('');
G.table.forEach(t=>G.disc.push(t.c));
const win=G.players.some(p=>p.s>=30);
view(`<h2>Resultado</h2><div class="clue">Dica: <b>${esc(G.clue)}</b></div><div class="grid">${show}</div>${G.players.map((p,i)=>`<div class="sc"><span>${esc(p.n)}</span><span>${p.s} ${sc[i]?`(+${sc[i]})`:''}</span></div>`).join('')}<button id="nx">${win?'Ver vencedor':'Próxima rodada'}</button>`);
R.getElementById('nx').onclick=()=>{if(win){const m=Math.max(...G.players.map(p=>p.s));view(`<h1>🏆 ${G.players.filter(p=>p.s===m).map(p=>esc(p.n)).join(' e ')} venceu!</h1><button id="re">Jogar de novo</button>`);R.getElementById('re').onclick=setup;return}
G.players.forEach(draw);G.st=(G.st+1)%G.players.length;round()}}
setup();
}

(function(){
 let started=false;
 function show(){
  const tabs=["mansao","imagina","quemsoueu"];
  const h=location.hash.slice(1); const t=tabs.includes(h)?h:"mansao";
  tabs.forEach(x=>{const el=document.getElementById("tab-"+x); if(el) el.hidden=t!==x;});
  document.querySelectorAll(".tabs a").forEach(a=>a.setAttribute("aria-current",a.dataset.tab===t?"page":"false"));
  if(t==="imagina"&&!started){started=true;
   const host=document.getElementById("imagina-host");const R=host.attachShadow({mode:"open"});
   R.innerHTML='<style>:host{display:block;--bg:#14121f;--fg:#f2eefc;--card:#221e35;--ac:#f5b942}*{box-sizing:border-box}.ib{background:var(--bg);color:var(--fg);font-family:system-ui,sans-serif;border-radius:12px;border:1px solid #3a2f45}#v{max-width:760px;margin:0 auto;padding:16px}h1,h2{margin:.3em 0}button{background:var(--ac);color:#1a1200;border:0;border-radius:10px;padding:12px 18px;font-size:1rem;font-weight:700;margin:10px 0;cursor:pointer}button:disabled{opacity:.4}input,textarea{width:100%;background:var(--card);color:var(--fg);border:1px solid #4a4370;border-radius:8px;padding:10px;font-size:1rem;margin:4px 0}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(105px,1fr));gap:10px;margin:12px 0}.w{border:3px solid transparent;border-radius:12px;cursor:pointer}.w.sel{border-color:var(--ac);transform:scale(1.04)}.c{aspect-ratio:2/3;border-radius:9px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}.c .a{font-size:2.6rem}.c .b{font-size:1.6rem;position:absolute;right:8px;bottom:8px}.t{font-size:2.4rem;font-weight:800;color:var(--ac);text-align:center}.clue{background:var(--card);padding:10px 14px;border-radius:10px;font-size:1.15rem}.sc{display:flex;justify-content:space-between;background:var(--card);padding:8px 12px;border-radius:8px;margin:4px 0}small{opacity:.8}</style><div class="ib"><div id="v"></div></div>';
   initImagina(R);}
 }
 window.addEventListener("hashchange",show);show();
})();
