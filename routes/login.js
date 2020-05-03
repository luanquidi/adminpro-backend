const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    const { email, password } = req.body;

    Usuario.findOne({email}, (err, usuarioDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if(!bcrypt.compareSync(password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        usuarioDB.password = ':)';

        // Crear token
        const token = jwt.sign({ usuario: usuarioDB }, SEED, {
            expiresIn: 14000 // 4 horas
        });

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });


});


module.exports = app;