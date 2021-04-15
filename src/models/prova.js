const mongoose = require('../database/');

const ProvaSchema = new mongoose.Schema({
  idAluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  dataProva: {
    type: Date,
    require: false,
  },
  materia: {
    type: String,
    require: true,
  },
  anotacoes: {
    type: String,
  },
  alert: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prova = mongoose.model('Prova', ProvaSchema);

module.exports = Prova;
