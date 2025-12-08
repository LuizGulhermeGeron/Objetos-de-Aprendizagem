const template = document.createElement("template");
template.innerHTML = `
  <h1 id="page-title" class="title-box">1. Interpretação do Problema
    <componente-indicativo></componente-indicativo>
  </h1>

  <article class="text-block">
    <h2>
      Um <b style="color: blue;">algoritmo</b> é uma sequência de passos (cada passo é uma ação, instrução ou comando) com início e fim que tem um objetivo claro, resolve um problema. Para criar algoritmos, é preciso compreender o problema, as informações que são dadas e as etapas para solucioná-lo.
    </h2>
  </article>

  <article class="text-block">
    <h2>
      Um problema pode depender de dados fixos ou variáveis e de uma sequência de passos para ser resolvido.
    </h2>
    <p>
      Por exemplo, quando você vai resolver um desafio de matemática, algumas informações já estão prontas (como quantas maçãs você tem), e outras podem mudar (como quantas você vai comer). Para conseguir chegar à resposta certa, você precisa seguir uma ordem de passos, como ler o enunciado, entender o que está sendo pedido, escolher uma estratégia e fazer as contas com calma.
    </p>
  </article>

  <article class="text-block">
    <h2>
      Exemplo: Receita de Cookies
    </h2>

    <h3 style="color: green;">
      Dados fixos em verde (os ingredientes e quantidade base de cada um)
    </h3>
    <h3 style="color: blue;">
      Dados variáveis em verde (a quantidade de cada ingrediente que realmente será usada, dependendo da quantidade de cookies desejada)
    </h3>
    <h3 style="color: orange;">
      Passos em laranja (todas as ações necessárias para transformar os ingredientes em cookies)
    </h3>


    <h3>
      Ingredientes(para 22 porções):
    </h3>
    <ul>
      <li style="color: green;">
        125 g de manteiga sem sal em temperatura ambiente
      </li>
      <li style="color: green;">
        3/4 xícara de açúcar
      </li>
      <li style="color: green;">
        1/2 xícara de açúcar mascavo
      </li>
      <li style="color: green;">
        1 ovo
      </li>
      <li style="color: green;">
        1 e 3/4 de xícara de farinha de trigo
      </li>
      <li style="color: green;">
        1 colher (chá) de fermento em pó químico
      </li>
      <li style="color: green;">
        300 g de chocolate meio amargo picado
      </li>
      <li style="color: green;">
        1 colher (chá) de essência de baunilha
      </li>
      <li style="color: green;">
        Para cookies de chocolate: acrescentar 1/4 xícara de chocolate em pó
      </li>
    </ul>

    <p style="color: blue;">
      Ajuste as quantidades de ingredientes segundo a quantidade de porções desejada.
    </p>

    <h3>
      Modo de preparo (40 min)
    </h3>
    <ol>
      <li style="color: orange;">
        Misture a manteiga, açúcar mascavo, açúcar, essência de baunilha (e chocolate em pó, se for fazer cookies de chocolate).
      </li>
      <li style="color: orange;">
        Adicione o ovo batido aos poucos e misture bem.
      </li>
      <li style="color: orange;">
        Acrescente a farinha aos poucos e misture bem (pode ser na mão ou na batedeira planetária).
      </li>
      <li style="color: orange;">
        Por último, adicione o fermento e misture apenas para incorporar.
      </li>
      <li style="color: orange;">
        Depois de a massa estar bem misturada, adicione o chocolate meio amargo picado.
      </li>
      <li style="color: orange;">
        Forme bolinhas pequenas e asse em forno preaquecido, sobre papel manteiga, por aproximadamente 15 a 20 minutos (250°C).
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
