const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

// =====================================
// Verificar token
// =====================================
exports.verificaToken = (req, res, next) => {
    
    const { token } = req.query;

    jwt.verify( token, SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false, 
                mensaje: 'Token incorrecto', 
                errors: err
            });
        }

        next();
    });
}
    
   
