const templateAvaliativo = document.createElement("template");
templateAvaliativo.innerHTML = `
<article class="text-block">
  <h2>Atividade: classifique as informações e passos do origami</h2>
  <p>Arraste cada bloco da área abaixo para a caixa correspondente:</p>
  <ul>
    <li><strong>Caixa verde:</strong> <em>Informação fixa</em> (ex.: papel quadrado 15×15 cm)</li>
    <li><strong>Caixa azul:</strong> <em>Informação variável</em> (ex.: cor do papel)</li>
    <li><strong>Caixa laranja:</strong> <em>Passo</em> (ex.: "Dobre ao meio na diagonal")</li>
  </ul>
  <div class="pool" id="pool" aria-label="Itens para classificar">
    <h3>Itens:</h3>
    <!-- draggable items injected by JS -->
  </div>

  <div style="display:flex; gap:12px; margin-top:12px; align-items:flex-start;">
    <div style="flex:1">
      <div class="dropzone drop-green" id="zone-fixed" data-kind="fixa" aria-label="Caixa de informação fixa">
        <div class="drop-title"><span>Informação fixa</span><span> (verde)</span></div>
        <div id="fixedList" class="drop-grid" aria-live="polite"></div>
      </div>
    </div>

    <div style="flex:1">
      <div class="dropzone drop-blue" id="zone-variable" data-kind="variavel" aria-label="Caixa de informação variável">
        <div class="drop-title"><span>Informação variável</span><span> (azul)</span></div>
        <div id="variableList" class="drop-grid" aria-live="polite"></div>
      </div>
    </div>

    <div style="flex:1">
      <div class="dropzone drop-orange" id="zone-step" data-kind="passo" aria-label="Caixa de passo">
        <div class="drop-title"><span>Passo</span><span> (laranja)</span></div>
        <div id="stepList" class="drop-grid" aria-live="polite"></div>
      </div>
    </div>
  </div>

  <div style="margin-top:14px; display:flex; gap:8px; align-items:center;">
    <button id="verifyBtn" class="btn secondary">Verificar</button>
    <button id="resetClassBtn" class="btn">Resetar classificações</button>
  </div>

  <div id="feedback" style="margin-top:12px;"></div>
  
</article>
`

class ComponenteAvaliativo extends HTMLElement {
  connectedCallback() {
    const clone = templateAvaliativo.content.cloneNode(true);
    this.appendChild(clone);
  }
}

customElements.define("componente-avaliativo", ComponenteAvaliativo);