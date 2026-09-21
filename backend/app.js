const routes = require('../backend/routes/routes.js');
const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/', routes);

module.exports = app;