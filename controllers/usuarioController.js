const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) => {

    //extraer valores
    const { email, password } = req.body;

    try {
        //Revisar que usuario sea único
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }
        
        //crear usuario
        usuario = new Usuario(req.body);

        //Hashear password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save(),

        //Mensaje de confirmación
        res.json({msg: '¡Usuario creado correctamente!'});
        console.log(usuario);

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};