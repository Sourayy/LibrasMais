function getEnvironment() {
  const isGitHubPages = window.location.hostname.includes("github.io");
  const baseUrl = isGitHubPages ? window.location.pathname.split("/")[1] : "";
  return { isGitHubPages, baseUrl };
}

function irParaOpcoes() {
  const { isGitHubPages, baseUrl } = getEnvironment();
  const resultadoUrl = isGitHubPages
    ? `/${baseUrl}/paginas/opcoes/opcoes.html`
    : "/paginas/opcoes/opcoes.html";
  window.location.href = resultadoUrl;
}

function voltar() {
  const currentPath = window.location.pathname;
  if (currentPath.endsWith("./opcoes/opcoes.html")) {
    window.location.href = "./index.html";
  } else {
    window.history.back();
  }
}

function irParaOperacao(operacao) {
  const { isGitHubPages, baseUrl } = getEnvironment();
  window.location.href = isGitHubPages ? `/${baseUrl}${operacao}` : operacao;
}

const alternativas = document.querySelector(".alternativas");
let operacaoAtual = 0;
let acertos = 0;

function iniciarOperacoes(operacoes) {
  operacaoAtual = 0;
  acertos = 0;
  embaralharArray(operacoes);
  gerarOperacao(operacoes);
}

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function gerarOperacao(operacoes) {
  if (operacaoAtual >= operacoes.length) {
    localStorage.setItem("acertos", acertos);
    const { isGitHubPages, baseUrl } = getEnvironment();
    const resultadoUrl = isGitHubPages
      ? `/${baseUrl}/paginas/resultado/resultado.html`
      : "/paginas/resultado/resultado.html";
    window.location.href = resultadoUrl;
    return;
  }

  const { num1, num2, resultado, simbolo, url } = operacoes[operacaoAtual];

  document.getElementById("operacaoAtual").textContent = `${
    operacaoAtual + 1
  } / ${operacoes.length}`;

  document.querySelector("h2").textContent = `${num1} ${simbolo} ${num2} = ?`;

  const videoSource = document.getElementById("videoSource");
  videoSource.src = url;

  const video = document.getElementById("video");
  video.load();

  const respostas = [resultado];
  while (respostas.length < 4) {
    const respostaErrada = Math.floor(Math.random() * 20) + 1;
    if (!respostas.includes(respostaErrada)) {
      respostas.push(respostaErrada);
    }
  }

  respostas.sort(() => Math.random() - 0.5);

  alternativas.innerHTML = "";
  respostas.forEach((resposta) => {
    const div = document.createElement("div");
    div.className = "alternativa";
    const button = document.createElement("button");
    button.textContent = resposta;
    button.onclick = () =>
      verificarResposta(button, resposta === resultado, operacoes);
    div.appendChild(button);
    alternativas.appendChild(div);
  });
}

function verificarResposta(button, correto, operacoes) {
  button.style.backgroundColor = correto ? "green" : "red";
  if (correto) {
    acertos++;
  } else {
    const botoes = document.querySelectorAll(".alternativa button");
    botoes.forEach((botao) => {
      if (parseInt(botao.textContent) === operacoes[operacaoAtual].resultado) {
        botao.style.backgroundColor = "green";
      }
    });
  }
  setTimeout(() => {
    operacaoAtual++;
    gerarOperacao(operacoes);
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof operacoes !== "undefined") {
    iniciarOperacoes(operacoes);
  }
});
