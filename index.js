function irParaOpcoes() {
  window.location.href = "/paginas/opcoes/opcoes.html";
}

function voltar() {
  window.history.back();
}

function irParaOperacao(operacao) {
  window.location.href = operacao;
}

const alternativas = document.querySelector(".alternativas");

for(let i=1; i<=4; i++){
  const div = document.createElement("div");
  div.className = "alternativa";
  const button = document.createElement ("button");
  button.textContent = 10;
  div.appendChild(button);
  alternativas.appendChild(div);
}
