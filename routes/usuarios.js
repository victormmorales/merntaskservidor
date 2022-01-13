const express = require('express');
const router = express.Router();
const usuarioControlloer = require('../controllers/usuarioController');
const { check } = require('express-validator');

//Crear usuarios
// api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    ],
    usuarioControlloer.crearUsuario
);

module.exports = router;