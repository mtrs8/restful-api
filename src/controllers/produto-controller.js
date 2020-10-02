'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/produto-repository');

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get();       
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send(data);
        message: 'Falha ao processar requisição!'
    }
};

exports.getBySlug = async (req, res, next) => {
    try{
        const data = await repository.getBySlug(req.params.slug);
            res.status(200).send(data);
    } catch(e) {
        res.status(500).send(data);
        message: 'Falha ao processar requisição!'
    }
};

exports.getById = async(req, res, next) => {
    try{
        const data = repository.getById(req.params.id);       
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send(data);
        message: 'Falha ao processar requisição!'
    }
};

exports.getByTag = async(req, res, next) => {
    try{
        const data = await repository.getByTag(req.params.tag);       
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send(data);
        message: 'Falha ao processar requisição!'
    }
};


exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter ao menos 3 caracteres!');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter ao menos 3 caracteres!');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter ao menos 3 caracteres!');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
};

exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
                message: "Produto atualizado com sucesso!"
            });
        }catch(e){
            res.status(500).send({
                message: "Falha ao atualizar produto!"
            });
        }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.body.id);
            res.status(200).send({
                message: "Produto atualizado com sucesso!"
            });
        }catch(e) {
            res.status(500).send({
                message: "Falha ao atualizar produto!",
            });
        }
};