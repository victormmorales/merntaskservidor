const express = require('express');

//crear servidor
const app = express();

//Puerto del servidor
const PORT = process.env.PORT || 4000;

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})