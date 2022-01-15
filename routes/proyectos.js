const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');

//Crear Proyectos
//ai/proyectos
router.post('/', auth, proyectoController.crearProyecto);

router.get('/', auth, proyectoController.crearProyecto);

module.exports = router;