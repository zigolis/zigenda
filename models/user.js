module.exports = function(app) {
  var Schema = require('mongoose').Schema;

  var contact = Schema({
    nome: String,
    email: String
  });

  var user = Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    contacts: [contact]
  });

  return db.model('users', user);
}
