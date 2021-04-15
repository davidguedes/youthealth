const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/youthealth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

module.exports = mongoose;
