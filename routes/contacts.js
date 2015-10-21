module.exports = function(app) {
  var auth = require('./../middlewares/auth')
    , contacts = app.controllers.contacts;

  app.get('/contacts', auth, contacts.index);
};
