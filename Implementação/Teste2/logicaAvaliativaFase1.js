
// depende de const storageKey
// precisa ser chamada por initAvaliacao()
// pode receber funções ativadas nos caso de aprovação (funAprov) ou reset (funReset).
var funReset = () => {};
var funAprov = () => {};

const items = [
  { id: "i1", text: "O papel deve ser quadrado (15 × 15 cm).", correct: "fixa" },
  { id: "i2", text: "Cor do papel (pode ser qualquer cor).", correct: "variavel" },
  { id: "i3", text: "Dobre o papel ao meio na diagonal, formando um triângulo.", correct: "passo" },
  { id: "i4", text: "Dobre as pontas inferiores para cima.", correct: "passo" },
  { id: "i5", text: "Material: papel", correct: "fixa" },
  { id: "i6", text: "Tipo do papel", correct: "variavel" },
  { id: "i7", text: "Dobrar as abas internas para dar forma ao casco.", correct: "passo" },
];

const pool = document.getElementById('pool');
const fixedList = document.getElementById('fixedList');
const variableList = document.getElementById('variableList');
const stepList = document.getElementById('stepList');
const verifyBtn = document.getElementById('verifyBtn');
const resetClassBtn = document.getElementById('resetClassBtn');
const feedback = document.getElementById('feedback');


let dragId = null;

function shuffleArray(a){
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createDraggable(item){
  const div = document.createElement('div');
  div.className = 'draggable';
  div.setAttribute('draggable', 'true');
  div.id = item.id;
  div.textContent = item.text;
  div.dataset.correct = item.correct;
  div.setAttribute('role','listitem');
  div.setAttribute('aria-grabbed','false');

  div.addEventListener('dragstart', (e) => {
    dragId = item.id;
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
    div.setAttribute('aria-grabbed','true');
  });

  div.addEventListener('dragend', () => {
    dragId = null;
    div.setAttribute('aria-grabbed','false');
  });

  return div;
}

function renderPool(){
  pool.querySelectorAll('.draggable').forEach(n => n.remove());
  const shuffled = shuffleArray(items.slice());
  shuffled.forEach(it => {
    const node = createDraggable(it);
    pool.appendChild(node);
  });
}

function allowDrop(e){ e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
function onZoneDragEnter(e){ e.preventDefault(); e.currentTarget.classList.add('over'); }
function onZoneDragLeave(e){ e.currentTarget.classList.remove('over'); }

function onDrop(e){
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const node = document.getElementById(id);
  if(!node) return;
  const zone = e.currentTarget;
  zone.classList.remove('over');

  // Append node to zone container element (the inner list)
  const inner = zone.querySelector('.drop-grid');
  inner.appendChild(node);

  saveClassificationsToStorage(); // persist
}

// Setup dropzones
function setupDropzones(){
  const zones = document.querySelectorAll('.dropzone');
  zones.forEach(z => {
    z.addEventListener('dragover', allowDrop);
    z.addEventListener('dragenter', onZoneDragEnter);
    z.addEventListener('dragleave', onZoneDragLeave);
    z.addEventListener('drop', onDrop);
  });
  // Make pool accept drops (to return an item)
  pool.addEventListener('dragover', allowDrop);
  pool.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const node = document.getElementById(id);
    if(node){
      pool.appendChild(node);
      saveClassificationsToStorage();
    }
  });
}

/*******************************
 * Check / verify logic
 *******************************/
function gatherAssignments(){
  // return map id => assignedKind ('fixa','variavel','passo' or null if in pool)
  const map = {};
  items.forEach(it => { map[it.id] = null; });
  // zones
  fixedList.querySelectorAll('.draggable').forEach(n => map[n.id] = 'fixa');
  variableList.querySelectorAll('.draggable').forEach(n => map[n.id] = 'variavel');
  stepList.querySelectorAll('.draggable').forEach(n => map[n.id] = 'passo');
  // pool => null
  pool.querySelectorAll('.draggable').forEach(n => { if(map[n.id] === null) map[n.id] = null; });
  return map;
}

function verify(){
  const assignments = gatherAssignments();
  let totalToCheck = 0;
  let correctCount = 0;
  feedback.innerHTML = '';

  items.forEach(it => {
    const assigned = assignments[it.id]; // 'fixa','variavel','passo' or null
    const node = document.getElementById(it.id);
    // only evaluate non-irrelevant items (irrelevantes should stay in pool => assigned === null)
    if(it.correct === 'irrelevante'){
      totalToCheck++; // we'll check that it stayed in pool (assigned === null)
      const ok = (assigned === null);
      markResult(node, ok);
      if(ok) correctCount++;
    } else {
      // for teachable focus: require that all non-irrelevant items are placed (not null)
      totalToCheck++;
      const ok = (assigned === it.correct);
      markResult(node, ok);
      if(ok) correctCount++;
    }
  });

  const pct = Math.round((correctCount/totalToCheck) * 100);
  const msg = `<strong>Resultado:</strong> ${correctCount} de ${totalToCheck} corretos (${pct}%).`;
  feedback.innerHTML = `<div style="font-weight:700; margin-bottom:6px;">${msg}</div>`;
  // list quick tips
  const wrongs = items.filter(it => {
    const assigned = gatherAssignments()[it.id];
    if(it.correct === 'irrelevante') return assigned !== null;
    return assigned !== it.correct;
  });
  if(wrongs.length){
    const ul = document.createElement('ul');
    wrongs.forEach(w => {
      const li = document.createElement('li');
      li.textContent = `${w.text}`;
      ul.appendChild(li);
    });
    const p = document.createElement('div');
    p.innerHTML = '<em>Verifique os itens abaixo:</em>';
    feedback.appendChild(p);
    feedback.appendChild(ul);
  } else {
    const p = document.createElement('div');
    p.style.marginTop = '6px';
    p.style.color = 'green';
    p.textContent = 'Tudo correto! Você pode concluir a fase.';
    feedback.appendChild(p);
  }
  if(!(wrongs.length)){
    funAprov();
  }
  saveClassificationsToStorage();
}

function markResult(node, ok){
  if(!node) return;
  // remove previous markers
  node.classList.remove('result-correct','result-wrong');
  if(ok){
    node.classList.add('result-correct');
  } else {
    node.classList.add('result-wrong');
  }
}

function saveClassificationsToStorage(){
  const map = gatherAssignments();
  localStorage.setItem(storageKey, JSON.stringify(map));
}

function loadClassificationsFromStorage(){
  //const raw = localStorage.getItem(storageKey);
  const raw = null;
  if(!raw) return false;
  try {
    const map = JSON.parse(raw);
    // First, move everything back to pool
    pool.querySelectorAll('.draggable').forEach(n => pool.appendChild(n));
    // Then place according to map
    Object.entries(map).forEach(([id, assigned]) => {
      const node = document.getElementById(id);
      if(!node) return;
      if(assigned === 'fixa') fixedList.appendChild(node);
      else if(assigned === 'variavel') variableList.appendChild(node);
      else if(assigned === 'passo') stepList.appendChild(node);
      else pool.appendChild(node);
    });
    return true;
  } catch(e){
    console.error(e);
    return false;
  }
}

function resetClassifications(){
  // move all to pool
  document.querySelectorAll('.drop-grid .draggable').forEach(n => pool.appendChild(n));
  // remove markings
  document.querySelectorAll('.draggable').forEach(n => {
    n.classList.remove('result-correct','result-wrong');
  });
  localStorage.removeItem(storageKey);
  feedback.innerHTML = '';
  funReset();
}


function initAvaliacao(){
  renderPool();
  setupDropzones();
  loadClassificationsFromStorage();
}


verifyBtn.addEventListener('click', verify);
resetClassBtn.addEventListener('click', resetClassifications);


