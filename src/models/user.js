const mongoose = require('../database/');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  dataNasc: {
    type: Date,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  idAluno: {
    type: String,
    unique: true,
    require: true,
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    require: true,
  },
  senha: {
    type: String,
    require: true,
  },
  senhaResetToken: {
    type: String,
    select: false,
  },
  senhaResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//.pre - deine algo antes de salvar
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
