const mongoose = require('mongoose');

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },(err, res) => {
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});