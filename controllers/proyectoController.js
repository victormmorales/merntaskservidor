const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');
const res = require('express/lib/response');

exports.crearProyecto = (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        //Crear proyectos
        const proyecto = new Proyecto(req.body);

        //guardar creador con jwt
        proyecto.creador = req.usuario.id

        //guardar proyecto
        proyecto.save();
        res.json(proyecto)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
};

//Obtener todos los proyectos del usuario
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1});
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualizar proyecto
exports.actualizarProyecto = async (req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer información proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {

        //revisar id

        //si existe un proyecto

        //verificar creador

        //actualizar
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};