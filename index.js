const express = require('express');
const conectarDB = require('./config/db');

//crear servidor
const app = express();

//Conectar DB
conectarDB();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))

//Puerto del servidor
const PORT = process.env.PORT || 4000;

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})