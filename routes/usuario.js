const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const Usuario = require('../models/usuario');
const mdAutenticacion = require('../middlewares/autenticacion');


// =====================================
// Obtener todos los usuarios
// =====================================
app.get('/', (req, res) => {
    
    Usuario.find({}, 'nombre email img role')
    .exec(
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false, 
                    mensaje: 'Error cargando usuario', 
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuarios
            })
        }
    )

});



// =====================================
// Actualizar un nuevo usuario
// =====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    const { id } = req.params;
    const { nombre, role, email } = req.body;

    Usuario.findById( id, (err, usuario) => {
        if(err){
            return res.status(500).json({
                ok: false, 
                mensaje: 'Error al buscar usuario', 
                errors: err
            });
        }

        if(!usuario){
            return res.status(404).json({
                ok: false, 
                mensaje: `El usuario con el ${id} no existe`, 
                errors: { message: 'No existe un usuario con ese ID'}
            });
        }

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.role = role;
    
        usuario.save((err, usuarioActualizado) => {
            if(err){
                return res.status(400).json({
                    ok: false, 
                    mensaje: 'Error al actualizar usuario', 
                    errors: err
                });
            }
            
            usuarioActualizado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioActualizado
            })
        });
    });




   

});

// =====================================
// Crear un nuevo usuario
// =====================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    
    const { nombre, email, password, role, img } = req.body;

    const usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        img
    });

    usuario.save( (err, usuarioGuardado) => {
        if(err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        })
    });
});

// =====================================
// Actualizar un nuevo usuario
// =====================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    const { id } = req.params;

    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
        if(err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al eliminar usuario',
                errors: err
            })
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        })
    });

});

module.exports = app;