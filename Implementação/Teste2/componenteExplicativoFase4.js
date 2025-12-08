const template = document.createElement("template");
template.innerHTML = `
  <h1 id="page-title" class="title-box">4. Repetição
    <span id="statusBadge" class="status-badge">Pendente</span>
  </h1>

  <article class="text-block">
    <h2>
      Alguns <b style="color: blue;">algoritmos</b> podem exigir a repetição de um subconjunto de passos por muitas vezes, ou por um número desconhecido até a execução do programa começar. Existe uma <b style="color: green;">estrutura de controle</b> que repete uma sequência de passos no <b style="color: green;">fluxo</b> de execução com base em uma <b style="color: orange;">condição</b> ("Enquanto isso acontecer, faça isso."), chamada de estrutura de repetição.  
    </h2>
  </article>

  <article class="text-block">
    <h2>
      Em alguns problemas, podemos precisar repetir um subconjunto de passos.
    </h2>
    <p>
      Uma estrutura de decisão funciona como uma escolha que o computador faz no meio do caminho. É como quando você está brincando e precisa decidir: “Se eu tiver mais tempo, continuo jogando; se não, vou guardar os brinquedos.” O computador faz a mesma coisa: ele olha uma situação, responde a uma pergunta (como “é maior?”, “está igual?”, “sobrou algo?”) e, dependendo da resposta, escolhe qual conjunto de passos seguir. Assim, o programa consegue agir de maneiras diferentes conforme o que está acontecendo, exatamente como nós fazemos no dia a dia. Para isso, existe a estrutura de repetição (chamada de "Enquanto", nesse caso).
    </p>
  </article>

  <article class="text-block">
    <h2>
      Exemplo: Exponenciação
    </h2>

    <p>
      O expoente de um número (chamado de base) indica quantas vezes esse número deve ser multiplicado por ele mesmo. Por exemplo, 3² significa 3 × 3. Todo número elevado a 0 resulta em 1, e todo número elevado a 1 é o próprio número. Assim, podemos criar um algoritmo para calcular potências repetindo a multiplicação a quantidade de vezes indicada pelo expoente.
    </p>

    <h3 style="color: green;">Sequência de passos do algoritmo da professora:</h3>
    <ol>
      <li class="draggable result-correct">
        Receber 1 => = 1
      </li>
      <li class="draggable result-correct">
        Guardar valor em resultado => resultado = 1
      </li>
      <li class="draggable result-correct">
        Receber expoente (4) => = 4
      </li>
      <li class="draggable result-correct">
        Enquanto valor for maior ou igual a 1: <b>1=></b> 4 é maior ou igual a 1 ? Sim <b>2=></b> 3 é maior ou igual a 1 ? Sim <b>3=></b> 2 é maior ou igual a 1 ? Sim <b>4=></b> 1 é maior ou igual a 1 ? Sim <b>5=></b> 0 é maior ou igual a 1 ? Não
        <ul>
          <li class="draggable result-correct">
            Receber valor de resultado <b>1=></b> = 1 <b>2=></b> 4 <b>3=></b> 16 <b>4=></b> 64
          </li>
          <li class="draggable result-correct">
            Multiplicar pela base (4) <b>1=></b> 1 X 4 = 4 <b>2=></b> 4 X 4 = 16 <b>3=></b> 16 X 4 = 64 <b>4=></b> 64 X 4 = 256
          </li>
          <li class="draggable result-correct">
            Guardar valor em resultado <b>1=></b> resultado = 4 <b>2=></b> resultado = 16 <b>3=></b> resultado = 64 <b>4=></b> resultado = 256
          </li>
          <li class="draggable result-correct">
            Receber expoente (4) <b>1=></b> = 4 <b>2=></b> = 3 <b>3=></b> = 2 <b>4=></b> 1
          </li>
          <li class="draggable result-correct">
            Subtrair 1 <b>1=></b> = 4 - 1 = 3 <b>2=></b> 3 - 1 = 2 <b>3=></b> 2 - 1 = 1 <b>4=></b> 1 - 1 = 0
          </li>
          <li class="draggable result-correct">
            Guardar valor em expoente <b>1=></b> expoente = 3 <b>2=></b> expoente = 2 <b>3=></b> expoente = 1 <b>4=></b> expoente = 0
          </li>
        </ul>
      </li>
      <li class="draggable result-correct">
        Receber valor de resultado => = 256
      </li>
      <li class="draggable result-correct">
        Responder valor final => Resposta final = 256
      </li>
  </article>

`;

class ComponenteExplicativo extends HTMLElement {
  connectedCallback() {
    const clone = template.content.cloneNode(true);
    this.appendChild(clone);
  }
}

customElements.define("componente-explicativo", ComponenteExplicativo);
