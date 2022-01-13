const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    //extraer email y password
    const { email, password } = req.body;

    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });

        if(!usuario){
            return res.status(400).json({ msg: 'El usuario no existe'});
        }
        
        //Revisar password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passCorrecto) {
            return res.status(400).json({ msg: 'Contraseña Incorrecta' });
        }

        //Si todo es correcto
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
            res.json({ token });
        });
        console.log(usuario);

    } catch (error) {
        console.log(error);
    }
}