// Depende de:
/*
  Este script depende de cada .item possuir os atributos:
    - data-listaDestino: indica a lista para a qual o item deve ir
    - data-ordemDestino: indica a posição correta dentro da lista
  Os itens devem estar dentro de .lista no HTML.
  Sem esses atributos, as funções de validação e reset não funcionarão.
*/
// precisa ser chamada por initAvaliacao()
// pode receber funções ativadas nos caso de aprovação (funAprov) ou reset (funReset).
var funReset = () => {};
var funAprov = () => {};


function initAvaliacao(){
  const itens = [...document.querySelectorAll('.item')];
  const listas = [...document.querySelectorAll('.lista')];
  const verifyBtn = document.getElementById('verifyBtn');
  const resetBtn = document.getElementById('resetBtn');

  verifyBtn.addEventListener('click', processar);
  resetBtn.addEventListener('click', resetarListas);

  let itemArrastado = null;

  itens.forEach(item => {
    item.addEventListener('dragstart', e => {
      itemArrastado = item;
      e.dataTransfer.effectAllowed = "move";
    });

    item.addEventListener('dragend', () => {
      itemArrastado = null;
    });
  });

  listas.forEach(lista => {
    lista.addEventListener('dragover', e => {
      e.preventDefault();
      lista.classList.add('over');
    });

    lista.addEventListener('dragleave', () => {
      lista.classList.remove('over');
    });

    lista.addEventListener('drop', e => {
      e.preventDefault();
      lista.classList.remove('over');

      if (!itemArrastado) return;

      const afterElement = getElementAfter(lista, e.clientY);

      if (afterElement == null)
        lista.appendChild(itemArrastado);
      else
        lista.insertBefore(itemArrastado, afterElement);
    });
  });

  resetarListas();
}

function getElementAfter(container, y) {
  const itens = [...container.querySelectorAll('.item:not(.dragging)')];

  return itens.find(item => {
    const box = item.getBoundingClientRect();
    return y < box.top + box.height / 2;
  });
}

function resetarListas() {
  const itens = [...document.querySelectorAll('.item')];

  const agrupados = itens.reduce((acc, item) => {
    const destino = item.dataset.listadestino;
    if (!acc[destino]) acc[destino] = [];
    acc[destino].push(item);
    return acc;
  }, {});

  for (const listaId in agrupados) {
    const lista = document.getElementById(listaId);
    lista.innerHTML = "";

    agrupados[listaId]
      .sort((a, b) => a.dataset.ordemdestino - b.dataset.ordemdestino)
      .forEach(item => lista.appendChild(item));
  }

  itens.forEach(item => {
    markResult(item, null);
  });

  funReset();
}

function processar(){
  const lista = document.createElement('ol');

  const itens = [...document.querySelectorAll('.item')];

  var valorTrabalho = 0;
  var valorFinal;

  itens.forEach(item => {
    const instrucao = item.getAttribute("instrucao"); 
    const text = item.textContent; 
    var msg = text + " => ";

    if(!instrucao) return;

    const [acao, numero] = instrucao.split(" ");

    if(acao === "multiplica"){
      msg += valorTrabalho + " X " + numero + " = ";
      valorTrabalho = valorTrabalho * numero;
      msg += valorTrabalho;
    }else if(acao === "subtrai"){
      msg += valorTrabalho + " - " + numero + " = ";
      valorTrabalho = valorTrabalho - numero;
      msg += valorTrabalho;
    }else if(acao === "recebe"){
      msg += " = " + numero;
      valorTrabalho = numero;
    }else if(acao === "responder"){
      if(valorFinal == null){
        valorFinal = valorTrabalho;
      }
      msg += "Resposta final = " + valorFinal;
    }else{
      msg += "Instrução estranha";
    }

    const li = document.createElement('li');
    li.classList.add("draggable");
    li.textContent = msg;
    lista.appendChild(li);
  });

  const correto = valorFinal === 40

  if(correto){
    itens.forEach(item => {
      markResult(item, true);
    });
    funAprov();
  }else{
    itens.forEach(item => {
      markResult(item, false);
    });
  }

  const componenteLog = document.getElementById('log');
  if(componenteLog != null){
    if(correto){
      componenteLog.innerHTML = "<div><h3 style = \"color: green;\">(Correto) Execução dos passos:</h3></div>";
      lista.querySelectorAll('.draggable').forEach(item => {
        item.classList.add('result-correct');
      });
    }else{
      componenteLog.innerHTML = "<div><h3 style = \"color: red;\">(Errado) Execução dos passos:</h3></div>";
      lista.querySelectorAll('.draggable').forEach(item => {
        item.classList.add('result-wrong');
      });
    }
    
    componenteLog.appendChild(lista);
    const li = document.createElement('li');
  }
}

function markResult(node, ok){
  if(!node) return;
  // remove previous markers
  node.classList.remove('result-correct','result-wrong');
  if(ok === null){
    return;
  }
  if(ok){
    node.classList.add('result-correct');
  } else {
    node.classList.add('result-wrong');
  }
}