'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');


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
        //Recupera o token 
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        const data = await authService.decodeToken(token);
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0,6),
            itens: req.body.itens
        });
        res.status(201).send({ 
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Pedido removido com sucesso!'
        });
    } catch(e){
        res.status(400).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
}
