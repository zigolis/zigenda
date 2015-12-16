module.exports = function(app) {
  var ChatController = {
    index: function(req, res) {
      var params = {user: req.session.user};
      res.render('chat/index', params)
    }
  };

  return ChatController;
};
