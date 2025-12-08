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


function ensureId(el) {
  if (!el.id) el.id = 'item-' + Math.random().toString(36).slice(2, 9);
  return el.id;
}

function getElementAfter(list, y) {
  // retorna o elemento filho ('.item') após a posição y, ignorando o que estiver com .dragging
  const draggableElements = [...list.querySelectorAll('.item:not(.dragging)')];

  // se não houver, retorna null
  if (draggableElements.length === 0) return null;

  // percorre e encontra o primeiro cujo centro vertical é maior que y
  for (const child of draggableElements) {
    const rect = child.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;
    if (y < middleY) return child;
  }

  // se nenhum tiver middleY maior que y, retorna null (append no final)
  return null;
}

/* função principal */
function initAvaliacao() {
  // NodeLists -> arrays atualizados dinamicamente quando necessário
  const listas = Array.from(document.querySelectorAll('.lista'));
  const verifyBtn = document.getElementById('verifyBtn');
  const resetBtn = document.getElementById('resetBtn');

  if (verifyBtn) verifyBtn.addEventListener('click', processar);
  if (resetBtn) resetBtn.addEventListener('click', resetarListas);

  // garantir que somente .item seja arrastável; se item não tem id, gerar
  const itens = Array.from(document.querySelectorAll('.item'));
  itens.forEach(item => {
    item.setAttribute('draggable', 'true');
    ensureId(item);
  });

  // prevenir que containers (listas) fiquem arrastáveis ou iniciem drag indevido
  listas.forEach(lista => {
    lista.setAttribute('draggable', 'false');

    // se um dragstart acontecer na lista, só permitir se for sobre um .item
    lista.addEventListener('dragstart', e => {
      const alvoItem = e.target.closest('.item');
      if (!alvoItem) e.preventDefault();
    });
  });

  // DRAG START / END (delegado por item)
  document.addEventListener('dragstart', e => {
    const alvo = e.target.closest('.item');
    if (!alvo) return; // não é um item
    // marca e passa id via dataTransfer
    const id = ensureId(alvo);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    alvo.classList.add('dragging');
  });

  document.addEventListener('dragend', e => {
    const alvo = e.target.closest('.item');
    if (!alvo) return;
    alvo.classList.remove('dragging');
  });

  // LISTENERS PARA CADA LISTA
  listas.forEach(lista => {
    // permitir drop
    lista.addEventListener('dragover', e => {
      e.preventDefault();
      // usar e.currentTarget para garantir a lista correta
      const listaAlvo = e.currentTarget;
      listaAlvo.classList.add('over');

      // visual feedback ativo: opcional, calcula posição pra mostrar inserção
      const afterElement = getElementAfter(listaAlvo, e.clientY);
      // opcional: configurar um placeholder/linha de inserção (não implementado aqui
      // para manter simples — mas você pode usar afterElement pra mostrar algo)
    });

    lista.addEventListener('dragleave', e => {
      const listaAlvo = e.currentTarget;
      listaAlvo.classList.remove('over');
    });

    lista.addEventListener('drop', e => {
      e.preventDefault();
      e.stopPropagation();

      const listaAlvo = e.currentTarget;
      listaAlvo.classList.remove('over');

      // primeiro, tente pegar pelo querySelector('.dragging')
      let arrastado = document.querySelector('.dragging');

      // se por algum motivo não achar, tentar pelo dataTransfer id
      if (!arrastado) {
        const id = e.dataTransfer.getData('text/plain');
        if (id) arrastado = document.getElementById(id);
      }

      // se ainda não achou, aborta
      if (!arrastado) return;

      // segurança: não mover containers por engano
      if (!arrastado.classList.contains('item')) return;

      // inserir no local correto dentro da lista alvo
      const afterElement = getElementAfter(listaAlvo, e.clientY);

      if (afterElement == null) {
        listaAlvo.appendChild(arrastado);
      } else {
        listaAlvo.insertBefore(arrastado, afterElement);
      }
    });
  });

  // opcional: reset inicial (se existir função no seu código)
  resetarListas();
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

function avaliar(){
  const componenteLog = document.getElementById('log');
  componenteLog.innerHTML = "<div></div>";

  const resultado1 = proessar([50],"10 faltaram");
  const resultado2 = proessar([75],"15 sobraram");

}

function processar(entradas, saida){
  const lista = document.createElement('ol');

  var itensB = [...document.querySelectorAll('.item')];
  var itens = Array.from(itensB);

  itens.forEach(item => {
    markResult(item,null)
  });

  var valorTrabalho = 0;
  var valorFinal;

  var indice_entrada = 0;

  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];
    if(item){
      const instrucao = item.getAttribute("instrucao"); 
      const text = item.textContent; 
      var msg = text.split(":")[0] + " => ";

      if(!instrucao) return;

      const [acao, numeroB] = instrucao.split(" ");
      var numero = numeroB;

      if(numero){
        numero = numero.replace("_", " ");
      }

      if(acao === "multiplica"){
        msg += valorTrabalho + " X " + numero + " = ";
        valorTrabalho = valorTrabalho * numero;
        msg += valorTrabalho;
      }else if(acao === "subtrai"){
        msg += valorTrabalho + " - " + numero + " = ";
        valorTrabalho = valorTrabalho - numero;
        msg += valorTrabalho;
      }else if(acao === "recebe"){
        msg += " = " + entradas[indice_entrada];
        valorTrabalho = entradas[indice_entrada];
        indice_entrada += 1;
      }else if(acao === "soma"){
        msg += valorTrabalho + " + " + numero + " = ";
        valorTrabalho = valorTrabalho + numero;
        msg += valorTrabalho;
      }else if(acao === "seMaior"){
        msg += valorTrabalho + " é maior ou igual a " + numero + " ? ";
        var listas2 = item.querySelectorAll('.lista');

        var tamanhoSe = listas2[0].querySelectorAll('.item').length;
        var tamanhoSeNao = listas2[1].querySelectorAll('.item').length;

        if(valorTrabalho >= numero){
          for (let i2 = 0; i2 < tamanhoSeNao; i2++) {
            delete itens[i + tamanhoSe + i2 + 1];
          }
        }else{
          for (let i2 = 0; i2 < tamanhoSe; i2++) {
            delete itens[i + i2 + 1];
          }
        }

        msg += valorTrabalho >= numero ? "Sim" : "Não";
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
    }
  }

  const correto = valorFinal === saida;

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

  const componenteLog = document.createElement('div');
  if(componenteLog != null){
    if(correto){
      componenteLog.innerHTML = "<div><h3 style = \"color: green;\">(Correto) Execução dos passos para os valores ("+entradas+"):</h3></div>";
      lista.querySelectorAll('.draggable').forEach(item => {
        item.classList.add('result-correct');
      });
    }else{
      componenteLog.innerHTML = "<div><h3 style = \"color: red;\">(Errado) Execução dos passos para os valores ("+entradas+"):</h3></div>";
      lista.querySelectorAll('.draggable').forEach(item => {
        item.classList.add('result-wrong');
      });
    }
    
    componenteLog.appendChild(lista);
  }

  return correto;
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