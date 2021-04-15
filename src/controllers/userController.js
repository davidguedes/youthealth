const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/user');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const user = await User.find();

    return res.send({user});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar os usuários'});
  }
});

router.get('/:idAluno', async (req, res) => {
  try {
    const user = await User.findById(req.params.idAluno);

    return res.send({user});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar o usuário'});
  }
});
/*
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
  res.send({user: req.userId});
});

router.delete('/:alimentoId', async (req, res) => {
  try {
    await Alimento.findByIdAndRemove(req.params.alimentoId);

    return res.send();
  } catch (error) {
    return res.status(400).send({error: 'Erro ao deletar o alimento'});
  }
});
*/

module.exports = app => app.use('/user', router);
