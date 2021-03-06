const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

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
        await usuario.save();

        //Crear JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        //firmar JWT
        jwt.sign(payload, process.env.SECRETA, {
            //Configuracion del token:
            expiresIn: 3600 //expira en 1 hora
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmación
            res.json({token: token});
        });
        console.log(usuario);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};