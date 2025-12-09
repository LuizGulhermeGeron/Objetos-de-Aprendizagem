const templateAvaliativo = document.createElement("template");
templateAvaliativo.innerHTML = `
<article class="text-block">
  <h2>
    Atividade: ordene os passos para o cálculo de ração
  </h2>
  <p>
    Rosa tem uma fazenda com 5 animais. Cada animal come 2 kg de ração por dia. Rosa tem um saco com 30 kg de ração. Ela quer saber quanta ração precisará comprar para poder alimentar seus animais por 7 dias. Rosa já sabe os passos para resolver esse problema, mas se esqueceu da ordem correta em que devem ser feitos. Ordene os passos.
  </p>
  <h3>
    Sequência de passos da solução:
  </h3>
  <div class="testeBlocosLista lista dropzone drop-orange" id="listaA">
    <div class="item draggable" draggable="true" data-ordemDestino="5" data-listaDestino="listaA" instrucao = "recebe 5">
      Receber a quantidade de animais (5)
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="2" data-listaDestino="listaA" instrucao = "multiplica 2">
      Multiplicar pela quantidade de ração que cada animal come em um dia (2)
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="4" data-listaDestino="listaA" instrucao = "multiplica 7">
      Multiplicar pelo número de dias (7)
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="3" data-listaDestino="listaA" instrucao = "subtrai 30">
      Subtrair quantidade de ração que Rosa já tem (30)
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="1" data-listaDestino="listaA" instrucao = "responder">
      Responder valor final
    </div>
  </div>

  <div style="margin-top:14px; display:flex; gap:8px; align-items:center;">
    <button id="verifyBtn" class="btn secondary">Verificar</button>
    <button id="resetBtn" class="btn">Resetar ordenação</button>
  </div>

  <div id="log"></div>
</article>
`

class ComponenteAvaliativo extends HTMLElement {
  connectedCallback() {
    const clone = templateAvaliativo.content.cloneNode(true);
    this.appendChild(clone);
  }
}

customElements.define("componente-avaliativo", ComponenteAvaliativo);