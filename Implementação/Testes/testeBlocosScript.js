// Depende de:
/*
  Este script depende de cada .item possuir os atributos:
    - data-listaDestino: indica a lista para a qual o item deve ir
    - data-ordemDestino: indica a posição correta dentro da lista
  Os itens devem estar dentro de .lista no HTML.
  Sem esses atributos, as funções de validação e reset não funcionarão.
*/

// ========= Seletores agrupados =========
const itens = [...document.querySelectorAll('.item')];
const listas = [...document.querySelectorAll('.lista')];

let itemArrastado = null;

// ========= Drag & Drop =========
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

function getElementAfter(container, y) {
  const itens = [...container.querySelectorAll('.item:not(.dragging)')];

  return itens.find(item => {
    const box = item.getBoundingClientRect();
    return y < box.top + box.height / 2;
  });
}

// ========= Validação =========
function validarListas() {
  let erros = [];

  listas.forEach(lista => {
    const idLista = lista.id || "(lista sem id)";
    const itens = [...lista.querySelectorAll('.item')];

    itens.forEach((item, index) => {
      const ordemCorreta = parseInt(item.dataset.ordemdestino);
      const listaCorreta = item.dataset.listadestino;

      const ordemAtual = index + 1;
      const listaAtual = idLista;

      if (listaAtual !== listaCorreta) {
        erros.push(`❌ ${item.textContent.trim()}: está na lista "${listaAtual}", deveria estar em "${listaCorreta}".`);
      }

      if (ordemAtual !== ordemCorreta) {
        erros.push(`❌ ${item.textContent.trim()}: ordem atual ${ordemAtual}, correto seria ${ordemCorreta}.`);
      }
    });
  });

  if (erros.length === 0) {
    alert("✔ Tudo correto!");
  } else {
    alert("Erros encontrados:\n\n" + erros.join("\n"));
  }
}

// ========= Reset =========
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
}
