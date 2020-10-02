'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/cliente-repository');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter ao menos 3 caracteres!');
    contract.isEmail(req.body.email, 'E-mail inválido!');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter ao menos 6 caracteres!');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
};
