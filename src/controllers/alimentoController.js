const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Alimento = require('../models/alimento');
const Refeicao = require('../models/refeicao');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const alimentos = await Alimento.find();

    return res.send({alimentos});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar os alimentos'});
  }
});

router.get('/:alimentoId', async (req, res) => {
  try {
    const alimento = await Alimento.findById(req.params.alimentoId);

    return res.send({alimento});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar o alimento'});
  }
});

router.post('/', async (req, res) => {
  try {
    const alimento = await Alimento.create(req.body);

    return res.send({alimento});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: 'Erro ao cadastrar o alimento'});
  }
});

router.put('/:alimentoId', async (req, res) => {
  //res.send({user: req.userId});
  try {
    const alimento = await Alimento.findByIdAndUpdate(
      req.params.alimentoId,
      req.body,
    );

    return res.send({alimento});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: 'Erro ao alterar o alimento'});
  }
});

router.delete('/:alimentoId', async (req, res) => {
  try {
    //await Refeicao.find({
    //  alimentos: {$exists: req.params.alimentoId},
    //}).count();
    //await Refeicao.findOne({$match: {'alimentos': {ObjectId(req.params.alimentoId)}}});

    const alimentoUsado = await Refeicao.findOne({
      alimentos: {$in: [req.params.alimentoId]},
    }).count();

    if (alimentoUsado !== 0) {
      return res.status(422).send({
        error: 'Não é possível deletar alimentos já utilizados em refeições.',
      });
    }

    await Alimento.findByIdAndRemove(req.params.alimentoId);

    return res.send();
  } catch (error) {
    return res.status(400).send({error: 'Erro ao deletar o alimento'});
  }
});

module.exports = app => app.use('/alimentos', router);
