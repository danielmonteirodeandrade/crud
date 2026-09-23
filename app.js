const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '../.env')
});


const routes = require('./backend/routes/routes.js');

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(express.static('./frontend'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

