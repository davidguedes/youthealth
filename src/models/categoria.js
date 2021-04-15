const mongoose = require('../database/');

const CategoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
    unique: true,
  },
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;
