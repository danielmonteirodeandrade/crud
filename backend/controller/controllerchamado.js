const { listarchamado, buscarChamado, cadastrarchamado, atualizarchamado, deletarchamado } = require('../services/services.js');

async function listar(req, res) {
    try {
        const { data, error } = await listarchamado();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function buscar(req, res) {
    try {
        const { id } = req.params;
        const { data, error } = await buscarChamado(id);

        if (error || !data || data.length === 0) {
            return res.status(404).json({ mensagem: 'Chamado não encontrado.' });
        }

        return res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function cadastrar(req, res) {
    try {
        const chamado = req.body;
        const { data, error } = await cadastrarchamado(chamado);
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const chamado = req.body;
        const { data, error } = await atualizarchamado(id, chamado);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deletar(req, res) {
    try {
        const { id } = req.params;
        const { data, error } = await deletarchamado(id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listar,
    buscar,
    cadastrar,
    atualizar,
    deletar
};