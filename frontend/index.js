const API_URL = "http://localhost:3000/chamados";

let todosChamados = [];

// Elementos da DOM
const formChamado = document.getElementById("form-chamado");
const btnCarregar = document.getElementById("load-chamados");
const inputFiltro = document.getElementById("filterInput");
const listaChamados = document.getElementById("chamado-list");
const btnCancelar = document.getElementById("cancelar-edicao");
const formTitle = document.getElementById("form-title");

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    carregarChamados();
});

function obterDataHoje() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

btnCarregar.addEventListener("click", carregarChamados);

formChamado.addEventListener("submit", (event) => {
    event.preventDefault();
    salvarChamado();
});

inputFiltro.addEventListener("input", () => {
    filtrarChamados();
});

btnCancelar.addEventListener("click", limparFormulario);

// READ: Carregar chamados da API
async function carregarChamados() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar chamados.");
        
        todosChamados = await response.json();
        renderizarChamados(todosChamados);
    } catch (error) {
        console.error("Erro:", error);
        listaChamados.innerHTML = `<p style="color: red;">Erro ao carregar chamados.</p>`;
    }
}

// Renderizar lista na tela
function renderizarChamados(chamados) {
    if (!chamados || chamados.length === 0) {
        listaChamados.innerHTML = "<p>Nenhum chamado encontrado.</p>";
        return;
    }

    listaChamados.innerHTML = chamados.map(chamado => `
        <div class="card-chamado">
            <div class="info-chamado">
                <strong>#${chamado.id || ''} - ${chamado.nome_solicitante || 'Sem nome'}</strong>
                <p><strong>Descrição:</strong> ${chamado.descricao}</p>
                <p><strong>Categoria:</strong> ${chamado.categoria} | <strong>Prioridade:</strong> ${chamado.prioridade}</p>
                <p><strong>Status:</strong> ${chamado.status} | <strong>Data:</strong> ${chamado.data_abertura}</p>
            </div>
            <div class="btns-chamado">
                <button class="btn-editar" onclick="prepararEdicao('${chamado.id}')">Editar</button>
                <button class="btn-excluir" onclick="deletarChamado('${chamado.id}')">Excluir</button>
            </div>
        </div>
    `).join('');
}

// CREATE / UPDATE: Salvar ou atualizar chamado
async function salvarChamado() {
    const editId = document.getElementById("edit-id").value;
    const dataDigitada = document.getElementById("data_abertura").value;

    // Como você alterou a coluna no banco para 'text', enviamos o valor direto
    const chamadoData = {
        nome_solicitante: document.getElementById("nome_solicitante").value,
        descricao: document.getElementById("descricao").value,
        categoria: document.getElementById("categoria").value,
        prioridade: document.getElementById("prioridade").value,
        status: document.getElementById("status").value,
        data_abertura: dataDigitada !== "" ? dataDigitada : obterDataHoje()
    };

    try {
        let response;

        if (editId) {
            // Edição (PUT)
            response = await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(chamadoData)
            });
        } else {
            // Cadastro (POST)
            response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(chamadoData)
            });
        }

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Erro na requisição");
        }

        limparFormulario();
        carregarChamados();
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Falha ao salvar chamado: " + error.message);
    }
}

// DELETE: Remover chamado
async function deletarChamado(id) {
    if (!confirm("Tem certeza que deseja excluir este chamado?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Erro ao deletar chamado.");

        carregarChamados();
    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Falha ao excluir o chamado.");
    }
}

// Preencher o formulário para edição
function prepararEdicao(id) {
    const chamado = todosChamados.find(c => String(c.id) === String(id));
    if (!chamado) return;

    document.getElementById("edit-id").value = chamado.id;
    document.getElementById("nome_solicitante").value = chamado.nome_solicitante || '';
    document.getElementById("descricao").value = chamado.descricao || '';
    document.getElementById("categoria").value = chamado.categoria || '';
    document.getElementById("prioridade").value = chamado.prioridade || 'Baixa';
    document.getElementById("status").value = chamado.status || 'Ativo';
    
    if (chamado.data_abertura) {
        document.getElementById("data_abertura").value = chamado.data_abertura.split('T')[0];
    } else {
        document.getElementById("data_abertura").value = obterDataHoje();
    }

    formTitle.textContent = "Editar Chamado #" + chamado.id;
    btnCancelar.style.display = "inline-block";
}

// Limpar formulário
function limparFormulario() {
    document.getElementById("edit-id").value = "";
    formChamado.reset();
    document.getElementById("data_abertura").value = new Date().toISOString().split('T')[0];
    formTitle.textContent = "Cadastrar Chamado";
    btnCancelar.style.display = "none";
}

// Filtrar chamados localmente
function filtrarChamados() {
    const termo = inputFiltro.value.toLowerCase();
    const filtrados = todosChamados.filter(c => {
        const nome = (c.nome_solicitante || '').toLowerCase();
        const cat = (c.categoria || '').toLowerCase();
        const desc = (c.descricao || '').toLowerCase();
        return nome.includes(termo) || cat.includes(termo) || desc.includes(termo);
    });
    renderizarChamados(filtrados);
}