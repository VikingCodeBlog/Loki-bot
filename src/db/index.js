const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error al conectar mongo'));

db.once('open', function () {
  console.log('Mongo conectado')
});

module.exports = db;