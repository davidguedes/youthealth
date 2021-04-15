require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', error => {
  console.log('Erro: ', error.message);
});

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//server.use(express.static(__dirname + '/src'));
server.use(express.static(require('path').resolve(__dirname, '/src')));

require('./src/controllers/index')(server);

server.listen(process.env.PORT, () => {
  console.log(`-Rodando no endereço: ${process.env.BASE}`);
});
