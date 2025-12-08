const template = document.createElement("template");
template.innerHTML = `
  <h1 id="page-title" class="title-box">3. Decisão
    <span id="statusBadge" class="status-badge">Pendente</span>
  </h1>

  <article class="text-block">
    <h2>
      Alguns <b style="color: blue;">algoritmos</b> podem apresentar a necessidade de executar uma sequência de passos ou outra para alguma <b style="color: orange;">condição</b> (“Se isso acontecer, faça isso. Se não acontecer, faça outra coisa.”). Para permitir a decisão de qual sequência de passos será executada no <b style="color: green;">fluxo</b>, existe a <b style="color: green;">estrutura de controle</b> de decisão.
      </h2>
  </article>

  <article class="text-block">
    <h2>
      Em alguns problemas, podemos ter de escolher seguir ou não um  subconjunto de passos.
    </h2>
    <p>
      Uma estrutura de decisão funciona como uma escolha que o computador faz no meio do caminho. É como quando você está brincando e precisa decidir: “Se eu tiver mais tempo, continuo jogando; se não, vou guardar os brinquedos.” O computador faz a mesma coisa: ele olha uma situação, responde a uma pergunta (como “é maior?”, “está igual?”, “sobrou algo?”) e, dependendo da resposta, escolhe qual conjunto de passos seguir. Assim, o programa consegue agir de maneiras diferentes conforme o que está acontecendo, exatamente como nós fazemos no dia a dia. Na sequência de passos, o bloco que faz o papel de estrutura condicional é o "Se" e "Se não".
    </p>
  </article>

  <article class="text-block">
    <h2>
      Exemplo: Nota de um aluno
    </h2>

    <p>
      Uma professora aplica 4 provas para avaliar seus alunos e lhes atribuir uma nota. Quando a média aritmética das notas fica abaixo de 6, o aluno precisa fazer uma recuperação. A nota final é uma nova média da média anterior com a nota da recuperação. A professora tem um algoritmo para definir a aprovação ou reprovação do aluno e, no segundo caso, a nota que ele precisa tirar na recuperação.
    </p>

    <h3 style="color: green;">Sequência de passos do algoritmo da professora:</h3>
    <ol>
      <li class="draggable result-correct">
        Receber a nota da primeira prova (4) => = 4
      </li>
      <li class="draggable result-correct">
        Somar a nota da segunda prova (5) => 4 + 5 = 9
      </li>
      <li class="draggable result-correct">
        Somar a nota da terceira prova (6) => 9 + 6 = 15
      </li>
      <li class="draggable result-correct">
        Somar a nota da quarta prova (7) => 15 + 7 = 22
      </li>
      <li class="draggable result-correct">
        Dividir pelo número de provas (4) => 22 / 4 = 5,5
      </li>
      <li class="draggable result-correct">
        Se a nota foi maior do que 6: => 5,5 é maior que 6 ? Não 
        <ul>
          <li class="draggable result-correct">
            Responder Aprovado
          </li>
        </ul>
        Se não
        <ol>
          <li class="draggable result-correct">
            Guardar valor como media => media = 5,5
          </li>
          <li class="draggable result-correct">
            Receber media para aprovação => = 6
          </li>
          <li class="draggable result-correct">
            Multiplicar pelo número de notas da segunda média (2) => 6 X 2 = 12
          </li>
          <li class="draggable result-correct">
            Subtrair media (5,5) => 12 - 5,5 = 6,5
          </li>
          <li class="draggable result-correct">
            Responder valor final => Resposta final = 6,5
          </li>
        </ol>
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
