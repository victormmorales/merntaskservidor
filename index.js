const express = require('express');
const conectarDB = require('./config/db');

//crear servidor
const app = express();

//Conectar DB
conectarDB();

//Puerto del servidor
const PORT = process.env.PORT || 4000;

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})