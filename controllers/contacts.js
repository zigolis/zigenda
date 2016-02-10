module.exports = function(app) {
  var User = app.models.user;

  var ContactsController = {
    index: function(req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function(erro, user) {
        var contacts = user.contacts;
        var result = {contacts: contacts};

        res.render('contacts/index', result);
      });
    },

    create: function(req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function(erro, user) {
        var contact = req.body.contact;
        var contacts = user.contacts;

        contacts.push(contact);

        user.save(function() {
          res.redirect('/contacts');
        });
      });
    },

    show: function(req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function(erro, user) {
        var contactID = req.params.id;
        var contact = user.contacts.id(contactID);
        var result = {contact: contact};

        res.render('contacts/show', result);
      });
    },

    edit: function(req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function(erro, user) {
        var contactID = req.params.id;
        var contact = user.contacts.id(contactID);
        var result = {contact: contact};

        res.render('contacts/edit', result);
      });
    },

    update: function(req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function(erro, user) {
        var contactID = req.params.id;
        var contact = user.contacts.id(contactID);

        contact.nome = req.body.contact.nome;
        contact.email = req.body.contact.email;

        user.save(function() {
          res.redirect('/contacts');
        });
      });
    },

    destroy: function(req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function(erro, user) {
        var contactID = req.params.id;

        user.contacts.id(contactID).remove();
        user.save(function() {
          res.redirect('/contacts');
        });
      });
    }
  };

  return ContactsController;
};
