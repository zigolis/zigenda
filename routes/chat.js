module.exports = function(app) {
  var auth = require('./../middlewares/auth')
    , chat = app.controllers.chat;

  app.get('/chat', auth, chat.index);
};
