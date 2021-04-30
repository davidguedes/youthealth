const express = require('express');

const Categoria = require('../models/categoria');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();

    return res.send({categorias});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar as categorias'});
  }
});

module.exports = app => app.use('/categorias', router);
