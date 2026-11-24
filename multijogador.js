(function(){
"use strict";
const MEIOS=[["Boneco de vodu","🪆"],["Faca cerimonial","🗡️"],["Corda de enforcado","🪢"],["Espelho amaldiçoado","🪞"],["Tábua Ouija","🔤"],["Vela negra","🕯️"],["Beladona","🌿"],["Água benta profanada","💧"],["Livro dos mortos","📕"],["Adaga de prata","🔪"],["Sal negro","🧂"],["Caixa de música","🎶"],["Retrato possuído","🖼️"],["Sino fúnebre","🔔"],["Incensário profano","⚱️"],["Cálice de sangue","🍷"],["Foice enferrujada","🌾"],["Pregos de caixão","📌"],["Máscara de peste","🎭"],["Lamparina a óleo","🏮"],["Ossos de gato","🦴"],["Fumaça de enxofre","💨"],["Cravo envenenado","🌺"],["Relógio parado","🕰️"]];
const VEST=[["Cinzas","🌫️"],["Pena de corvo","🪶"],["Cera negra","⚫"],["Mecha de cabelo","➰"],["Dente humano","🦷"],["Fotografia antiga","📷"],["Terra de cova","⚰️"],["Pétala murcha","🥀"],["Sangue seco","🩸"],["Pegadas molhadas","👣"],["Unhas arrancadas","💅"],["Rosário partido","📿"],["Pelo de gato preto","🐈‍⬛"],["Asa de mariposa","🦋"],["Diário rasgado","📓"],["Moeda antiga","🪙"],["Chave enferrujada","🗝️"],["Luva rasgada","🧤"],["Botão de osso","🔘"],["Carta sem remetente","✉️"],["Teia de aranha","🕸️"],["Gota de mercúrio","⚗️"],["Fita de luto","🎀"],["Vidro estilhaçado","🪟"]];
const MIN=4,MAX=9;
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
    const s=secret(); const n=norm(t);
    const names=[];holders().forEach(id=>{const h=G().hands[id];h.m.forEach(i=>names.push(MEIOS[i][0]));h.c.forEach(i=>names.push(VEST[i][0]));});
    const bad=names.find(x=>n.includes(norm(x)));
    if(bad){S.msg="A dica não pode citar o nome de uma carta (“"+bad+"”).";return render();}
    const list=clueList().concat([{t,at:Date.now()}]);
    run(async()=>{await S.db.doc("games/"+S.code+"/clues/m"+match()).set({match:match(),list});const e=document.getElementById("mpClue");if(e)e.value="";});},
  sel:(k,s,i)=>{if(s===S.me)return;if(S.sel.s!==s)S.sel={s,m:null,c:null};S.sel[k]=S.sel[k]===i?null:i;if(S.sel.m==null&&S.sel.c==null)S.sel.s=null;S.confirm=false;render();},
  guess:()=>{const g=S.sel;if(g.s==null||g.m==null||g.c==null)return;if(!S.confirm){S.confirm=true;return render();}
    run(async()=>{await S.db.doc("games/"+S.code+"/guesses/m"+match()+"_"+S.me).set({match:match(),by:S.me,s:g.s,m:g.m,c:g.c,at:Date.now()});S.confirm=false;});},
  cancelGuess:()=>{S.confirm=false;render();}
};

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
  <div class="mp-row">${btn("confirmPick","Cometer o crime","danger",p.m==null||p.c==null)}</div>${msg()}</div>`;
}
function vBoard(){
  const r=role(S.me), s=secret(), out=outcome(), gs=guessList(), mine=myGuess(), clues=clueList();
  const showSecret=r==="mestre"||(r==="assassino")||out;
  const canGuess=r==="investigador"&&!mine&&!out;
  let banner="";
  if(out){
    const crime=`<b>${esc(nameOf(s.by))}</b> usou <b>${esc(MEIOS[s.m][0])}</b> e deixou <b>${esc(VEST[s.c][0])}</b>.`;
    banner=out.who==="inv"?`<div class="banner win"><h2>Caso resolvido!</h2><p>${esc(nameOf(out.g.by))} acertou: ${crime}</p></div>`
      :`<div class="banner"><h2>O assassino escapou</h2><p>Nenhum investigador acertou. ${crime}</p></div>`;
  }
  const top=`<div class="mp-top"><span class="role role-${r||"esp"}">${r?"Você é "+(r==="investigador"?"Investigador":"o "+roleName[r]):"Você está assistindo"}</span>
    <span class="mp-row" style="margin:0"><span class="pill">Sala <b>${esc(S.code)}</b></span>${btn("leave","Sair")}</span></div>`;
  const master=r==="mestre"&&s?`<div class="panel secretbox"><h3>O crime</h3><p><b>${esc(nameOf(s.by))}</b> é o assassino.</p>
    <div class="cards two">${cardHTML("m",s.by,s.m,"sel")}${cardHTML("c",s.by,s.c,"sel")}</div><p class="mp-note">Guie os investigadores com dicas, sem citar nomes de cartas.</p></div>`:"";
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
    <div class="panel"><h3>Dicas do Mestre</h3>${clues.length?`<ol class="clues">${clues.map(c=>`<li>${esc(c.t)}</li>`).join("")}</ol>`:`<p class="mp-note">${r==="mestre"?"Escreva a primeira dica.":"O Mestre ainda não deu nenhuma dica."}</p>`}
      ${r==="mestre"&&!out?`<div class="mp-row"><input type="text" id="mpClue" maxlength="140" placeholder="Ex.: algo que queima devagar">${btn("clue","Enviar","primary")}</div>`:""}</div>
    <div class="panel"><h3>Palpites</h3>${gs.length?`<ul class="glist">${gs.map(g=>{const ok=s&&g.s===s.by&&g.m===s.m&&g.c===s.c;return `<li class="${ok?"ok":"bad"}"><b>${esc(nameOf(g.by))}</b> acusou ${esc(nameOf(g.s))}: ${esc(MEIOS[g.m][0])} + ${esc(VEST[g.c][0])} ${ok?"✔":"✘"}</li>`}).join("")}</ul>`:`<p class="mp-note">Ninguém palpitou ainda. Cada investigador tem uma única chance.</p>`}
      <p class="mp-note">${investigators().filter(id=>!gs.some(g=>g.by===id)).length} investigador(es) ainda com palpite.</p></div>
    ${isHost()?`<div class="panel"><h3>Anfitrião</h3><div class="mp-row">${btn("start","Nova partida",out?"primary":"",sortedPlayers().length<MIN)}${btn("lobby","Voltar ao lobby")}</div></div>`:""}
  </aside>`;
  return `${top}${banner}${msg()}<div class="mp-grid"><div class="mp-main">${master}${ass}<div class="suspects">${sus}</div>${guessBar}</div>${side}</div>`;
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
bMp.onclick=()=>mode("mp"); bSolo.onclick=()=>mode("solo");
mode("mp");
init();
})();
