'use-strict';

const jwt = require('jsonwebtoken');

//Gerador do Token
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

//Decodifica o token público com o privado
exports.decodeToken = async (token) => {
    return await jwt.verify(token, global.SALT_KEY);
}

//Intercepta as rotas para autorizar ou não a requisição
exports.authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito!'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded) { //Verificação do token
            if(error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else next();
        });
    }
}

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};