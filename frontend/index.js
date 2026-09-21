const API_URL = process.env.API_URL;

const btnchamado = document.getElementById("load-chamados");
btnchamado.addEventListener("click", () => {
    carregarChamados();
});

const btncadastrar = document.getElementById("cadastrar-chamado");
btncadastrar.addEventListener("click", (event) => {
    event.preventDefault();
    cadastrarChamado();
});



const novochamado = {
    nome_solicitante:document.getElementById("nome_solicitante").value,
    descrição:document.getElementById("descrição").value,
    categoria:document.getElementById("categoria").value,
    prioridade:document.getElementById("prioridade").value,
    status:document.getElementById("status").value,
    data:document.getElementById("data").value
};
