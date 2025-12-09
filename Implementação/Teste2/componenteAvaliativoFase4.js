const templateAvaliativo = document.createElement("template");
templateAvaliativo.innerHTML = `
<article class="text-block">
  <h2>
    Atividade: ordene os passos para o cálculo do resto de uma divisão
  </h2>
  <p>
    Orde os passos para obter o resto da divisão de dois números. Se o divisor for 0, devolva "Divisão por 0, erro!"
  </p>
  <h3>
    Sequência de passos da solução:
  </h3>
  <div class="testeBlocosLista lista dropzone drop-orange" id="listaA">
    <div class="item draggable" draggable="true" data-ordemDestino="1" data-listaDestino="listaA" instrucao = "recebe #divisor">
      Receber o divisor
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="2" data-listaDestino="listaA" instrucao = "seIgual 0">
      Se o valor é igual a 0:
      <div class="testeBlocosLista lista dropzone drop-orange" id="listaB">
        <div class="item draggable" draggable="true" data-ordemDestino="3" data-listaDestino="listaA" instrucao = "recebe Divisão_por_0,_erro!">
          Receber "Divisão por 0, erro!"
        </div>
        <div class="item draggable" draggable="true" data-ordemDestino="4" data-listaDestino="listaA" instrucao = "responder">
          Responder valor final
        </div>
      </div>
      Se não:
      <div class="testeBlocosLista lista dropzone drop-orange" id="listaC">
        <div class="item draggable" draggable="true" data-ordemDestino="5" data-listaDestino="listaA" instrucao = "recebe #dividendo">
          Receber o dividendo
        </div>
        <div class="item draggable" draggable="true" data-ordemDestino="6" data-listaDestino="listaA" instrucao = "enquantoMaior #divisor">
          Enquanto o valor for maior que o divisor:
          <div class="testeBlocosLista lista dropzone drop-orange" id="listaD">
            <div class="item draggable" draggable="true" data-ordemDestino="7" data-listaDestino="listaA" instrucao = "subtrai #divisor">
              Subtrair divisor
            </div>
          </div>
        </div>
        <div class="item draggable" draggable="true" data-ordemDestino="8" data-listaDestino="listaA" instrucao = "responder">
          Responder valor final
        </div>
      </div>
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