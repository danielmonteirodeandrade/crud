const express = require('express');

const controller = require('../controllers/controller.js');

const routes = express.Router();

routes.get('/chamados', controller.listarchamado);
routes.post('/chamados', controller.cadastrarchamado);
routes.put('/chamados/:id', controller.atualizarchamado);
routes.delete('/chamados/:id', controller.deletarchamado);

module.exports = routes;