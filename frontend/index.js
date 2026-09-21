const API_URL = process.env.API_URL;

async function carregarChamados() {
    const barrafiltro = document.getElementById('filterInput').value.trim();
    const listachamados = document.getElementById("regiao-chamado");

    if (barrafiltro) {
        API_URL += '?filter=' + encondeURIComponent(barrafiltro);
    }
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        listachamados.innerHTML = data.map(chamado => 
            `<p>${chamado.nome_solicitante}</p>   
            <p>${chamado.descricao}</p> 
            <p>${chamado.categoria}</p> 
            <p>${chamado.prioridade}</p> 
            <p>${chamado.status}</p> 
            <p>${chamado.data}</p> 
            `).join('');
    } catch (error) {
        console.error('Erro ao carregar chamados:', error);
    }
}

const btnchamado = document.getElementById("load-chamados");
btnchamado.addEventListener("click", () => {
    carregarChamados();
});