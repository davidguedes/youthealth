const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

const authConfig = require('../config/auth.json');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const {nome, dataNasc, email, idAluno, curso, senha} = req.body;

  try {
    if (!nome || !dataNasc || !email || !idAluno || !curso || !senha) {
      return res.status(400).send({error: 'Preencha todos os campos!'});
    }

    if ((await User.findOne({idAluno})) || (await User.findOne({email}))) {
      return res
        .status(400)
        .send({error: 'ID de usuário ou email já cadastrado!'});
    }
    const user = await User.create({...req.body, curso: curso});

    user.senha = undefined;

    return res.send({
      user,
      token: generateToken({id: user.id}),
    });
  } catch (err) {
    res.status(400).send({error: 'Falha ao registrar!'});
  }
});

router.post('/authenticate', async (req, res) => {
  const {idAluno, senha} = req.body;

  const user = await User.findOne({idAluno}).select('+senha');

  if (!user) {
    return res.status(400).send({error: 'Usuário não encontrado!'});
  }
  if (!(await bcrypt.compare(senha, user.senha))) {
    return res.status(400).send({error: 'Senha inválida!'});
  }

  user.senha = undefined;

  res.send({
    user,
    token: generateToken({id: user.id}),
  });
});

router.post('/forgot_password', async (req, res) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).send({error: 'Usuário não encontrado!'});
    }
    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        senhaResetToken: token,
        senhaResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: 'd2vid.guedes@gmail.com',
        template: 'auth/forgot_password',
        context: {token},
      },
      err => {
        if (err) {
          return res.status(400).send({
            error:
              'Não foi possível enviar o email de recuperação de senha, tente novamente!',
          });
        }
        return res.send();
      },
    );
  } catch (error) {
    res
      .status(400)
      .send({error: 'Erro em Esqueci minha senha, tente novamente!'});
  }
});

router.post('/reset_password', async (req, res) => {
  const {email, token, senha} = req.body;

  try {
    const user = await User.findOne({email}).select(
      '+senhaResetToken senhaResetExpires',
    );

    if (!user) {
      return res.status(400).send({error: 'Usuário não encontrado!'});
    }

    if (token !== user.senhaResetToken) {
      return res.status(400).send({error: 'Token inválido!'});
    }

    const now = new Date();

    if (now > user.senhaResetExpires) {
      return res.status(400).send({error: 'Token expirado, gere um novo!'});
    }

    user.senha = senha;

    await user.save();
    res.send();
  } catch (error) {
    res.status(400).send({error: 'Erro ao resetar senha, tente novamente!'});
  }
});

module.exports = app => app.use('/auth', router);
