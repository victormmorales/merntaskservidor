const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// api/proyectos
// Crear Proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// Obtener todos los proyectos de un usuaruio
router.get('/', auth, proyectoController.obtenerProyectos);

//actualizar proyectos => id
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//Eliminar proyectos
router.delete('/:id', auth, proyectoController.eliminarProyecto)

module.exports = router;