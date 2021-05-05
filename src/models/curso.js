const mongoose = require('../database/');

const CursoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    require: true,
    unique: true,
  },
});

const Curso = mongoose.model('Curso', CursoSchema);

module.exports = Curso;
