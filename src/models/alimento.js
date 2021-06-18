const mongoose = require('../database');

const AlimentoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    require: true,
    unique: true,
  },
  categoria: {
    type: String,
    require: true,
  },
});

const Alimento = mongoose.model('Alimento', AlimentoSchema);

module.exports = Alimento;
