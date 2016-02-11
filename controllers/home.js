module.exports = function(app) {
  var User = app.models.user;

  var HomeController = {
    index: function(req, res) {
      if (req.session.user) {
        res.redirect('/contacts');
        return;
      }
      res.render('home/index');
    },

    login: function(req, res) {
      var query = {email: req.body.user.email};
      console.log(req.body.user);

      User
        .findOne(query)
        .select('nome email')
        .exec(function(erro, user) {

          if (user) {
            req.session.user = user;
            res.redirect('/contacts');
          }
          else {
            var user = req.body.user;

            User.create(user, function(erro, user) {
              if (erro) {
                res.redirect('/');
              }
              else {
                req.session.user = user;
                res.redirect('/contacts');
              }
            });
          }
        });
    },

    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };

  return HomeController;
}
