module.exports = function(app) {
  var HomeController = {
    index: function(req, res) {
      if (req.session.user) {
        res.redirect('/contacts');
        return;
      }
      res.render('home/index');
    },

    login: function(req, res) {
      var email = req.body.user.email
        , nome = req.body.user.nome;

      if (!email || !nome) {
        res.redirect('/');
        return;
      }

      var user = req.body.user;
      user['contacts'] = [];

      req.session.user = user;
      res.redirect('/contacts');
    },

    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };

  return HomeController;
}
