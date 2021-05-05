const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Prova = require('../models/prova');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    //const provas = await Prova.find().populate('idAluno');
    const provas = await Prova.find({idAluno: req.userId}, {}).populate(
      'idAluno',
    );

    return res.send({provas});
  } catch (error) {
    return res.status(400).send({error: 'Erro listar as provas'});
  }
});

router.get('/:provaId', async (req, res) => {
  try {
    const prova = await Prova.findById(req.params.provaId).populate('idAluno');

    return res.send({prova});
  } catch (error) {
    return res.status(400).send({error: 'Erro listar a prova'});
  }
});

router.post('/', async (req, res) => {
  try {
    const prova = await Prova.create({...req.body, idAluno: req.userId});

    return res.send({prova});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: 'Erro ao cadastrar a prova'});
  }
});

router.put('/:provaId', async (req, res) => {
  try {
    const prova = await Prova.findByIdAndUpdate(req.params.provaId, req.body);

    return res.send({prova});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: 'Erro ao alterar a prova'});
  }
});

router.delete('/:provaId', async (req, res) => {
  try {
    await Prova.findByIdAndRemove(req.params.provaId);

    return res.send();
  } catch (error) {
    return res.status(400).send({error: 'Erro ao remover prova'});
  }
});

module.exports = app => app.use('/provas', router);
