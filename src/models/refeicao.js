const mongoose = require('../database/');

const RefeicaoSchema = new mongoose.Schema({
  idAluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  dataRefeicao: {
    type: Date,
    require: true,
  },
  periodo: {
    type: String,
    require: true,
  },
  alimentos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Alimento',
      require: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Refeicao = mongoose.model('Refeicao', RefeicaoSchema);

module.exports = Refeicao;
