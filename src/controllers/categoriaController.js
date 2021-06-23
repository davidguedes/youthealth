const express = require('express');

const Categoria = require('../models/categoria');
const Alimento = require('../models/alimento');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();

    return res.send({categorias});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar as categorias'});
  }
});

router.get('/:categoriaId', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.categoriaId);

    return res.send({categoria});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar as categorias'});
  }
});

router.post('/', async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);

    return res.send({categoria});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: 'Erro ao cadastrar a categoria'});
  }
});

router.put('/:categoriaId', async (req, res) => {
  //res.send({user: req.userId});
  try {
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.categoriaId,
      req.body,
    );

    return res.send({categoria});
  } catch (error) {
    console.log(error);
    return res.status(400).send({error: 'Erro ao alterar a categoria'});
  }
});

router.delete('/:categoriaId', async (req, res) => {
  try {
    const alimentoCategoria = await Alimento.findOne({
      alimentos: {$in: [req.params.categoriaId]},
    }).count();

    if (alimentoCategoria !== 0) {
      return res.status(422).send({
        error: 'Não é possível deletar categoria utilizada em algum alimento.',
      });
    }

    await Categoria.findByIdAndRemove(req.params.categoriaId);

    return res.send();
  } catch (error) {
    return res.status(400).send({error: 'Erro ao deletar a categoria'});
  }
});

module.exports = app => app.use('/categorias', router);
