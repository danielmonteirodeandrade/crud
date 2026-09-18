const express = require("express");

const controller = require("../controllers/controller.js");

const routes = express.Router();

routes.get("/get", controller.ser);

module.exports = routes;