const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crear tarea
//api/tareas
router.post(
  "/",
  auth,
  [
    check("nombre", "El Nombre es obligatorio").not().isEmpty(),
    check("proyecto", "El Proyecto es obligatorio").not().isEmpty(),
  ],
  tareaController.crearTarea
);

//Obtener tareas
router.get("/", auth, tareaController.obtenerTareas);

//editar tarea
router.put("/:id", auth, tareaController.actualizarTarea);

module.exports = router;
