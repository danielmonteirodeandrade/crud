const routes = require("./routes/routes.js");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

module.exports = app;