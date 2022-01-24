const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
const res = require("express/lib/response");

// Crea una nueva tarea
exports.crearTarea = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //revisar si el proyecto pertenece al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //crear tarea
    const tarea = new Tarea(req.body);
    await tarea.save();

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//obtener tareas x proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    //Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //revisar si el proyecto pertenece al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //obtener tareas
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Editar tarea
exports.actualizarTarea = async (req, res) => {
  try {
    //Extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    //revisar si tarea existe
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }

    //extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    //revisar si el proyecto pertenece al usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //crear objeto con la nueva información
    const nuevaTarea = {};

    if (nombre) nuevaTarea.nombre = nombre;

    if (estado) nuevaTarea.estado = estado;

    //guardar tarea
    tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json({ tarea });

    console.log("¡Tarea editada!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
