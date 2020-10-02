'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/cliente-repository');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try{
        const data = await repository.get();       
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
};

exports.post = async(req, res, next) => {
    try{
        await repository.create({
            cliente: req.body.cliente,
            number: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
};
