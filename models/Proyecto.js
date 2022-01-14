const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {

    },
    creado: {
        
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);