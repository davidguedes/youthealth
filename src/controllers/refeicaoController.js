const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Refeicao = require('../models/refeicao');
const Alimento = require('../models/alimento');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const refeicoes = await Refeicao.find().populate('idAluno');

    return res.send({refeicoes});
  } catch (error) {
    return res.status(400).send({error: 'Erro listar as refeições'});
  }
});

router.get('/:refeicaoId', async (req, res) => {
  try {
    const refeicoes = await Refeicao.findById(req.params.refeicaoId).populate(
      'idAluno',
    );

    return res.send({refeicoes});
  } catch (error) {
    return res.status(400).send({error: 'Erro listar a refeição'});
  }
});

router.post('/', async (req, res) => {
  try {
    const refeicao = await Refeicao.create({
      ...req.body,
      idAluno: req.userId,
    });

    return res.send({refeicao});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao cadastrar a refeição'});
  }
});

router.put('/:refeicaoId', async (req, res) => {
  res.send({user: req.userId});
});

router.delete('/:refeicaoId', async (req, res) => {
  try {
    await Refeicao.findByIdAndRemove(req.params.refeicaoId);

    return res.send();
  } catch (error) {
    return res.status(400).send({error: 'Erro ao deletar refeição'});
  }
});

module.exports = app => app.use('/refeicoes', router);
