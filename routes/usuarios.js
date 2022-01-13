const express = require('express');
const router = express.Router();
const usuarioControlloer = require('../controllers/usuarioController');

//Crear usuarios
// api/usuarios
router.post('/', usuarioControlloer.crearUsuario);

module.exports = router;