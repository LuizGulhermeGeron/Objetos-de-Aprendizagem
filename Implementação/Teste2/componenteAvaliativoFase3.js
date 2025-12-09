const templateAvaliativo = document.createElement("template");
templateAvaliativo.innerHTML = `
<article class="text-block">
  <h2>
    Atividade: ordene os passos para o cálculo do saldo de Roberto
  </h2>
  <p>
    Roberto acabou de receber sua mesada, R$ XX,XX. Ele comprou um sorvete de R$ 12,00 e emprestou R$ 30,00 para a irmã. Estava devendo R$ 18,00 para um amigo. Roberto conseguiu pagar o amigo? Se não, quanto faltou (responda "X faltaram")? Se sim, quanto lhe sobrou (responda "X sobraram")? 
  </p>
  <h3>
    Sequência de passos da solução:
  </h3>
  <div class="testeBlocosLista lista dropzone drop-orange" id="listaA">
    <div class="item draggable" draggable="true" data-ordemDestino="7" data-listaDestino="listaA" instrucao = "recebe mesada">
      Receber o valor da mesada
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="8" data-listaDestino="listaA" instrucao = "subtrai 12">
      Subtrair o valor do sorvete (12)
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="10" data-listaDestino="listaA" instrucao = "subtrai 30">
      Subtrair o valor emprestado para a irmã (30)
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="9" data-listaDestino="listaA" instrucao = "subtrai 18">
      Subtrair o valor devido para o amigo (18)
    </div>
    <div class="item draggable" draggable="true" data-ordemDestino="6" data-listaDestino="listaA" instrucao = "seMaior 0">
      Se o valor é igual ou maior do que 0:
      <div class="testeBlocosLista lista dropzone drop-orange" id="listaB">
        <div class="item draggable" draggable="true" data-ordemDestino="3" data-listaDestino="listaA" instrucao = "soma _sobraram">
          Somar "sobraram"
        </div>
        <div class="item draggable" draggable="true" data-ordemDestino="5" data-listaDestino="listaA" instrucao = "responder">
          Responder valor final
        </div>
      </div>
      Se não:
      <div class="testeBlocosLista lista dropzone drop-orange" id="listaC">
        <div class="item draggable" draggable="true" data-ordemDestino="4" data-listaDestino="listaA" instrucao = "multiplica -1">
          Multiplica por -1
        </div>
        <div class="item draggable" draggable="true" data-ordemDestino="3" data-listaDestino="listaA" instrucao = "soma _faltaram">
          Somar "faltaram"
        </div>
        <div class="item draggable" draggable="true" data-ordemDestino="1" data-listaDestino="listaA" instrucao = "responder">
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