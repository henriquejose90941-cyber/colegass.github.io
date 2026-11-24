(function(){
"use strict";

const TILES = {
  causa:  {n:"Causa da morte", o:["Asfixia","Hemorragia","Envenenamento","Queimadura","Terror súbito","Afogamento"]},
  local:  {n:"Local do corpo", o:["Porão","Capela","Sótão","Cemitério da família","Bosque","Banheiro"]},
  odor:   {n:"Odor no ar", o:["Enxofre","Incenso","Podridão","Flores","Fumaça","Ferrugem"]},
  som:    {n:"Som ouvido", o:["Sussurros","Risadas","Choro","Sinos","Batidas na parede","Silêncio absoluto"]},
  temp:   {n:"Temperatura", o:["Frio cortante","Calor sufocante","Umidade","Ar seco","Oscilante","Normal"]},
  marca:  {n:"Marca no corpo", o:["Arranhões","Queimaduras","Símbolos","Hematomas","Perfurações","Nenhuma"]},
  luz:    {n:"Luz no local", o:["Velas apagadas","Lâmpadas piscando","Escuridão total","Luar","Chamas","Luz avermelhada"]},
  hora:   {n:"Hora da morte", o:["Meia-noite","Três da manhã","Crepúsculo","Amanhecer","Lua cheia","Eclipse"]},
  reflexo:{n:"Superfícies", o:["Espelhos quebrados","Água turva","Vidro embaçado","Retratos virados","Parede rachada","Intactas"]},
  animal: {n:"Animal presente", o:["Corvos","Gato preto","Ratos","Mariposas","Cães uivando","Nenhum"]},
  estado: {n:"Estado do corpo", o:["Rígido","Ressecado","Encharcado","Pálido","Contorcido","Sereno"]},
  vitima: {n:"Antes de morrer", o:["Não dormia","Falava sozinha","Andava dormindo","Temia espelhos","Rezava sem parar","Isolou-se"]}
};
const SCENE_KEYS = ["odor","som","temp","marca","luz","hora","reflexo","animal","estado","vitima"];

const MEANS = [
  {n:"Boneco de vodu", e:"🪆", t:["causa:1","marca:4","vitima:0","som:0"]},
  {n:"Faca cerimonial", e:"🗡️", t:["causa:1","marca:2","luz:0","odor:5"]},
  {n:"Corda de enforcado", e:"🪢", t:["causa:0","marca:3","estado:4","local:2"]},
  {n:"Espelho amaldiçoado", e:"🪞", t:["causa:4","reflexo:0","vitima:3","luz:1"]},
  {n:"Tábua Ouija", e:"🔤", t:["causa:4","som:0","vitima:1","hora:1"]},
  {n:"Vela negra", e:"🕯️", t:["causa:3","luz:4","odor:4","marca:1"]},
  {n:"Beladona", e:"🌿", t:["causa:2","odor:3","estado:3","local:4"]},
  {n:"Água benta profanada", e:"💧", t:["causa:5","estado:2","reflexo:1","local:5"]},
  {n:"Livro dos mortos", e:"📕", t:["causa:4","marca:2","som:4","local:0"]},
  {n:"Adaga de prata", e:"🔪", t:["causa:1","hora:4","animal:4","marca:4"]},
  {n:"Sal negro", e:"🧂", t:["causa:2","odor:0","temp:3","estado:1"]},
  {n:"Caixa de música", e:"🎶", t:["causa:4","som:1","vitima:2","local:2"]},
  {n:"Retrato possuído", e:"🖼️", t:["causa:0","reflexo:3","temp:0","vitima:5"]},
  {n:"Sino fúnebre", e:"🔔", t:["causa:4","som:3","local:1","hora:0"]},
  {n:"Incensário profano", e:"⚱️", t:["causa:0","odor:1","temp:1","luz:5"]},
  {n:"Cálice de sangue", e:"🍷", t:["causa:2","odor:5","local:1","estado:3"]}
];
const CLUES = [
  {n:"Cinzas", e:"🌫️", t:["luz:4","odor:4","temp:1","estado:1"]},
  {n:"Pena de corvo", e:"🪶", t:["animal:0","hora:2","local:3"]},
  {n:"Cera negra", e:"⚫", t:["luz:0","marca:1","local:1"]},
  {n:"Mecha de cabelo", e:"➰", t:["marca:0","estado:4","vitima:0"]},
  {n:"Dente humano", e:"🦷", t:["local:3","animal:2","estado:1"]},
  {n:"Fotografia antiga", e:"📷", t:["reflexo:3","vitima:5","temp:0"]},
  {n:"Terra de cova", e:"⚰️", t:["local:3","odor:2","temp:2"]},
  {n:"Pétala murcha", e:"🥀", t:["odor:3","hora:3","estado:3"]},
  {n:"Sangue seco", e:"🩸", t:["odor:5","marca:4","hora:1"]},
  {n:"Pegadas molhadas", e:"👣", t:["local:5","estado:2","temp:2","reflexo:1"]},
  {n:"Unhas arrancadas", e:"💅", t:["marca:0","som:2","estado:4"]},
  {n:"Rosário partido", e:"📿", t:["vitima:4","local:1","som:3"]},
  {n:"Pelo de gato preto", e:"🐈‍⬛", t:["animal:1","hora:0","luz:3"]},
  {n:"Asa de mariposa", e:"🦋", t:["animal:3","luz:2","temp:4"]},
  {n:"Diário rasgado", e:"📓", t:["vitima:1","som:0","local:2"]},
  {n:"Moeda antiga", e:"🪙", t:["local:0","temp:0","animal:2"]}
];
const PEOPLE = [
  {n:"Helena Vasconcelos", r:"médium da família", e:"🔮"},
  {n:"Padre Augusto", r:"capelão da mansão", e:"✝️"},
  {n:"Dr. Otávio Lemos", r:"médico e cético", e:"🩺"},
  {n:"Iara Monteiro", r:"ocultista convidada", e:"🌒"}
];

const $ = id => document.getElementById(id);
const rnd = n => Math.floor(Math.random()*n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];} return a; };

let S;

function newGame(){
  const mDeck = shuffle(MEANS.map((_,i)=>i));
  const cDeck = shuffle(CLUES.map((_,i)=>i));
  const suspects = PEOPLE.map((p,i)=>({...p, m:mDeck.slice(i*3,i*3+3), c:cDeck.slice(i*3,i*3+3)}));
  const culprit = rnd(4);
  const mi = pick(suspects[culprit].m), ci = pick(suspects[culprit].c);
  S = {suspects, culprit, mi, ci, round:1, badge:true, mode:"note", sel:{s:null,m:null,c:null},
       off:new Set(), placed:[], log:[], fresh:new Set(), over:false};

  const tags = [...MEANS[mi].t.map(t=>[t,"m"]), ...CLUES[ci].t.map(t=>[t,"c"])];
  const byKey = {};
  tags.forEach(([t,src])=>{ const [k,o]=t.split(":"); (byKey[k] ||= []).push({o:+o,src}); });

  const place = (k, fixed) => {
    const opts = byKey[k];
    if(opts){ const ch = pick(opts); S.placed.push({k, o:ch.o, rel:true, src:ch.src, fixed}); }
    else { S.placed.push({k, o:rnd(6), rel:false, fixed}); }
  };
  place("causa", true);
  place("local", true);
  S.relQueue = shuffle(SCENE_KEYS.filter(k=>byKey[k]));
  S.byKey = byKey;
  const first = S.relQueue.splice(0,3);
  first.forEach(k=>place(k,false));
  while(S.placed.length < 6){
    const free = SCENE_KEYS.filter(k=>!S.placed.some(p=>p.k===k) && !S.relQueue.includes(k));
    const pool = free.length ? free : SCENE_KEYS.filter(k=>!S.placed.some(p=>p.k===k));
    place(pick(pool), false);
  }
  S.placed = [S.placed[0], S.placed[1], ...shuffle(S.placed.slice(2))];
  S.log.push({sys:"O corpo de Cecília foi encontrado. O espírito acendeu as primeiras velas."});
  voices();
  render();
}

function nextRound(){
  if(S.round>=3 || S.over) return;
  S.round++;
  const scene = S.placed.map((p,i)=>({p,i})).filter(x=>!x.p.fixed);
  const noise = scene.filter(x=>!x.p.rel);
  const out = (noise.length ? pick(noise) : pick(scene));
  let k, entry;
  const used = new Set(S.placed.map(p=>p.k));
  const queue = S.relQueue.filter(q=>!used.has(q));
  if(queue.length){
    k = queue[0]; S.relQueue = S.relQueue.filter(q=>q!==k);
    const ch = pick(S.byKey[k]);
    entry = {k, o:ch.o, rel:true, src:ch.src, fixed:false};
  } else {
    const free = SCENE_KEYS.filter(q=>!used.has(q));
    k = pick(free);
    entry = {k, o:rnd(6), rel:false, fixed:false};
  }
  const oldName = TILES[out.p.k].n;
  S.placed[out.i] = entry;
  S.fresh = new Set([out.i]);
  S.log.push({round:S.round});
  S.log.push({sys:`A vela sobre “${oldName}” se apagou. Uma nova chama surge sobre “${TILES[k].n}”.`});
  voices();
  render();
}

function pairScore(m,c){
  const t = new Set([...MEANS[m].t, ...CLUES[c].t]);
  return S.placed.filter(p=>t.has(p.k+":"+p.o)).length;
}

const LINES = [
  (s,m,c)=>`Acho que foi ${s}: ${m} somado a ${c}.`,
  (s,m,c)=>`Os sinais não mentem… ${m} e ${c}. Isso tem a marca de ${s}.`,
  (s,m,c)=>`${s} trouxe ${m} para a mansão. E ${c} na cena? Coincidência demais.`,
  (s,m,c)=>`Reparem nas velas. Tudo converge para ${m} e ${c}, coisas de ${s}.`,
  (s,m,c)=>`Não confio em ${s}. ${m}, ${c}… está tudo diante de nós.`
];

function voices(){
  S.suspects.forEach((sp, i)=>{
    const pairs = [];
    S.suspects.forEach((o, j)=>{ if(j===i) return;
      o.m.forEach(m=>o.c.forEach(c=>pairs.push({j,m,c,sc:pairScore(m,c)+Math.random()*0.9})));
    });
    pairs.sort((a,b)=>b.sc-a.sc);
    let choice;
    if(i===S.culprit){
      const decoys = pairs.slice(0,7).filter(p=>!(p.j===S.culprit));
      choice = pick(decoys.slice(1,5).length ? decoys.slice(1,5) : decoys);
    } else {
      const truth = pairs.find(p=>p.j===S.culprit && p.m===S.mi && p.c===S.ci);
      if(truth && Math.random()< (0.25 + 0.15*S.round)) choice = truth;
      else choice = pick(pairs.slice(0,3));
    }
    const line = pick(LINES)(S.suspects[choice.j].n, MEANS[choice.m].n, CLUES[choice.c].n);
    S.log.push({who:sp.n, text:line});
  });
}

function cardHTML(kind, s, idx){
  const d = kind==="m" ? MEANS[idx] : CLUES[idx];
  const key = `${kind}-${s}-${idx}`;
  const off = S.off.has(key);
  const sel = S.sel.s===s && S.sel[kind]===idx;
  return `<div class="card ${kind}${off&&!sel?" off":""}${sel?" sel":""}" tabindex="0" role="button" data-k="${kind}" data-s="${s}" data-i="${idx}" aria-pressed="${sel||off}"><span class="ico" aria-hidden="true">${d.e}</span>${d.n}</div>`;
}

function render(){
  $("round").textContent = S.round;
  $("badge").innerHTML = `Vela de acusação: <b>${S.badge?"acesa":"apagada"}</b>`;

  $("tiles").innerHTML = S.placed.map((p,i)=>{
    const t = TILES[p.k];
    return `<div class="tile${p.fixed?" fixed":""}${S.fresh.has(i)?" fresh":""}">
      <h3>${t.n}${p.fixed?"<small>fixo</small>":""}</h3>
      <ul>${t.o.map((o,j)=>`<li class="${j===p.o?"on":""}">${o}</li>`).join("")}</ul></div>`;
  }).join("");
  S.fresh = new Set();

  $("suspects").innerHTML = S.suspects.map((sp,s)=>`
    <article class="suspect${S.sel.s===s?" focus":""}">
      <div class="who"><div class="face" aria-hidden="true">${sp.e}</div><div><h3>${sp.n}</h3><span>${sp.r}</span></div></div>
      <div class="row-label">Meios rituais</div>
      <div class="cards">${sp.m.map(i=>cardHTML("m",s,i)).join("")}</div>
      <div class="row-label">Vestígios</div>
      <div class="cards">${sp.c.map(i=>cardHTML("c",s,i)).join("")}</div>
    </article>`).join("");

  $("log").innerHTML = S.log.map(e=>{
    if(e.round) return `<span class="r">Rodada ${e.round}</span>`;
    if(e.sys) return `<p class="sys">${e.sys}</p>`;
    return `<p><span class="s">${e.who}:</span> “${e.text}”</p>`;
  }).join("");
  $("log").scrollTop = $("log").scrollHeight;

  $("modeNote").setAttribute("aria-pressed", S.mode==="note");
  $("modeAccuse").setAttribute("aria-pressed", S.mode==="accuse");

  const {s,m,c} = S.sel;
  if(S.mode==="accuse"){
    $("accText").innerHTML = s===null
      ? "Escolha um meio ritual e um vestígio do mesmo convidado."
      : `<b>${S.suspects[s].n}</b> com <b>${m!==null?MEANS[m].n:"…"}</b> e <b>${c!==null?CLUES[c].n:"…"}</b>`;
  } else {
    $("accText").textContent = S.round<3 ? "Toque nas cartas para descartá-las das suas suspeitas." : "Última rodada: o espírito não tem mais forças. Faça sua acusação.";
  }
  $("btnAccuse").disabled = !(S.badge && !S.over && s!==null && m!==null && c!==null);
  $("btnNext").disabled = S.round>=3 || S.over;
  $("btnNext").textContent = S.round>=3 ? "Sem mais sinais" : "Invocar novo sinal";
}

function onCard(el){
  if(S.over) return;
  const k = el.dataset.k, s = +el.dataset.s, i = +el.dataset.i;
  if(S.mode==="note"){
    const key = `${k}-${s}-${i}`;
    S.off.has(key) ? S.off.delete(key) : S.off.add(key);
  } else {
    if(S.sel.s!==s) S.sel = {s, m:null, c:null};
    S.sel[k] = (S.sel[k]===i) ? null : i;
    if(S.sel.m===null && S.sel.c===null) S.sel.s = null;
  }
  render();
}

function accuse(){
  const {s,m,c} = S.sel;
  S.badge = false; S.over = true;
  const win = s===S.culprit && m===S.mi && c===S.ci;
  sfx(win?"win":"lose"); if(!win) lightning();
  const cul = S.suspects[S.culprit];
  const explain = S.placed.map(p=>{
    const t = TILES[p.k], opt = t.o[p.o];
    if(!p.rel) return `<li><b>${t.n}: ${opt}</b> — chama trêmula; o espírito não tinha nada a mostrar aqui.</li>`;
    const what = p.src==="m" ? MEANS[S.mi].n : CLUES[S.ci].n;
    return `<li><b>${t.n}: ${opt}</b> apontava para ${what}.</li>`;
  }).join("");
  let msg;
  if(win) msg = `<h2 class="verdict-win">O espírito descansa</h2><p>Você desmascarou <b>${cul.n}</b>. A possessão se desfaz e as velas da mansão se apagam em paz.</p>`;
  else {
    const parts = [];
    if(s!==S.culprit) parts.push("acusou a pessoa errada");
    else { if(m!==S.mi) parts.push("errou o meio ritual"); if(c!==S.ci) parts.push("errou o vestígio"); }
    msg = `<h2 class="verdict-lose">O mal escapou</h2><p>Você ${parts.join(" e ")}. Ao amanhecer, <b>${cul.n}</b> já havia sumido pela névoa.</p>`;
  }
  openModal(`${msg}
    <p>A verdade: <b>${MEANS[S.mi].e} ${MEANS[S.mi].n}</b> e <b>${CLUES[S.ci].e} ${CLUES[S.ci].n}</b>.</p>
    <p class="ex">O que as velas diziam:</p><ul class="ex">${explain}</ul>
    <div class="end"><button id="mClose">Ver o tabuleiro</button><button class="primary" id="mNew">Nova partida</button></div>`);
  $("mClose").onclick = closeModal;
  $("mNew").onclick = ()=>{ closeModal(); newGame(); };
  render();
}

function rules(first){
  openModal(`<h2>Como jogar</h2>
    <p>Cecília Albuquerque foi encontrada morta na mansão da família. Quatro convidados passaram a noite lá, e um deles a matou sob a influência de algo antigo.</p>
    <ol>
      <li>Cada convidado tem três <b style="color:var(--means)">meios rituais</b> e três <b style="color:var(--clue)">vestígios</b>. O assassino usou um meio e deixou um vestígio, ambos dos seus.</li>
      <li>O espírito de Cecília não fala. Ele acende uma vela em cada quadro de sinais. “Causa da morte” e “Local do corpo” nunca mudam; os demais são indícios.</li>
      <li>Alguns sinais são chamas trêmulas: o espírito não tinha nada a mostrar ali e marcou qualquer coisa.</li>
      <li>A cada rodada, um sinal se apaga e outro surge. São três rodadas.</li>
      <li>Os convidados dão palpites. O assassino também — e sempre desvia a suspeita.</li>
      <li>Você tem uma única vela de acusação: escolha convidado, meio e vestígio. Acertar os três vence.</li>
    </ol>
    <p class="ex">Dica: em “Descartar cartas”, toque nas cartas que não combinam com os sinais. Depois troque para “Montar acusação”.</p>
    <div class="end"><button class="primary" id="mGo">${first?"Entrar na mansão":"Voltar ao jogo"}</button></div>`);
  $("mGo").onclick = closeModal;
}

function openModal(html){ $("modal").innerHTML = html; $("veil").classList.add("open"); const b=$("modal").querySelector("button.primary,button"); b&&b.focus(); }
function closeModal(){ $("veil").classList.remove("open"); }

document.addEventListener("click", e=>{ const c = e.target.closest(".card"); if(c){ onCard(c); sfx("tick"); } });
document.addEventListener("keydown", e=>{
  if(e.key==="Escape" && $("veil").classList.contains("open")) closeModal();
  const c = e.target.closest && e.target.closest(".card");
  if(c && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); onCard(c); }
});
$("modeNote").onclick = ()=>{ S.mode="note"; render(); };
$("modeAccuse").onclick = ()=>{ S.mode="accuse"; render(); };
$("btnNext").onclick = ()=>{ if(S.round<3 && !S.over){ nextRound(); sfx("summon"); lightning(); } };
$("btnSound").onclick = toggleSound;
$("btnAccuse").onclick = accuse;
$("btnRules").onclick = ()=>rules(false);
$("btnNew").onclick = ()=>{ newGame(); sfx("start"); };

/* ===== Som (sintetizado, sem arquivos externos) ===== */
let AC=null, master=null, soundOn=false, noiseBuf=null, ambTimer=null, crackTimer=null;
function initAudio(){
  AC = new (window.AudioContext||window.webkitAudioContext)();
  master = AC.createGain(); master.gain.value = 0.8; master.connect(AC.destination);
  noiseBuf = AC.createBuffer(1, AC.sampleRate*2, AC.sampleRate);
  const d = noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  const lp = AC.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=180; lp.Q.value=4;
  const dg = AC.createGain(); dg.gain.value=0.05;
  [55,58.3,82.4].forEach(f=>{ const o=AC.createOscillator(); o.type="sawtooth"; o.frequency.value=f; o.connect(lp); o.start(); });
  const lfo=AC.createOscillator(); lfo.frequency.value=0.07; const lg=AC.createGain(); lg.gain.value=90;
  lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
  lp.connect(dg); dg.connect(master);
}
function noise(dur){ const s=AC.createBufferSource(); s.buffer=noiseBuf; s.loop=true; s.start(AC.currentTime, Math.random()); s.stop(AC.currentTime+dur+0.1); return s; }
function env(g,t,a,h,r,peak){ g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(peak,t+a); g.gain.setValueAtTime(peak,t+a+h); g.gain.exponentialRampToValueAtTime(0.0001,t+a+h+r); }
function out(node){ if(AC.createStereoPanner){ const p=AC.createStereoPanner(); p.pan.value=Math.random()*1.6-0.8; node.connect(p); p.connect(master); } else node.connect(master); }
function whisper(vol){
  const t=AC.currentTime, dur=1.2+Math.random()*1.3;
  const n=noise(dur), bp=AC.createBiquadFilter(); bp.type="bandpass"; bp.Q.value=8;
  bp.frequency.setValueAtTime(900+Math.random()*600,t);
  for(let i=1;i<6;i++) bp.frequency.linearRampToValueAtTime(700+Math.random()*2600, t+dur*i/6);
  const trem=AC.createGain(); trem.gain.value=0.6;
  const lfo=AC.createOscillator(); lfo.frequency.value=5+Math.random()*4; const lg=AC.createGain(); lg.gain.value=0.4;
  lfo.connect(lg); lg.connect(trem.gain); lfo.start(t); lfo.stop(t+dur+0.2);
  const g=AC.createGain(); env(g,t,0.25,Math.max(0.1,dur-0.6),0.35,vol);
  n.connect(bp); bp.connect(trem); trem.connect(g); out(g);
}
function crackle(){ const t=AC.currentTime, n=noise(0.05), hp=AC.createBiquadFilter(); hp.type="highpass"; hp.frequency.value=2500; const g=AC.createGain(); env(g,t,0.002,0.005,0.03,0.04+Math.random()*0.07); n.connect(hp); hp.connect(g); out(g); }
function boom(f0,vol){ const t=AC.currentTime, o=AC.createOscillator(); o.type="sine"; o.frequency.setValueAtTime(f0,t); o.frequency.exponentialRampToValueAtTime(30,t+1.6); const g=AC.createGain(); env(g,t,0.01,0.1,1.6,vol); o.connect(g); g.connect(master); o.start(t); o.stop(t+2); }
function chord(freqs,type,dur,vol,glide){ const t=AC.currentTime; freqs.forEach(f=>{ const o=AC.createOscillator(); o.type=type; o.frequency.setValueAtTime(f,t); if(glide!==1) o.frequency.exponentialRampToValueAtTime(f*glide,t+dur); const lp=AC.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=1800; const g=AC.createGain(); env(g,t,0.4,dur-1.2,0.8,vol); o.connect(lp); lp.connect(g); g.connect(master); o.start(t); o.stop(t+dur+0.2); }); }
function sfx(name){
  if(!soundOn || !AC) return;
  if(name==="tick") crackle();
  else if(name==="summon"){ boom(110,0.45); setTimeout(()=>whisper(0.3),300); setTimeout(()=>whisper(0.22),1100); }
  else if(name==="win") chord([261.6,329.6,392,523.3],"triangle",4,0.08,1);
  else if(name==="lose"){ boom(70,0.6); chord([220,311.1,207.7],"sawtooth",3.5,0.06,0.5); setTimeout(()=>whisper(0.35),600); }
  else if(name==="start"){ boom(80,0.4); setTimeout(()=>whisper(0.25),700); }
}
function scheduleAmbient(){
  const amb=()=>{ if(soundOn) whisper(0.1+Math.random()*0.1); ambTimer=setTimeout(amb,12000+Math.random()*16000); };
  const cr=()=>{ if(soundOn){ crackle(); if(Math.random()<0.4) setTimeout(crackle,60); } crackTimer=setTimeout(cr,400+Math.random()*2200); };
  ambTimer=setTimeout(amb,6000); cr();
}
function toggleSound(){
  soundOn=!soundOn;
  try{
    if(soundOn){ if(!AC){ initAudio(); scheduleAmbient(); } AC.resume(); master.gain.setTargetAtTime(0.8,AC.currentTime,0.3); sfx("start"); }
    else if(AC){ master.gain.setTargetAtTime(0,AC.currentTime,0.2); }
  }catch(err){ soundOn=false; }
  $("btnSound").setAttribute("aria-pressed",soundOn);
  $("btnSound").textContent = soundOn ? "🔊 Som" : "🔇 Som";
}

/* ===== Névoa, brasas, morcegos e relâmpagos ===== */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const cv=$("fx"), cx=cv.getContext("2d");
let W=0,H=0, fog=[], embers=[], bats=[], flash=0, nextBat=3000;
function resize(){ const dpr=Math.min(2,window.devicePixelRatio||1); W=innerWidth; H=innerHeight; cv.width=W*dpr; cv.height=H*dpr; cx.setTransform(dpr,0,0,dpr,0,0); }
function newEmber(anywhere){ return {x:Math.random()*W, y:anywhere?Math.random()*H:H+10, vy:0.2+Math.random()*0.6, vx:(Math.random()-0.5)*0.3, r:0.6+Math.random()*1.6, l:Math.random()*6.28}; }
function initFx(){
  resize();
  fog = Array.from({length:7},(_,i)=>({x:Math.random()*W, y:H*(0.3+Math.random()*0.8), r:200+Math.random()*260, vx:(Math.random()-0.5)*0.15, c:i%2?"157,60,255":"224,25,42", a:0.05+Math.random()*0.05}));
  embers = Array.from({length:26},()=>newEmber(true));
}
function spawnBats(){
  const n=1+rnd(3), dir=Math.random()<0.5?1:-1, y=H*(0.08+Math.random()*0.5);
  for(let i=0;i<n;i++) bats.push({x:dir>0?-60-i*50:W+60+i*50, y:y+(Math.random()-0.5)*80, vx:dir*(2.2+Math.random()*1.6), s:10+Math.random()*12, ph:Math.random()*6, w:Math.random()*6});
}
function drawBat(b){
  const f=Math.sin(b.ph)*0.9;
  cx.save(); cx.translate(b.x, b.y+Math.sin(b.w)*6); cx.scale(b.s/12, b.s/12);
  cx.fillStyle="rgba(8,0,8,.95)"; cx.strokeStyle="rgba(157,60,255,.6)"; cx.lineWidth=1;
  cx.beginPath(); cx.moveTo(0,0);
  cx.quadraticCurveTo(-6,-4-f*8,-14,-2-f*12); cx.quadraticCurveTo(-10,1,-12,4-f*2); cx.quadraticCurveTo(-6,2,0,4);
  cx.quadraticCurveTo(6,2,12,4-f*2); cx.quadraticCurveTo(10,1,14,-2-f*12); cx.quadraticCurveTo(6,-4-f*8,0,0);
  cx.fill(); cx.stroke();
  cx.beginPath(); cx.ellipse(0,1,2.2,3.2,0,0,6.28); cx.fill();
  cx.fillStyle="#ff2b3b"; cx.fillRect(-1.3,-0.6,0.9,0.9); cx.fillRect(0.4,-0.6,0.9,0.9);
  cx.restore();
}
function drawFog(){
  fog.forEach(f=>{ const g=cx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r); g.addColorStop(0,`rgba(${f.c},${f.a})`); g.addColorStop(1,`rgba(${f.c},0)`); cx.fillStyle=g; cx.fillRect(f.x-f.r,f.y-f.r,f.r*2,f.r*2); });
  const v=cx.createRadialGradient(W/2,H/2,Math.min(W,H)*0.35,W/2,H/2,Math.max(W,H)*0.75);
  v.addColorStop(0,"rgba(0,0,0,0)"); v.addColorStop(1,"rgba(0,0,0,.6)"); cx.fillStyle=v; cx.fillRect(0,0,W,H);
}
function frame(t){
  if(document.hidden){ requestAnimationFrame(frame); return; }
  cx.clearRect(0,0,W,H);
  fog.forEach(f=>{ f.x+=f.vx; if(f.x<-f.r) f.x=W+f.r; if(f.x>W+f.r) f.x=-f.r; });
  drawFog();
  embers.forEach((e,i)=>{ e.y-=e.vy; e.l+=0.03; e.x+=e.vx+Math.sin(e.l)*0.2; if(e.y<-10) embers[i]=newEmber(false);
    cx.fillStyle=`rgba(255,${70+Math.round(Math.sin(e.l*2)*30)},50,${0.35+Math.sin(e.l*3)*0.25})`; cx.beginPath(); cx.arc(e.x,e.y,e.r,0,6.28); cx.fill(); });
  if(t>nextBat){ spawnBats(); nextBat=t+7000+Math.random()*9000; }
  bats = bats.filter(b=>b.x>-140 && b.x<W+140);
  bats.forEach(b=>{ b.x+=b.vx; b.ph+=0.35; b.w+=0.05; drawBat(b); });
  if(flash>0){ cx.fillStyle=`rgba(205,170,255,${flash})`; cx.fillRect(0,0,W,H); flash*=0.88; if(flash<0.01) flash=0; }
  requestAnimationFrame(frame);
}
function lightning(){ if(reduceMotion) return; flash=0.35; setTimeout(()=>{ flash=0.28; },140); }
initFx();
window.addEventListener("resize",()=>{ resize(); if(reduceMotion){ cx.clearRect(0,0,W,H); drawFog(); } });
if(reduceMotion) drawFog(); else requestAnimationFrame(frame);

newGame();
window.__sfx=sfx;
})();
