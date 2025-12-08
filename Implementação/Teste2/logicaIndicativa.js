// depende de const fase
// pode recerber funções ativadas nos casos de ser concluida (funConcl) ou apagada (conApaga).
// precisa ser chamada a função foiConcluida()
const statusBadge = document.getElementById('statusBadge');
var funConcl = () => {};
var funApaga = () => {};

function foiConcluida() {
  const valor = localStorage.getItem(fase);
  statusBadge.classList.remove('status-pendente', 'status-concluido');
  if (valor === null) {
    localStorage.setItem(fase, 'nao concluida');
    statusBadge.textContent = 'Pendente';
    statusBadge.className = 'status-badge status-pendente';
  }
  if(valor === 'concluida'){
    statusBadge.textContent = 'Concluído';
    statusBadge.className = 'status-badge status-concluido';
    funConcl();
  }else{
    statusBadge.textContent = 'Pendente';
    statusBadge.className = 'status-badge status-pendente';
    funApaga();
  }
}

function concluirFase(){
  localStorage.setItem(fase, 'concluida');
  statusBadge.classList.remove('status-pendente', 'status-concluido');
  statusBadge.textContent = 'Concluído';
  statusBadge.className = 'status-badge status-concluido';
  funConcl();
}

function apagarAvanco(){
  localStorage.setItem(fase, 'nao concluida');
  statusBadge.classList.remove('status-pendente', 'status-concluido');
  statusBadge.textContent = 'Pendente';
  statusBadge.className = 'status-badge status-pendente';
  funApaga();
}