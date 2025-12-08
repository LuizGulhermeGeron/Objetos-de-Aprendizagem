const template = document.createElement("template");
template.innerHTML = `
  <h1 id="page-title" class="title-box">2. Sequência Correta
    <span id="statusBadge" class="status-badge">Pendente</span>
  </h1>

  <article class="text-block">
    <h2>
      Sendo um <b style="color: blue;">algoritmo</b> uma sequência de passos, é necessário definir a ordem com que eles serão lidos e executados pelo computador. Essa ordem é chamada de <b style="color: green;">fluxo</b>. Para controlar esse <b style="color: green;">fluxo</b> (ordem), são usadas <b style="color: green;">estruturas de controle</b>. A estrutura mais simples é a sequencial, onde os passos são executados na ordem em que foram escritos (da esquerda para a direita e de cima para baixo).
    </h2>
  </article>

  <article class="text-block">
    <h2>
      A sequência com que os passos são executados é muito importante!
    </h2>
    <p>
      A ordem com que fazemos as coisas pode importar. Não faz diferença escovar os dentes antes ou depois de pentear o cabelo, mas faz quando escovamos os dentes logo antes de comer e depois não. Em algoritmos, muitas vezes a ordem fará diferença. Em uma receita de bolo, não podemos querer assar a massa antes de misturar todos os seus ingredientes. Em uma conta de matemática, não podemos confundir (A + B) X C com A X (B + C), que, para os valores 1, 2 e 3, resultariam em (1 + 2) X 3 =3 X 3 = 9 e 1 X (2 + 3) = 1 X 5 = 5, respectivamente.
    </p>
  </article>

  <article class="text-block">
    <h2>
      Exemplo: Conversão de graus Fahrenheit para Celsius
    </h2>

    <p>
      A fórmula para converter Fahrenheit em Celsius funciona assim: primeiro tiramos 32 do número em Fahrenheit porque a escala Fahrenheit começa num ponto diferente da escala Celsius. Depois, multiplicamos por 5/9 porque os “tamanhos” dos graus são diferentes (na escala Fahrenheit os passos são menores, e na escala Celsius são maiores). Então, subtrair 32 coloca as duas escalas no mesmo início, e multiplicar por 5/9 ajusta o valor para o tamanho certo. É como mudar de uma régua pequena para uma régua maior: você precisa alinhar o começo e depois ajustar o tamanho dos passos para saber a medida correta.
    </p>

    <h3 style="color: green;">Sequência correta:</h3>
    <ol>
      <li class="draggable result-correct">
        Receber valor em Fahrenheit (100) => = 100
      </li>
      <li class="draggable result-correct">
        Subtrair 32 => 100 - 32 = 68
      </li>
      <li class="draggable result-correct">
        Multiplicar por 5 => 68 X 5 = 340
      </li>
      <li class="draggable result-correct">
        Dividir por 9 => 340 / 9 = 37,778
      </li>
      <li class="result-correct draggable">
        Responder valor final => Resposta final = 37,778
      </li>
    </ol>
    <h3 style="color: red;">Sequência errada:</h3>
    <ol>
      <li class="draggable result-wrong">
        Receber valor em Fahrenheit (100) => = 100
      </li>
      <li class="draggable result-wrong">
        Multiplicar por 5 => 100 X 5 = 500
      </li>
      <li class="draggable result-wrong">
        Subtrair 32 => 500 - 32 = 468
      </li>
      <li class="draggable result-wrong">
        Dividir por 9 => 468 / 9 = 52
      </li>
      <li class="draggable result-wrong">
        Responder valor final => Resposta final = 52
      </li>
    </ol>
  </article>

`;

class ComponenteExplicativo extends HTMLElement {
  connectedCallback() {
    const clone = template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

customElements.define("componente-explicativo", ComponenteExplicativo);
