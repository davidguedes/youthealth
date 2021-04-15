const mongoose = require('../database/');

const AlimentoSchema = new mongoose.Schema({
  /*
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    require: true,
  },
  */
  descricao: {
    type: String,
    require: true,
    unique: true,
  },
});

const Alimento = mongoose.model('Alimento', AlimentoSchema);

module.exports = Alimento;
