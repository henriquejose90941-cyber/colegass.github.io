(function(){
"use strict";
const MEIOS=[["Boneco de vodu","🪆"],["Faca cerimonial","🗡️"],["Corda de enforcado","🪢"],["Espelho amaldiçoado","🪞"],["Tábua Ouija","🔤"],["Vela negra","🕯️"],["Beladona","🌿"],["Água benta profanada","💧"],["Livro dos mortos","📕"],["Adaga de prata","🔪"],["Sal negro","🧂"],["Caixa de música","🎶"],["Retrato possuído","🖼️"],["Sino fúnebre","🔔"],["Incensário profano","⚱️"],["Cálice de sangue","🍷"],["Foice enferrujada","🌾"],["Pregos de caixão","📌"],["Máscara de peste","🎭"],["Lamparina a óleo","🏮"],["Ossos de gato","🦴"],["Fumaça de enxofre","💨"],["Cravo envenenado","🌺"],["Relógio parado","🕰️"]];
const VEST=[["Cinzas","🌫️"],["Pena de corvo","🪶"],["Cera negra","⚫"],["Mecha de cabelo","➰"],["Dente humano","🦷"],["Fotografia antiga","📷"],["Terra de cova","⚰️"],["Pétala murcha","🥀"],["Sangue seco","🩸"],["Pegadas molhadas","👣"],["Unhas arrancadas","💅"],["Rosário partido","📿"],["Pelo de gato preto","🐈‍⬛"],["Asa de mariposa","🦋"],["Diário rasgado","📓"],["Moeda antiga","🪙"],["Chave enferrujada","🗝️"],["Luva rasgada","🧤"],["Botão de osso","🔘"],["Carta sem remetente","✉️"],["Teia de aranha","🕸️"],["Gota de mercúrio","⚗️"],["Fita de luto","🎀"],["Vidro estilhaçado","🪟"]];
const MIN=4,MAX=9;
const ROUND_MS=3*60*1000, ROUNDS=3;
const TILES={
  causa:["Causa da morte",["Asfixia","Hemorragia","Envenenamento","Queimadura","Terror súbito","Afogamento"]],
  local:["Local do corpo",["Porão","Capela","Sótão","Cemitério da família","Bosque","Banheiro"]],
  odor:["Odor no ar",["Enxofre","Incenso","Podridão","Flores","Fumaça","Ferrugem"]],
  som:["Som ouvido",["Sussurros","Risadas","Choro","Sinos","Batidas na parede","Silêncio absoluto"]],
  temp:["Temperatura",["Frio cortante","Calor sufocante","Umidade","Ar seco","Oscilante","Normal"]],
  marca:["Marca no corpo",["Arranhões","Queimaduras","Símbolos","Hematomas","Perfurações","Nenhuma"]],
  luz:["Luz no local",["Velas apagadas","Lâmpadas piscando","Escuridão total","Luar","Chamas","Luz avermelhada"]],
  hora:["Hora da morte",["Meia-noite","Três da manhã","Crepúsculo","Amanhecer","Lua cheia","Eclipse"]],
  reflexo:["Superfícies",["Espelhos quebrados","Água turva","Vidro embaçado","Retratos virados","Parede rachada","Intactas"]],
  animal:["Animal presente",["Corvos","Gato preto","Ratos","Mariposas","Cães uivando","Nenhum"]],
  estado:["Estado do corpo",["Rígido","Ressecado","Encharcado","Pálido","Contorcido","Sereno"]],
  vitima:["Antes de morrer",["Não dormia","Falava sozinha","Andava dormindo","Temia espelhos","Rezava sem parar","Isolou-se"]]
};
const TAG_M=["causa:1 marca:4 vitima:0 som:0","causa:1 marca:2 luz:0 odor:5","causa:0 marca:3 estado:4 local:2","causa:4 reflexo:0 vitima:3 luz:1","causa:4 som:0 vitima:1 hora:1","causa:3 luz:4 odor:4 marca:1","causa:2 odor:3 estado:3 local:4","causa:5 estado:2 reflexo:1 local:5","causa:4 marca:2 som:4 local:0","causa:1 hora:4 animal:4 marca:4","causa:2 odor:0 temp:3 estado:1","causa:4 som:1 vitima:2 local:2","causa:0 reflexo:3 temp:0 vitima:5","causa:4 som:3 local:1 hora:0","causa:0 odor:1 temp:1 luz:5","causa:2 odor:5 local:1 estado:3","causa:1 local:3 marca:0 hora:2","causa:1 local:3 marca:4 som:4","causa:0 odor:2 vitima:5 estado:3","causa:3 luz:4 odor:4 local:0","causa:4 animal:1 som:2 hora:0","causa:0 odor:0 temp:1 luz:2","causa:2 odor:3 estado:3 hora:3","causa:4 hora:1 som:5 reflexo:4"].map(x=>x.split(" "));
const TAG_V=["luz:4 odor:4 temp:1 estado:1","animal:0 hora:2 local:3","luz:0 marca:1 local:1","marca:0 estado:4 vitima:0","local:3 animal:2 estado:1","reflexo:3 vitima:5 temp:0","local:3 odor:2 temp:2","odor:3 hora:3 estado:3","odor:5 marca:4 hora:1","local:5 estado:2 temp:2 reflexo:1","marca:0 som:2 estado:4","vitima:4 local:1 som:3","animal:1 hora:0 luz:3","animal:3 luz:2 temp:4","vitima:1 som:0 local:2","local:0 temp:0 animal:2","local:0 odor:5 som:4","marca:0 vitima:5 local:5","local:2 vitima:3 temp:0","vitima:1 hora:0 local:2","luz:2 local:0 temp:2","reflexo:0 temp:3 estado:5","vitima:4 local:1 estado:5","reflexo:0 marca:0 som:4"].map(x=>x.split(" "));
const root=document.getElementById("mp"), night=document.getElementById("night");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const sfx=n=>{try{window.__sfx&&window.__sfx(n)}catch(e){}};
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}};

const S={state:"loading",db:null,me:null,write:null,name:ls.get("sm-nome")||"",code:null,game:null,players:{},secrets:{},clues:{},guesses:{},subs:[],loaded:{},slow:false,
  sel:{s:null,m:null,c:null},pick:{m:null,c:null},confirm:false,busy:false,msg:"",lastClues:0,lastOut:null,lastMatch:null};

/* ---------- derivações ---------- */
const G=()=>S.game, match=()=>(G()&&G().match)||0;
const role=id=>G()&&G().roles?G().roles[id]:undefined;
const nameOf=id=>(S.players[id]&&S.players[id].name)||(G()&&G().names&&G().names[id])||"Jogador";
const secret=()=>S.secrets["m"+match()];
const clueList=()=>(S.clues["m"+match()]&&S.clues["m"+match()].list)||[];
const startAt=()=>(S.clues["m"+match()]&&S.clues["m"+match()].startAt)||null;
function clock(){
  const st=startAt(); if(!st) return {state:"wait"};
  const el=Date.now()-st;
  if(el>=ROUND_MS*ROUNDS) return {state:"over"};
  const round=Math.floor(el/ROUND_MS)+1, left=ROUND_MS*round-el;
  return {state:"run",round,left};
}
const mmss=ms=>{const t=Math.max(0,Math.ceil(ms/1000));return String(Math.floor(t/60)).padStart(2,"0")+":"+String(t%60).padStart(2,"0");};
const guessList=()=>Object.values(S.guesses).filter(g=>g.match===match()).sort((a,b)=>a.at-b.at);
const holders=()=>((G()&&G().order)||[]).filter(id=>role(id)!=="mestre");
const investigators=()=>holders().filter(id=>role(id)==="investigador");
const myGuess=()=>guessList().find(g=>g.by===S.me);
const isHost=()=>G()&&G().host===S.me;
function outcome(){
  const s=secret(); if(!s) return null;
  const gs=guessList();
  const hit=gs.find(g=>g.s===s.by&&g.m===s.m&&g.c===s.c);
  if(hit) return {who:"inv",g:hit};
  const inv=investigators();
  if(inv.length&&inv.every(id=>gs.some(g=>g.by===id))) return {who:"ass"};
  if(clock().state==="over") return {who:"ass",timeout:true};
  return null;
}
const sortedPlayers=()=>Object.entries(S.players).sort((a,b)=>(a[1].joined||0)-(b[1].joined||0));

/* ---------- conexão ---------- */
function getBackend(){return new Promise(res=>{
  if(window.mpBackend) return res(window.mpBackend);
  const t=setTimeout(()=>res(null),10000);
  window.addEventListener("mp-backend",()=>{clearTimeout(t);res(window.mpBackend);},{once:true});
});}
async function init(){
  render();
  let db=null,user=null;
  try{const be=await getBackend(); if(be){db=be.db;user=be.user;} else S.offWhy=window.mpBackendError||"";}catch(e){S.offWhy=String(e&&e.message||e);}
  if(!db||!user){S.state="off";return render();}
  S.db=db;
  S.me=await user.id();
  if(!S.me){S.state="off";return render();}
  try{S.write=await user.can("data.write");}catch(e){S.write=null;}
  S.state="ready";
  const saved=ls.get("sm-sala");
  if(saved){subscribe(saved);} else render();
}
function unsubscribe(){S.subs.forEach(u=>{try{u()}catch(e){}});S.subs=[];}
function subscribe(code){
  unsubscribe();
  Object.assign(S,{code,game:null,players:{},secrets:{},clues:{},guesses:{},loaded:{},slow:false,lastClues:0,lastOut:null,lastMatch:null});
  ls.set("sm-sala",code);
  const base="games/"+code, db=S.db;
  const fail=e=>{S.msg="A conexão com a sala caiu ("+(e&&e.code||"erro")+"). Saia e entre de novo.";render();};
  const coll=(p,key)=>db.collection(base+"/"+p).onSnapshot(q=>{const o={};q.docs.forEach(d=>o[d.id]=d.data());S[key]=o;S.loaded[key]=true;render();},fail);
  S.subs.push(db.doc(base).onSnapshot(s=>{S.game=s.exists?s.data():null;S.loaded.game=true;render();},fail));
  S.subs.push(coll("players","players"),coll("secret","secrets"),coll("clues","clues"),coll("guesses","guesses"));
  setTimeout(()=>{if(!S.loaded.game||!S.loaded.players){S.slow=true;render();}},10000);
  render();
}
function leaveLocal(){unsubscribe();S.code=null;S.game=null;ls.set("sm-sala",null);S.sel={s:null,m:null,c:null};S.pick={m:null,c:null};render();}

/* ---------- ações ---------- */
async function run(fn){
  if(S.busy) return; S.busy=true; S.msg=""; render();
  try{await fn();}catch(e){S.msg=(e&&(e.code==="permission-denied"||e.code==="invalid_argument"))?"O servidor recusou a ação (regras de segurança do Firestore).":(e&&e.code==="unavailable")?"Sem conexão com o servidor. Verifique a internet.":"Algo deu errado. Tente de novo.";}
  S.busy=false; render();
}
function readName(){const v=(document.getElementById("mpName")||{}).value;const n=String(v||S.name).trim().slice(0,20);if(n.length<2){S.msg="Digite um nome com pelo menos 2 letras.";render();return null;}S.name=n;ls.set("sm-nome",n);return n;}
const L="ABCDEFGHJKLMNPQRSTUVWXYZ";
const newCode=()=>Array.from({length:4},()=>L[Math.floor(Math.random()*L.length)]).join("");
const A={
  create:()=>{const n=readName();if(!n)return;run(async()=>{
    let code; for(let t=0;t<6;t++){code=newCode();const s=await S.db.doc("games/"+code).get();if(!s.exists)break;}
    await S.db.doc("games/"+code).set({host:S.me,phase:"lobby",match:0,created:Date.now()});
    await S.db.doc("games/"+code+"/players/"+S.me).set({name:n,joined:Date.now()});
    subscribe(code);});},
  join:()=>{const n=readName();if(!n)return;const code=String((document.getElementById("mpCode")||{}).value||"").trim().toUpperCase();
    if(!/^[A-Z]{4}$/.test(code)){S.msg="O código da sala tem 4 letras.";return render();}
    run(async()=>{
      const g=await S.db.doc("games/"+code).get();
      if(!g.exists){S.msg="Sala "+code+" não encontrada.";return;}
      const ps=await S.db.collection("games/"+code+"/players").get();
      const inside=ps.docs.some(d=>d.id===S.me);
      if(!inside&&ps.size>=MAX){S.msg="Sala cheia (máximo "+MAX+").";return;}
      await S.db.doc("games/"+code+"/players/"+S.me).set({name:n,joined:inside?(ps.docs.find(d=>d.id===S.me).data().joined||Date.now()):Date.now()});
      subscribe(code);});},
  leave:()=>run(async()=>{await S.db.doc("games/"+S.code+"/players/"+S.me).delete();leaveLocal();}),
  forget:()=>leaveLocal(),
  kick:id=>run(()=>S.db.doc("games/"+S.code+"/players/"+id).delete()),
  claim:()=>run(()=>S.db.doc("games/"+S.code).update({host:S.me})),
  start:()=>run(async()=>{
    const ids=sortedPlayers().map(([id])=>id);
    if(ids.length<MIN||ids.length>MAX){S.msg="São precisos de "+MIN+" a "+MAX+" jogadores.";return;}
    const r=shuffle(ids), roles={}, hands={}, names={};
    r.forEach((id,i)=>roles[id]=i===0?"mestre":i===1?"assassino":"investigador");
    const dm=shuffle(MEIOS.map((_,i)=>i)), dv=shuffle(VEST.map((_,i)=>i));
    let k=0; ids.forEach(id=>{names[id]=nameOf(id); if(roles[id]!=="mestre"){hands[id]={m:dm.slice(k*3,k*3+3),c:dv.slice(k*3,k*3+3)};k++;}});
    await S.db.doc("games/"+S.code).update({phase:"jogo",match:match()+1,roles,hands,names,order:shuffle(ids.filter(id=>roles[id]!=="mestre")).concat(ids.filter(id=>roles[id]==="mestre"))});
  }),
  lobby:()=>run(()=>S.db.doc("games/"+S.code).update({phase:"lobby"})),
  pick:(k,i)=>{S.pick[k]=S.pick[k]===i?null:i;render();},
  confirmPick:()=>{const p=S.pick;if(p.m==null||p.c==null)return;run(()=>S.db.doc("games/"+S.code+"/secret/m"+match()).set({match:match(),by:S.me,m:p.m,c:p.c,at:Date.now()}));},
  clue:()=>{const el=document.getElementById("mpClue");const t=String(el&&el.value||"").trim().slice(0,140);if(!t)return;
    const n=norm(t);
    const names=[];holders().forEach(id=>{const h=G().hands[id];h.m.forEach(i=>names.push(MEIOS[i][0]));h.c.forEach(i=>names.push(VEST[i][0]));});
    const bad=names.find(x=>n.includes(norm(x)));
    if(bad){S.msg="A dica não pode citar o nome de uma carta (“"+bad+"”).";return render();}
    sendClue({t,kind:"texto"},()=>{const e=document.getElementById("mpClue");if(e)e.value="";});},
  cartaz:(k,o)=>{const tl=TILES[k];if(!tl)return;sendClue({t:tl[0]+": "+tl[1][o],kind:"cartaz"});},
  sel:(k,s,i)=>{if(s===S.me)return;if(S.sel.s!==s)S.sel={s,m:null,c:null};S.sel[k]=S.sel[k]===i?null:i;if(S.sel.m==null&&S.sel.c==null)S.sel.s=null;S.confirm=false;render();},
  guess:()=>{const g=S.sel;if(g.s==null||g.m==null||g.c==null)return;if(!S.confirm){S.confirm=true;return render();}
    run(async()=>{await S.db.doc("games/"+S.code+"/guesses/m"+match()+"_"+S.me).set({match:match(),by:S.me,s:g.s,m:g.m,c:g.c,at:Date.now()});S.confirm=false;});},
  cancelGuess:()=>{S.confirm=false;render();}
};

function sendClue(item,done){
  if(outcome()) return;
  const cur=S.clues["m"+match()]||{};
  const list=(cur.list||[]).concat([Object.assign({at:Date.now()},item)]);
  const st=cur.startAt||Date.now();
  run(async()=>{await S.db.doc("games/"+S.code+"/clues/m"+match()).set({match:match(),list,startAt:st});if(done)done();});
}
/* ---------- telas ---------- */
const cardHTML=(k,s,i,cls,act)=>{const d=(k==="m"?MEIOS:VEST)[i];return `<div class="card ${k==="m"?"m":"c"} ${cls||""}" ${act?`role="button" tabindex="0" data-act="${act}" data-k="${k}" data-s="${esc(s)}" data-i="${i}"`:""}><span class="ico" aria-hidden="true">${d[1]}</span>${esc(d[0])}</div>`;};
const roleName={mestre:"Mestre",assassino:"Assassino",investigador:"Investigador"};
const msg=()=>S.msg?`<p class="mp-msg" role="alert">${esc(S.msg)}</p>`:"";
const btn=(act,label,cls,dis,extra)=>`<button data-act="${act}" ${extra||""} class="${cls||""}" ${dis||S.busy?"disabled":""}>${label}</button>`;

function vOff(){return `<div class="mp-card"><h2>Multijogador indisponível</h2><p>Não foi possível conectar ao Firebase.</p><p class="mp-note">Confira se o arquivo <code>js/firebase-config.js</code> foi preenchido, se o login anônimo está ativado e se a página está aberta por <b>http(s)</b> (GitHub Pages ou servidor local), não direto do arquivo.</p>${S.offWhy?`<p class="mp-note">Detalhe técnico: ${esc(S.offWhy)}</p>`:""}<p class="mp-note">O modo Solo continua disponível.</p></div>`;}
function vHome(){return `<div class="mp-card">
  <h2>Entrar na mansão</h2>
  <p class="mp-note">De ${MIN} a ${MAX} jogadores, cada um no seu aparelho. Um é sorteado Mestre, outro Assassino; os demais investigam.</p>
  <label class="mp-label" for="mpName">Seu nome</label>
  <div class="mp-row"><input type="text" id="mpName" maxlength="20" value="${esc(S.name)}" placeholder="Como os outros vão te ver"></div>
  <div class="mp-row">${btn("create","Criar sala","primary")}</div>
  <label class="mp-label" for="mpCode">Ou entre com um código</label>
  <div class="mp-row"><input type="text" id="mpCode" maxlength="4" placeholder="ABCD" autocapitalize="characters" style="text-transform:uppercase;max-width:9rem">${btn("join","Entrar")}</div>
  ${msg()}
  <details class="mp-rules"><summary>Como funciona</summary>
  <ol><li>O anfitrião inicia a partida e os papéis são sorteados.</li>
  <li>Cai a noite: a tela de todos fica preta, menos a do Assassino, que escolhe um meio e um vestígio entre as próprias cartas.</li>
  <li>O Mestre vê o crime e escreve dicas para todos, sem citar o nome das cartas.</li>
  <li>Cada Investigador tem um único palpite: suspeito + meio + vestígio. Quem acertar resolve o caso.</li>
  <li>Se todos os Investigadores errarem, o Assassino vence.</li></ol></details>
</div>`;}
function vLobby(){
  const ps=sortedPlayers(), n=ps.length, hostHere=G()&&S.players[G().host];
  return `<div class="mp-card">
  <p class="mp-note">Código da sala — passe para os amigos</p>
  <div class="mp-code">${esc(S.code)}</div>
  <h3 class="mp-h">Na sala (${n}/${MAX})</h3>
  <ul class="mp-players">${ps.map(([id,p])=>`<li><span>${esc(p.name)}${id===S.me?" <em>(você)</em>":""}${G()&&G().host===id?" 👑":""}</span>${isHost()&&id!==S.me?btn("kick","Remover","",false,`data-id="${esc(id)}"`):""}</li>`).join("")}</ul>
  ${n<MIN?`<p class="mp-note">Faltam ${MIN-n} jogador(es) para começar.</p>`:""}
  <div class="mp-row">
    ${isHost()?btn("start","Iniciar partida","primary",n<MIN||n>MAX):`<span class="mp-note">${hostHere?"Aguardando o anfitrião iniciar…":"O anfitrião saiu."}</span>`}
    ${!hostHere&&!isHost()?btn("claim","Assumir como anfitrião"):""}
    ${btn("leave","Sair da sala")}
  </div>${msg()}</div>`;
}
function vPick(){
  const h=G().hands[S.me], p=S.pick;
  return `<div class="mp-card wide">
  <div class="role role-assassino">Você é o Assassino</div>
  <p>Os outros estão de olhos fechados. Escolha <b>um meio</b> e <b>um vestígio</b> das suas cartas.</p>
  <div class="row-label">Seus meios rituais</div><div class="cards">${h.m.map(i=>cardHTML("m",S.me,i,p.m===i?"sel":"","pick")).join("")}</div>
  <div class="row-label">Seus vestígios</div><div class="cards">${h.c.map(i=>cardHTML("c",S.me,i,p.c===i?"sel":"","pick")).join("")}</div>
  <div class="mp-row">${btn("confirmPick","Cometer o crime","danger",p.m==null||p.c==null)}${btn("leave","Sair da sala")}</div>${msg()}</div>`;
}
function vBoard(){
  const r=role(S.me), s=secret(), out=outcome(), gs=guessList(), mine=myGuess(), clues=clueList();
  const showSecret=r==="mestre"||(r==="assassino")||out;
  const canGuess=r==="investigador"&&!mine&&!out;
  let banner="";
  if(out){
    const crime=`<b>${esc(nameOf(s.by))}</b> usou <b>${esc(MEIOS[s.m][0])}</b> e deixou <b>${esc(VEST[s.c][0])}</b>.`;
    banner=out.who==="inv"?`<div class="banner win"><h2>Caso resolvido!</h2><p>${esc(nameOf(out.g.by))} acertou: ${crime}</p></div>`
      :`<div class="banner"><h2>O assassino escapou</h2><p>${out.timeout?"As 3 rodadas acabaram sem ninguém acertar.":"Nenhum investigador acertou."} ${crime}</p></div>`;
  }
  const top=`<div class="mp-top"><span class="role role-${r||"esp"}">${r?"Você é "+(r==="investigador"?"Investigador":"o "+roleName[r]):"Você está assistindo"}</span>
    <span class="mp-row" style="margin:0"><span class="pill">Sala <b>${esc(S.code)}</b></span>${btn("leave","Sair da sala")}</span></div>`;
  let master="";
  if(r==="mestre"&&s){
    const tags=new Set([...TAG_M[s.m],...TAG_V[s.c]]);
    const sug=[...tags].map(x=>x.split(":")).filter(([k])=>TILES[k]);
    const opt=(k,o)=>`<button class="tile-opt${tags.has(k+":"+o)?" hot":""}" data-act="cartaz" data-k="${k}" data-o="${o}" ${out||S.busy?"disabled":""}>${tags.has(k+":"+o)?"★ ":""}${esc(TILES[k][1][o])}</button>`;
    master=`<div class="panel secretbox"><h3>O crime</h3><p><b>${esc(nameOf(s.by))}</b> é o assassino.</p>
    <div class="cards two">${cardHTML("m",s.by,s.m,"sel")}${cardHTML("c",s.by,s.c,"sel")}</div></div>
    ${out?"":`<div class="panel"><h3>Dar uma dica</h3>
      <p class="mp-note">${startAt()?"Você pode mandar dicas a qualquer momento.":"A contagem de 3 minutos começa quando você mandar a primeira dica."} Não cite nomes de cartas.</p>
      <div class="mp-row"><input type="text" id="mpClue" maxlength="140" placeholder="Escreva uma dica… ex.: algo que queima devagar">${btn("clue","Enviar","primary")}</div>
      <h4 class="mp-sub">Ou envie um cartaz</h4>
      <p class="mp-note">Sugestões ligadas ao crime (★):</p>
      <div class="tile-row">${sug.map(([k,o])=>`<button class="tile-opt hot" data-act="cartaz" data-k="${k}" data-o="${o}" ${S.busy?"disabled":""}>${esc(TILES[k][0])}: ${esc(TILES[k][1][+o])}</button>`).join("")}</div>
      <details class="tiles-all"><summary>Todos os cartazes</summary>
        ${Object.keys(TILES).map(k=>`<div class="tile-cat"><b>${esc(TILES[k][0])}</b><div class="tile-row">${TILES[k][1].map((_,o)=>opt(k,o)).join("")}</div></div>`).join("")}
      </details></div>`}`;
  }
  const ass=r==="assassino"&&s&&!out?`<div class="panel secretbox"><h3>Seu crime</h3><div class="cards two">${cardHTML("m",S.me,s.m,"sel")}${cardHTML("c",S.me,s.c,"sel")}</div><p class="mp-note">Disfarce. Ninguém pode saber.</p></div>`:"";
  const sus=holders().map(id=>{
    const h=G().hands[id]; const isSel=S.sel.s===id;
    const mark=(k,i)=>{let c="";if(canGuess&&isSel&&S.sel[k]===i)c+=" sel";if(showSecret&&s&&s.by===id&&s[k]===i)c+=" crime";return c;};
    const act=canGuess&&id!==S.me?"sel":null;
    return `<article class="suspect${isSel?" focus":""}"><div class="who"><div class="face" aria-hidden="true">👤</div><div><h3>${esc(nameOf(id))}${id===S.me?" <em>(você)</em>":""}</h3>${out&&s.by===id?`<span>o assassino</span>`:""}</div></div>
      <div class="row-label">Meios rituais</div><div class="cards">${h.m.map(i=>cardHTML("m",id,i,mark("m",i),act)).join("")}</div>
      <div class="row-label">Vestígios</div><div class="cards">${h.c.map(i=>cardHTML("c",id,i,mark("c",i),act)).join("")}</div></article>`;
  }).join("");
  let guessBar="";
  if(r==="investigador"&&!out){
    if(mine) guessBar=`<div class="guess"><span>Você já usou seu palpite. Aguarde os outros.</span></div>`;
    else{const g=S.sel;const ready=g.s!=null&&g.m!=null&&g.c!=null;
      guessBar=`<div class="guess"><span>${g.s==null?"Toque num meio e num vestígio do mesmo suspeito.":`<b>${esc(nameOf(g.s))}</b> com <b>${g.m!=null?esc(MEIOS[g.m][0]):"…"}</b> e <b>${g.c!=null?esc(VEST[g.c][0]):"…"}</b>`}</span>
      <span class="mp-row" style="margin:0">${S.confirm?btn("cancelGuess","Cancelar"):""}${btn("guess",S.confirm?"Confirmar — é sua única chance":"Fazer palpite","danger",!ready)}</span></div>`;}
  }
  const side=`<aside class="mp-side">
    <div class="panel"><h3>Dicas do Mestre</h3>${clues.length?`<ol class="clues">${clues.map(c=>`<li class="${c.kind==="cartaz"?"is-tile":""}">${c.kind==="cartaz"?"🃏 ":""}${esc(c.t)}</li>`).join("")}</ol>`:`<p class="mp-note">${r==="mestre"?"Escreva a primeira dica.":"O Mestre ainda não deu nenhuma dica."}</p>`}
</div>
    <div class="panel"><h3>Palpites</h3>${gs.length?`<ul class="glist">${gs.map(g=>{const ok=s&&g.s===s.by&&g.m===s.m&&g.c===s.c;return `<li class="${ok?"ok":"bad"}"><b>${esc(nameOf(g.by))}</b> acusou ${esc(nameOf(g.s))}: ${esc(MEIOS[g.m][0])} + ${esc(VEST[g.c][0])} ${ok?"✔":"✘"}</li>`}).join("")}</ul>`:`<p class="mp-note">Ninguém palpitou ainda. Cada investigador tem uma única chance.</p>`}
      <p class="mp-note">${investigators().filter(id=>!gs.some(g=>g.by===id)).length} investigador(es) ainda com palpite.</p></div>
    ${isHost()?`<div class="panel"><h3>Anfitrião</h3><div class="mp-row">${btn("start","Nova partida",out?"primary":"",sortedPlayers().length<MIN)}${btn("lobby","Voltar ao lobby")}</div></div>`:""}
  </aside>`;
  const ck=clock();
  const timer=out?"":`<div class="timer${ck.state==="run"&&ck.left<=30000?" low":""}"><span>${ck.state==="wait"?"Aguardando a primeira dica do Mestre":ck.state==="run"?"Rodada "+ck.round+" de "+ROUNDS:"Tempo esgotado"}</span><b id="mpTimer">${ck.state==="run"?mmss(ck.left):"--:--"}</b></div>`;
  return `${top}${banner}${timer}${msg()}<div class="mp-grid"><div class="mp-main">${master}${ass}<div class="suspects">${sus}</div>${guessBar}</div>${side}</div>`;
}
function view(){
  if(S.state==="loading") return `<div class="mp-card"><p>Abrindo os portões…</p></div>`;
  if(S.state==="off") return vOff();
  if(!S.code) return vHome();
  if(!S.loaded.game||!S.loaded.players) return `<div class="mp-card"><p>${S.slow?"A sala não responde ainda. Verifique a conexão.":"Entrando na sala…"}</p>${btn("forget","Voltar")}</div>`;
  if(!G()) return `<div class="mp-card"><p>Esta sala não existe mais.</p>${btn("forget","Voltar")}</div>`;
  if(!S.players[S.me]) return `<div class="mp-card"><p>Você não está mais nesta sala.</p>${btn("forget","Voltar")}</div>`;
  if(G().phase!=="jogo") return vLobby();
  if(!secret()&&role(S.me)==="assassino") return vPick();
  return vBoard();
}

/* ---------- render ---------- */
function render(){
  if(!root) return;
  const keep={}; root.querySelectorAll("input").forEach(i=>{if(i.id)keep[i.id]=i.value;});
  const ae=document.activeElement, focusId=ae&&root.contains(ae)?ae.id:null;
  if(S.game&&S.lastMatch!==match()){S.lastMatch=match();S.sel={s:null,m:null,c:null};S.pick={m:null,c:null};S.confirm=false;S.lastClues=clueList().length;S.lastOut=null;}
  root.innerHTML=view();
  for(const id in keep){const el=document.getElementById(id);if(el)el.value=keep[id];}
  if(focusId){const el=document.getElementById(focusId);if(el){el.focus();try{el.setSelectionRange(el.value.length,el.value.length)}catch(e){}}}
  const inGame=S.state==="ready"&&S.code&&G()&&G().phase==="jogo"&&S.players[S.me];
  const visible=!document.getElementById("tab-mansao").hidden&&!document.getElementById("mp").hidden;
  const dark=visible&&inGame&&!secret()&&role(S.me)!=="assassino";
  night.classList.toggle("on",!!dark);const nb=document.getElementById("nightLobby");if(nb)nb.hidden=!isHost();
  if(inGame&&!dark) maybeMurder();
  if(dark){const r=role(S.me);night.querySelector("p").textContent=r==="mestre"?"Você é o Mestre. Quando o assassino escolher, você verá o crime e poderá dar dicas.":r==="investigador"?"Você é Investigador. Feche os olhos enquanto o assassino escolhe…":"Feche os olhos enquanto o assassino escolhe…";}
  if(inGame){
    const n=clueList().length; if(n>S.lastClues){sfx("summon");} S.lastClues=n;
    const o=outcome(), key=o?o.who:null; if(key&&key!==S.lastOut){sfx(key==="inv"?"win":"lose");} S.lastOut=key;
  }
}
root.addEventListener("click",e=>{
  const t=e.target.closest("[data-act]"); if(!t||t.disabled) return;
  const a=t.dataset.act;
  if(a==="pick") return A.pick(t.dataset.k,+t.dataset.i);
  if(a==="sel") return A.sel(t.dataset.k,t.dataset.s,+t.dataset.i);
  if(a==="kick") return A.kick(t.dataset.id);
  if(a==="cartaz") return A.cartaz(t.dataset.k,+t.dataset.o);
  if(A[a]) A[a]();
});
root.addEventListener("keydown",e=>{
  if(e.key==="Enter"&&e.target.id==="mpClue"){e.preventDefault();A.clue();return;}
  if(e.key==="Enter"&&e.target.id==="mpCode"){e.preventDefault();A.join();return;}
  const c=e.target.closest&&e.target.closest(".card[data-act]");
  if(c&&(e.key==="Enter"||e.key===" ")){e.preventDefault();c.click();}
});

/* ---------- alternar modos ---------- */
const bMp=document.getElementById("modeMp"), bSolo=document.getElementById("modeSolo");
function mode(m){document.getElementById("mp").hidden=m!=="mp";document.getElementById("solo").hidden=m!=="solo";
  document.querySelectorAll(".soloOnly").forEach(x=>x.hidden=m!=="solo");
  bMp.setAttribute("aria-pressed",m==="mp");bSolo.setAttribute("aria-pressed",m==="solo");render();}
window.addEventListener("hashchange",()=>setTimeout(render,0));
document.getElementById("nightLobby").onclick=()=>A.lobby();
(function(){
  const b=document.createElement("button");b.id="nightLeave";b.textContent="Sair da sala";b.onclick=()=>A.leave();night.appendChild(b);
  const st=document.createElement("style");st.textContent=`
.timer{display:flex;justify-content:space-between;align-items:center;gap:1rem;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:.6rem 1rem;margin-bottom:1rem}
.timer b{font-family:"Nosifer","Creepster",fantasy;font-size:1.6rem;color:var(--clue);letter-spacing:.06em}
.timer.low b{color:var(--flame);animation:flick 1s infinite}
.mp-sub{font-family:"Creepster",fantasy;font-size:1.2rem;color:var(--clue);margin-top:.8rem}
.tile-row{display:flex;flex-wrap:wrap;gap:.35rem;margin:.35rem 0}
.tile-opt{font-size:.85rem;padding:.3rem .6rem;border-radius:999px}
.tile-opt.hot{border-color:var(--flame);color:var(--means)}
.tiles-all{margin-top:.6rem}
.tiles-all summary{cursor:pointer;color:var(--muted)}
.tile-cat{margin-top:.5rem}
.tile-cat b{font-size:.9rem;color:var(--muted)}
.clues li.is-tile{border-left:3px solid var(--flame)}
#nightLeave{margin-top:.5rem}`;
  document.head.appendChild(st);
  let last="";
  setInterval(()=>{
    if(!S.code||!G()||G().phase!=="jogo"||!secret()) return;
    const ck=clock(), o=outcome();
    const key=(o?o.who:"")+"|"+ck.state+"|"+(ck.round||"");
    const el=document.getElementById("mpTimer");
    if(el&&ck.state==="run") el.textContent=mmss(ck.left);
    if(key!==last){ if(last&&ck.state==="run") sfx("summon"); last=key; render(); }
  },1000);
})();
/* ---------- cena do assassinato ---------- */
function maybeMurder(){
  const s=secret(); if(!s||!S.code) return;
  const key="sm-cena-"+S.code+"-m"+match();
  if(ls.get(key)) return;
  ls.set(key,"1");
  if(Date.now()-(s.at||0)>60000) return;          /* quem chega muito depois não vê a cena */
  playMurder();
}
function playMurder(){
  if(document.getElementById("murder")) return;
  const reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  const o=document.createElement("div");
  o.id="murder"; o.className="murder"+(reduce?" calm":"");
  o.setAttribute("role","dialog"); o.setAttribute("aria-label","A morte de Cecília");
  o.innerHTML=`
  <svg viewBox="0 0 400 250" class="m-svg" aria-hidden="true">
    <defs>
      <radialGradient id="mGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
    </defs>
    <rect class="m-wall" x="0" y="0" width="400" height="250" fill="#120812"/>
    <rect x="250" y="35" width="90" height="105" rx="4" fill="#1d1430" stroke="#3a2450" stroke-width="4"/>
    <line x1="295" y1="35" x2="295" y2="140" stroke="#3a2450" stroke-width="3"/>
    <line x1="250" y1="88" x2="340" y2="88" stroke="#3a2450" stroke-width="3"/>
    <circle cx="318" cy="62" r="14" fill="#e8dcf5" opacity=".85"/>
    <rect x="0" y="205" width="400" height="45" fill="#0a040a"/>
    <g class="m-candle">
      <circle class="m-glow" cx="80" cy="150" r="70" fill="url(#mGlow)"/>
      <rect x="74" y="160" width="12" height="45" fill="#2a0f14"/>
      <path class="m-flame" d="M80 140 C 72 152, 74 160, 80 162 C 86 160, 88 152, 80 140 Z" fill="#ffb347"/>
    </g>
    <g class="m-cec">
      <circle cx="180" cy="104" r="13" fill="#d9c8e6"/>
      <path d="M167 100 C 165 125, 160 140, 156 150 L 170 120 Z M193 100 C 195 125, 200 140, 204 150 L 190 120 Z" fill="#3a1c2a"/>
      <path d="M180 117 L 156 205 L 204 205 Z" fill="#b9a3cc"/>
      <path d="M168 135 L 152 165 M192 135 L 208 165" stroke="#d9c8e6" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g class="m-kil">
      <path d="M70 205 C 70 150, 85 112, 110 100 C 135 112, 150 150, 150 205 Z" fill="#000"/>
      <path d="M90 108 C 92 82, 128 82, 130 108 C 122 100, 98 100, 90 108 Z" fill="#000"/>
      <circle class="m-eye" cx="102" cy="112" r="3" fill="#ff2b3b"/>
      <circle class="m-eye" cx="118" cy="112" r="3" fill="#ff2b3b"/>
      <path class="m-arm" d="M140 140 L 170 128" stroke="#000" stroke-width="9" stroke-linecap="round"/>
    </g>
    <path class="m-pool" d="M150 214 C 170 206, 230 206, 250 214 C 230 222, 170 222, 150 214 Z" fill="#7a0d18"/>
  </svg>
  <div class="m-flash"></div>
  <p class="m-t1">A vela se apagou…</p>
  <p class="m-t2">Cecília Albuquerque está morta.</p>
  <p class="m-t3">O Mestre vai guiar a investigação. Toque para continuar.</p>`;
  document.body.appendChild(o);
  if(!reduce) setTimeout(()=>sfx("lose"),2300);
  const close=()=>{o.classList.add("out");setTimeout(()=>o.remove(),500);};
  o.addEventListener("click",close);
  setTimeout(close,reduce?3500:7500);
}
(function(){
  const st=document.createElement("style");st.textContent=`
.murder{position:fixed;inset:0;z-index:50;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1.5rem;text-align:center;cursor:pointer;animation:mIn .6s ease both}
.murder.out{animation:mOut .5s ease both}
.m-svg{width:min(560px,94vw);height:auto;border-radius:10px;box-shadow:0 0 60px rgba(157,60,255,.25)}
.murder p{margin:0;color:#c9b6d6;font-family:"IM Fell English",Georgia,serif;font-size:1.1rem;opacity:0}
.murder .m-t2{font-family:"Creepster","Impact",fantasy;font-size:clamp(1.8rem,7vw,3rem);color:#e0192a;text-shadow:0 0 24px rgba(224,25,42,.6)}
.m-t1{animation:mTxt 1.6s .4s both}
.m-t2{animation:mShow .8s 3.4s both}
.m-t3{animation:mShow .8s 4.6s both}
.m-flame,.m-glow{transform-box:fill-box;transform-origin:50% 100%;animation:mFlick .25s infinite alternate,mOff .5s 1.6s forwards}
.m-glow{transform-origin:50% 50%}
.m-kil{opacity:0;transform:translateX(-90px);animation:mKil 1.2s 1.6s forwards,mGone .6s 3s forwards}
.m-eye{animation:mBlink 1.2s 1.8s infinite}
.m-cec{transform-box:fill-box;transform-origin:100% 100%;animation:mFall .9s 2.4s cubic-bezier(.5,0,.8,.4) forwards}
.m-wall{animation:mDark .6s 1.7s forwards}
.m-pool{opacity:0;transform-box:fill-box;transform-origin:50% 50%;transform:scale(.2);animation:mPool 1.6s 3.2s forwards}
.m-flash{position:fixed;inset:0;background:#e0192a;opacity:0;pointer-events:none;animation:mFlash .7s 2.3s}
@keyframes mIn{from{opacity:0}to{opacity:1}}
@keyframes mOut{to{opacity:0}}
@keyframes mTxt{0%{opacity:0}30%,75%{opacity:1}100%{opacity:0}}
@keyframes mShow{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes mFlick{from{transform:scale(1,1)}to{transform:scale(.9,1.1)}}
@keyframes mOff{to{transform:scale(0);opacity:0}}
@keyframes mKil{to{opacity:1;transform:translateX(0)}}
@keyframes mGone{to{opacity:0}}
@keyframes mBlink{0%,90%,100%{opacity:1}95%{opacity:0}}
@keyframes mFall{to{transform:rotate(-82deg) translate(10px,6px);opacity:.85}}
@keyframes mDark{to{fill:#060206}}
@keyframes mPool{to{opacity:.9;transform:scale(1)}}
@keyframes mFlash{0%{opacity:0}15%{opacity:.75}100%{opacity:0}}
.murder.calm *{animation:none!important}
.murder.calm p,.murder.calm .m-kil{opacity:1}
.murder.calm .m-kil{transform:none}`;
  document.head.appendChild(st);
})();
bMp.onclick=()=>mode("mp"); bSolo.onclick=()=>mode("solo");
mode("mp");
init();
})();
