const express = require('express');

const controllerchamado = require('../controller/controllerchamado.js');

const routes = express.Router();

routes.get('/chamados', controllerchamado.listar);
routes.post('/chamados', controllerchamado.cadastrar);
routes.put('/chamados/:id', controllerchamado.atualizar);
routes.delete('/chamados/:id', controllerchamado.deletar);

module.exports = routes;