const express = require('express');

const Curso = require('../models/curso');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.find();

    return res.send({cursos});
  } catch (error) {
    return res.status(400).send({error: 'Erro ao listar os cursos'});
  }
});

module.exports = app => app.use('/cursos', router);
