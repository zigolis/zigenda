module.exports = function(app) {
  var ChatController = {
    index: function(req, res) {
      var params = {room: req.query.room};
      res.render('chat/index', params);
    }
  };

  return ChatController;
};
