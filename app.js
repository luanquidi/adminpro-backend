// Requerimientos
const express = require('express');

// Base de datos
require('./database');

// Inicializar variables
const app = express();

// Rutas
app.get('/', (req, res) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada'
    });

});

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});