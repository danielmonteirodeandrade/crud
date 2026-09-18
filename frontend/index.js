const API_URL = process.env.API_URL;

const btnchamado = document.getElementById("load-chamados");
btnchamado.addEventListener("click", () => {
    try {
        const response = fetch(`${API_URL}/chamados/${id}`);
        const chamado = response.json();
        
    }
});