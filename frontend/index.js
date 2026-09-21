const API_URL = process.env.API_URL;

async function carregarChamados() {
    const barrafiltro = document.getElementById('filterInput').value.trim();
    const listachamados = document.getElementById("chamado");

    if (barrafiltro) {
        API_URL += '?filter=' + encodeURIComponent(barrafiltro);
    }
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        listachamados.innerHTML = data.map(chamado => 
            `<div class="regiao-chamado">
                <p>${chamado.nome_solicitante}</p>   
                <p>${chamado.descricao}</p> 
                <p>${chamado.categoria}</p> 
                <p>${chamado.prioridade}</p> 
                <p>${chamado.status}</p> 
                <p>${chamado.data}</p> 
            </div>
            <div class="btns-chamado">
                <button id="atualizar"class="btn-chamado">
                    atualizar
                </button>
                <button id="excluir" class="btn-chamado">
                    excluir
                </button>
            </div>`).join('');
    } catch (error) {
        console.error('Erro ao carregar chamados:', error);
    }
}

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
