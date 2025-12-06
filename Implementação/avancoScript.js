// Depende de:
/*
const fase
const backPage
const nextPage
const jumpPage

Elemento com id statusBadge
Botão com id concluirBtn
Botão com id apagarBtn
Botão com id backBtn
Botão com id jumpBtn
Botão com id nextBtn
*/

// Obtém elementos
const statusBadge = document.getElementById('statusBadge');
const concluirBtn = document.getElementById('concluirBtn');
const apagarBtn = document.getElementById('apagarBtn');

const backBtn = document.getElementById('backBtn');
const jumpBtn = document.getElementById('jumpBtn');
const nextBtn = document.getElementById('nextBtn');

// Verifica se a fase está concluída
function foiConcluida() {
  const v = localStorage.getItem(fase);
  if (v === null) {
    localStorage.setItem(fase, 'nao concluida');
    return false;
  }
  return v === 'concluida';
}

// Marca como concluída
function concluirFase() {
  if (concluirBtn.disabled) return;
  localStorage.setItem(fase, 'concluida');
  atualizarStatus();
}

// Apaga progresso
function apagarAvanco() {
  localStorage.setItem(fase, 'nao concluida');
  atualizarStatus();
}

// Atualiza UI
function atualizarStatus() {
  statusBadge.classList.remove('status-pendente', 'status-concluido');

  if (foiConcluida()) {
    statusBadge.textContent = 'Concluído';
    statusBadge.classList.add('status-concluido');
    nextBtn.disabled = false;
    jumpBtn.disabled = false;
  } else {
    statusBadge.textContent = 'Pendente';
    statusBadge.classList.add('status-pendente');
    nextBtn.disabled = true;
    jumpBtn.disabled = true;
  }
}

// Inicializa estado
atualizarStatus();

// Eventos
concluirBtn.addEventListener('click', concluirFase);
apagarBtn.addEventListener('click', apagarAvanco);

backBtn.addEventListener('click', () => window.location.href = backPage);
jumpBtn.addEventListener('click', () => {
    window.location.href = nextPage;
    
});
nextBtn.addEventListener('click', () => window.location.href = jumpPage);
