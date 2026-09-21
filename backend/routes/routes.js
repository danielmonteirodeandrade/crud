const express = require('express');

const controller = require('../controllers/controllerchamado.js');

const routes = express.Router();

routes.get('/chamados', controller.listar);
routes.post('/chamados', controller.cadastrar);
routes.put('/chamados/:id', controller.atualizar);
routes.delete('/chamados/:id', controller.deletar);

module.exports = routes;