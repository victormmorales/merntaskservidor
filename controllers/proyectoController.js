const Proyecto = require('../models/Proyecto');

exports.crearProyecto = (req, res) => {
    try {
        //Crear proyectos
        const proyecto = new Proyecto(req.body);
        proyecto.save();
        res.json(proyecto)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
};