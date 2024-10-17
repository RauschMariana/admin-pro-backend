const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Verificar email
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validatePass = bcrypt.compareSync( password, userDB.password );

        if (!validatePass) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }


        // Generar el JWT
        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const googleSignIn = async ( req, res = response ) => {
    try {
        const { name, email, picture } = await googleVerify( req.body.token );
        const userDB = await User.findOne({ email });
        let user;
        if (!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            user.google = true;
        }
        // Guardar en DB
        await user.save();
        // Generar el JWT
        const token = await generateJWT( user.id );
        res.json({
            ok: true,
            name,
            email,
            picture,
            token
        });
        
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es válido'
        });
    }
    
}

const renewToken = async( req, res = response ) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );


    res.json({
        ok: true,
        token
    });

}


module.exports = {
    login,
    googleSignIn,
    renewToken
}