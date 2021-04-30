const mongoose = require('../database');

const CategoriaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    require: true,
    unique: true,
  },
  valor: {
    type: String,
    require: true,
    unique: true,
  },
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;
