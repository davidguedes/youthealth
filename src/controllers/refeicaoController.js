const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Refeicao = require('../models/refeicao');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    //const refeicoes = await Refeicao.find().populate('idAluno');
    const refeicoes = await Refeicao.find({idAluno: req.userId}, {}).populate(
      'idAluno',
    );

    return res.send({refeicoes});
  } catch (error) {
    return res.status(400).send({error: 'Erro listar as refeições'});
  }
});

router.get('/:refeicaoId', async (req, res) => {
  try {
    const refeicao = await Refeicao.findById(req.params.refeicaoId)
      .populate('idAluno')
      .populate('alimentos');

    return res.send({refeicao});
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
  try {
    const refeicao = await Refeicao.findByIdAndUpdate(
      req.params.refeicaoId,
      req.body,
    );

    return res.send({refeicao});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: 'Erro ao alterar a refeição!'});
  }
});

router.delete('/:refeicaoId', async (req, res) => {
  try {
    await Refeicao.findByIdAndRemove(req.params.refeicaoId);

    return res.send();
  } catch (error) {
    return res.status(400).send({error: 'Erro ao deletar refeição'});
  }
});

router.get('/all/last', async (req, res) => {
  try {
    const refeicao = await Refeicao.find({idAluno: req.userId}, {})
      .sort({dataRefeicao: -1})
      .limit(1)
      .populate('idAluno');

    return res.send({refeicao});
  } catch (error) {
    return res.status(400).send({error: 'Erro listar as refeições'});
  }
});

router.get('/all/quantity', async (req, res) => {
  try {
    const refeicoes = await Refeicao.find(
      {idAluno: req.userId},
      {},
    ).countDocuments();

    return res.send({refeicoes});
  } catch (error) {
    return res.status(400).send({error: 'Erro listar as refeições'});
  }
});

module.exports = app => app.use('/refeicoes', router);
