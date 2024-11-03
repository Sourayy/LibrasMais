let quantidadeAcertos = parseInt(localStorage.getItem("acertos"), 10);
const totalOperacoes = 10;

document.getElementById("resultado").innerHTML = `Você acertou <br>${quantidadeAcertos} de ${totalOperacoes}.`;
