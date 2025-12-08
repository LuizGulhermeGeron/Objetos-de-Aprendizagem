const templateIndicativo = document.createElement("template");
templateIndicativo.innerHTML = `
<span id="statusBadge" class="status-badge">Pendente</span>
`;

class ComponenteIndicativo extends HTMLElement {
  connectedCallback() {
    const clone = templateIndicativo.content.cloneNode(true);
    this.appendChild(clone);
  }
}

customElements.define("componente-indicativo", ComponenteIndicativo);
